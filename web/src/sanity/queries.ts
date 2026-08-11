import {defineQuery} from 'next-sanity'

export const PROJECTS_QUERY = defineQuery(`
  *[_type == "project" && defined(slug.current)]
  | order(order asc, title asc) {
    _id,
    title,
    slug,
    eyebrow,
    summary,
    tags,
    url,
    linkLabel,
    order,
    image {
      asset->{
        _id,
        url,
        metadata { lqip, dimensions }
      },
      alt,
      hotspot,
      crop
    }
  }
`)
