import { InputType, Field, Int } from 'type-graphql'

@InputType()
export class PreparationInput {

  @Field(() => Int)
  step: number

  @Field()
  instruction: string
}
