import type {StructureResolver} from 'sanity/structure'
import {ProjectsIcon} from '@sanity/icons/Projects'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Projects')
        .icon(ProjectsIcon)
        .child(
          S.documentTypeList('project')
            .title('Projects')
            .defaultOrdering([{field: 'order', direction: 'asc'}])
            .filter('_type == "project"'),
        ),
    ])
