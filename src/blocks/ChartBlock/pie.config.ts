import type { Field } from 'payload'

export const PieConfig: Field[] = [
  {
    name: 'pieConfig',
    label: 'Pie Config',
    type: 'group',
    admin: {
      condition: (_, siblingData) => siblingData?.type === 'pie',
    },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'nameKey',
            type: 'text',
            label: 'Name Field',
            required: true,
          },
          {
            name: 'valueKey',
            type: 'text',
            label: 'Value Field',
            required: true,
          },
        ],
      },
    ],
  },
]
