import { SESv2Client } from '@aws-sdk/client-sesv2'

const mustEnv = (name: string): string => {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`)
  }
  return value
}

export const sesClient = new SESv2Client({
  region: mustEnv('AWS_SERVICE_REGION'),
})
