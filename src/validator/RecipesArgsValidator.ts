import { Service } from 'typedi'
import { PaginationArgs } from '../args/PaginationArgs'

@Service()
export class RecipesArgsValidator {

  validate(args: PaginationArgs) {
    if (args.limit !== undefined && args.limit > 20)
      throw new Error(`Limit cannot be more than 20`)

    if (args.limit !== undefined && args.limit < 1)
      throw new Error(`Limit cannot be less than 1`)

    if (args.offset !== undefined && args.offset < 0)
      throw new Error(`Offset cannot be less than 0`)

    if (args.sortBy && args.sortBy !== 'last' && args.sortBy !== 'title')
      throw new Error(`Sort can only be by title or by last`)
  }
}
