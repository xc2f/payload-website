import { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'

import { Code } from '../../blocks/Code/config'

export const Notes: CollectionConfig = {
  slug: 'notes',
  admin: {
    useAsTitle: 'title',
    group: 'Tools',
  },
  access: {
    create: authenticated,
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      type: 'blocks',
      admin: {
        initCollapsed: true,
      },
      blocks: [
        {
          slug: 'text',
          fields: [
            {
              name: 'text',
              type: 'textarea',
            },
          ],
        },
        {
          slug: 'json',
          fields: [
            {
              name: 'json',
              type: 'json',
            },
          ],
        },
        Code,
      ],
    },
  ],
  versions: {
    drafts: true,
  },
}
