import 'reflect-metadata'
import { ApolloServer } from 'apollo-server'
import * as TypeGraphQL from 'type-graphql'
import * as TypeORM from 'typeorm'
import { Container } from 'typedi'
import { CategoryResolver, IngredientResolver, RecipeResolver } from './resolvers'
import envConfig from '../config.env'

TypeGraphQL.useContainer(Container)
TypeORM.useContainer(Container)

const port = parseInt(process.env.PORT) || 5000
const { ormConfig } = envConfig

async function bootstrap(): Promise<void> {
  try {
    await TypeORM.createConnection(ormConfig)

    const schema = await TypeGraphQL.buildSchema({
      resolvers: [CategoryResolver, IngredientResolver, RecipeResolver],
      validate: false
    })

    const server = new ApolloServer({ schema })

    const { url } = await server.listen(port)
    console.log(`GraphQL API running at ${url}`)
  } catch (err) {
    console.error(err)
  }
}

bootstrap()
