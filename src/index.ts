import { bootstrap } from 'vesper'
import { Category } from './entity/Category'
import { Ingredient } from './entity/Ingredient'
import { Preparation } from './entity/Preparation'
import { Recipe } from './entity/Recipe'

const PORT = parseInt(process.env.PORT) || 5000

bootstrap({
  port: PORT,
  controllers: [__dirname + '/controller/**/*.ts'],
  entities: [Category, Ingredient, Preparation, Recipe],
  resolvers: [__dirname + '/resolver/**/*.ts'],
  schemas: [__dirname + '/schema/**/*.graphql']
}).then(() => {
  console.log(`GraphQL API running on port ${PORT}`)
}).catch(err => {
  console.error(err.stack ? err.stack : err)
})
