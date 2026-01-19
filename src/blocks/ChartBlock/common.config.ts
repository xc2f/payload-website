import type { Field } from 'payload'

export const CommonConfig: Field[] = [
  {
    name: 'xAxisKey',
    type: 'text',
    label: 'X轴字段名',
    required: true,
    admin: {
      condition: (_, siblingData) => siblingData?.type !== 'pie',
    },
  },
  {
    name: 'series',
    label: 'Series 配置',
    type: 'array',
    minRows: 1,
    admin: {
      condition: (_, siblingData) => siblingData?.type !== 'pie',
    },
    fields: [
      {
        name: 'key',
        type: 'text',
        label: '字段名',
        required: true,
      },
      {
        name: 'label',
        type: 'text',
        label: '显示名称',
      },
      {
        name: 'type',
        type: 'select',
        label: 'Series 类型',
        options: [
          { label: 'Line', value: 'line' },
          { label: 'Bar', value: 'bar' },
          { label: 'Area', value: 'area' },
          { label: 'Scatter', value: 'scatter' },
        ],
        defaultValue: 'line',
      },
      {
        name: 'yAxis',
        type: 'select',
        label: 'Y轴位置',
        options: [
          { label: 'Left', value: 'left' },
          { label: 'Right', value: 'right' },
        ],
        defaultValue: 'left',
      },
      {
        name: 'color',
        type: 'text',
        label: '颜色',
        admin: { description: '可填十六进制或 color 名称' },
      },
    ],
  },
]
