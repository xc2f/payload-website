import type { Block } from 'payload'
import { CommonConfig } from './common.config'
import { PieConfig } from './pie.config'

export const ChartBlock: Block = {
  slug: 'chart',
  interfaceName: 'ChartBlock',
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'heading',
          type: 'text',
          label: 'Chart Heading',
          admin: { width: '50%' },
        },
        {
          name: 'description',
          type: 'text',
          label: 'Description',
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'type',
      label: 'Chart Type',
      type: 'select',
      required: true,
      options: [
        { label: 'Line', value: 'line' },
        { label: 'Bar', value: 'bar' },
        { label: 'Area', value: 'area' },
        { label: 'Pie', value: 'pie' },
        { label: 'Scatter', value: 'scatter' },
        { label: 'Composed', value: 'composed' },
      ],
      defaultValue: 'line',
    },

    // Dataset JSON
    {
      label: 'Dataset 折叠栏',
      type: 'collapsible',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'dataset',
          label: 'Dataset (JSON)',
          type: 'json',
          required: true,
          admin: {
            description: '数组对象格式，例如: [{ "time": "1:51", "Seoul": 97, "Tokyo": 86 }]',
          },
          validate: (value) => {
            if (!Array.isArray(value)) return 'Dataset 必须是数组'
            if (value.length === 0) return 'Dataset 不能为空'
            return true
          },
        },
      ],
    },

    ...CommonConfig,
    ...PieConfig,

    // 高级 Chart 配置
    {
      name: 'config',
      label: 'Advanced Chart Options (JSON)',
      type: 'json',
      admin: {
        description: '透传给图表库的原生配置项',
      },
    },

    // 数据来源
    {
      name: 'dataSource',
      type: 'text',
      label: 'Data Source',
      defaultValue: 'xc2f.com',
    },
  ],
}
