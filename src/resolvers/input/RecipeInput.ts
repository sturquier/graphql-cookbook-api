import { InputType, Field, ID } from 'type-graphql'

@InputType()
export class RecipeInput {

  @Field()
  title: string

  @Field({ nullable: true })
  description?: string

  @Field(() => [ID])
  categoryIds: string[]
}
