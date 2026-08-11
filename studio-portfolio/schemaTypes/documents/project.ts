import {ProjectsIcon} from '@sanity/icons/Projects'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: ProjectsIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Project name',
      type: 'string',
      description: 'Shown as the big heading on the portfolio.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL slug',
      type: 'slug',
      description: 'Click Generate after you enter the project name.',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'eyebrow',
      title: 'Short label',
      type: 'string',
      description: 'Small line above the name, e.g. Game · Lane defense',
    }),
    defineField({
      name: 'summary',
      title: 'Description',
      type: 'text',
      rows: 4,
      description: 'A few sentences about the project.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      options: {layout: 'tags'},
      description: 'Press Enter after each tag, e.g. Kongregate, Roguelite',
    }),
    defineField({
      name: 'url',
      title: 'Project link',
      type: 'url',
      description: 'Where the Visit / Play button goes.',
      validation: (rule) =>
        rule.uri({
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'linkLabel',
      title: 'Button text',
      type: 'string',
      description: 'e.g. Play on Kongregate or Visit site',
      initialValue: 'Visit site',
    }),
    defineField({
      name: 'image',
      title: 'Project image',
      type: 'image',
      options: {hotspot: true},
      description: 'Logo or screenshot shown next to the project.',
      fields: [
        defineField({
          name: 'alt',
          title: 'Image description',
          type: 'string',
          description: 'Short description for accessibility.',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'order',
      title: 'Order on page',
      type: 'number',
      description: 'Lower numbers show first (1, then 2, then 3…).',
      initialValue: 1,
      validation: (rule) => rule.integer().min(0).required(),
    }),
  ],
  orderings: [
    {
      title: 'Order on page',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'eyebrow',
      media: 'image',
      order: 'order',
    },
    prepare({title, subtitle, media, order}) {
      return {
        title: title || 'Untitled project',
        subtitle: [order != null ? `#${order}` : null, subtitle]
          .filter(Boolean)
          .join(' · '),
        media,
      }
    },
  },
})
