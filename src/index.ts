import { bootstrap } from 'vesper'
import { Category } from './entity/Category'
import { Ingredient } from './entity/Ingredient'
import { Preparation } from './entity/Preparation'
import { Recipe } from './entity/Recipe'

bootstrap({
  port: 8080,
  controllers: [__dirname + '/controller/**/*.ts'],
  entities: [Category, Ingredient, Preparation, Recipe],
  resolvers: [__dirname + '/resolver/**/*.ts'],
  schemas: [__dirname + '/schema/**/*.graphql']
}).then(() => {
  console.log('GraphQL API running at localhost:8080')
}).catch(err => {
  console.error(err.stack ? err.stack : err)
})
