import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'
import {propertyType} from './propertyType'

export const schema = {
  types: [blockContentType, categoryType, postType, authorType, propertyType],
}
