import 'reflect-metadata'
import { ApolloServer } from 'apollo-server'
import * as TypeGraphQL from 'type-graphql'
import * as TypeORM from 'typeorm'
import { Container } from 'typedi'
import { CategoryResolver } from './resolvers/CategoryResolver'
import { IngredientResolver } from './resolvers/IngredientResolver'
import { RecipeResolver } from './resolvers/RecipeResolver'

TypeGraphQL.useContainer(Container)
TypeORM.useContainer(Container)

const port = parseInt(process.env.PORT) || 5000

async function bootstrap(): Promise<void> {
  try {
    await TypeORM.createConnection()

    const schema = await TypeGraphQL.buildSchema({
      resolvers: [CategoryResolver, IngredientResolver, RecipeResolver]
    })

    const server = new ApolloServer({ schema })

    const { url } = await server.listen(port)
    console.log(`GraphQL API running at ${url}`)
  } catch (err) {
    console.error(err)
  }
}

bootstrap()
