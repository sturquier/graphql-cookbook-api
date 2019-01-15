import { ArgsType, Field, Int } from 'type-graphql'

@ArgsType()
export class PaginationArgs {

  @Field(() => Int, { nullable: true })
  limit?: number

  @Field(() => Int, { nullable: true })
  offset?: number

  @Field({ nullable: true })
  sortBy?: string
}
