import { Controller, Query, ArgsValidator } from 'vesper'
import { EntityManager, FindManyOptions } from 'typeorm'
import { Recipe } from '../entity/Recipe'
import { RecipesArgsValidator } from '../validator/RecipesArgsValidator'

@Controller()
export class RecipeController {

  constructor(private entityManager: EntityManager) {}

  @Query()
  @ArgsValidator(RecipesArgsValidator)
  recipes(args) {
    let findOptions: FindManyOptions = {}

    if (args.limit) { findOptions.take = args.limit }
    if (args.offset) { findOptions.skip = args.offset }
    if (args.sortBy === 'last') { findOptions.order = { 'id': 'DESC' } }
    if (args.sortBy === 'title') { findOptions.order = { 'title': 'ASC' } }

    return this.entityManager.find(Recipe, findOptions)
  }

  @Query()
  recipe({ id }) {
    return this.entityManager.findOne(Recipe, id)
  }
}
