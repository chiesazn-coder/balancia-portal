import {defineQuery} from "next-sanity"

export const POSTS_QUERY = defineQuery(`
*[_type == "post" && defined(slug.current)]
| order(_updatedAt desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  "updatedAt": _updatedAt,
  mainImage,
  categories[]->{
    _id,
    title
  }
}
`)

export const POST_QUERY = defineQuery(`
*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  body,
  "updatedAt": _updatedAt,
  mainImage,
  categories[]->{
    _id,
    title
  }
}
`)