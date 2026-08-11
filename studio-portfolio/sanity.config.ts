import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'

export default defineConfig({
  name: 'default',
  title: 'Portfolio',

  projectId: 'mfingag7',
  dataset: 'production',

  plugins: [
    structureTool({
      structure,
    }),
  ],

  schema: {
    types: schemaTypes,
    // Only allow creating Project documents
    templates: (templates) =>
      templates.filter((template) => template.schemaType === 'project'),
  },
})
