import type { Task, SendEmailOptions } from 'payload'
import type { Attachment } from 'nodemailer/lib/mailer'

export const sendEmailTask: Task<SendEmailOptions> = {
  slug: 'send-email',
  retries: 2,
  handler: async ({ input, req }) => {
    // Properly type the sendEmail call
    const payload = req.payload
    const log = await payload.findByID({
      collection: 'mails',
      id: input.id,
    })

    if (log.sendStatus === 'sent') {
      return
    }

    const combineResult = (str: string) => {
      const now = new Date().toISOString()
      return `${now}\n${str}`
    }

    const getAttachments = async () => {
      const { attachments = [] } = input
      const attachmentIDs = attachments.map((m) => m.file?.id || m?.file || m).filter(Boolean)

      if (!attachmentIDs.length) {
        return []
      }

      const mediaDocs = await payload.find({
        collection: 'media',
        where: {
          id: { in: attachmentIDs },
        },
        limit: attachments.length,
      })

      const files: Attachment[] = (mediaDocs?.docs || [])
        .filter((file) => file?.url)
        .map((file) => ({
          filename: file.filename,
          path: `${process.env.NEXT_PUBLIC_SERVER_URL}${file.url}`,
          contentType: file.mimeType ?? 'application/octet-stream',
        }))

      return files
    }

    try {
      await payload.sendEmail({
        ...input,
        attachments: await getAttachments(),
      })
      await payload.update({
        collection: 'mails',
        id: input.id,
        data: {
          sendStatus: 'sent',
          result: combineResult('ok'),
        },
      })
      return {
        output: {
          emailSent: true,
        },
      }
    } catch (err) {
      await req.payload.update({
        collection: 'mails',
        id: input.id,
        data: {
          sendStatus: 'failed',
          result: combineResult(err instanceof Error ? err.message : String(err)),
        },
      })
      throw err
    }
  },
}

export default sendEmailTask
