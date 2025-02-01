import { type SchemaTypeDefinition } from 'sanity'
import products from './products';
import browseDress from './browseDress';
import banner from './banner';
import orders from './orders';
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [banner,products,browseDress,orders],
}
