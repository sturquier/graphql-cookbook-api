import { InputType, Field, ID } from 'type-graphql'
import { PreparationInput } from './'
import { Difficulty } from '../enums'

@InputType()
export class RecipeInput {

  @Field()
  title: string

  @Field({ nullable: true })
  description?: string

  @Field(() => [ID])
  categoryIds: string[]

  @Field(() => [ID])
  ingredientIds: string[]

  @Field(() => [PreparationInput])
  preparationInputs: PreparationInput[]

  @Field(() => Difficulty)
  difficulty: Difficulty
}
