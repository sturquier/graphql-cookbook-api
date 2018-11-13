import { Controller, Query, Mutation, ArgsValidator } from 'vesper'
import { EntityManager, FindManyOptions } from 'typeorm'
import { Recipe } from '../entity/Recipe'
import { Category } from '../entity/Category'
import { PaginationArgs } from '../args/PaginationArgs'
import { CreateRecipeArgs } from '../args/CreateRecipeArgs'
import { RecipesArgsValidator } from '../validator/RecipesArgsValidator'

@Controller()
export class RecipeController {

  constructor(private entityManager: EntityManager) {}

  @Query()
  @ArgsValidator(RecipesArgsValidator)
  recipes(args: PaginationArgs): Promise<Recipe[]> {
    let findOptions: FindManyOptions = {}

    if (args.limit) { findOptions.take = args.limit }
    if (args.offset) { findOptions.skip = args.offset }
    if (args.sortBy === 'last') { findOptions.order = { 'id': 'DESC' } }
    if (args.sortBy === 'title') { findOptions.order = { 'title': 'ASC' } }

    return this.entityManager.find(Recipe, findOptions)
  }

  @Query()
  recipe({ id }: { id: number }): Promise<Recipe> {
    return this.entityManager.findOne(Recipe, id)
  }

  @Mutation()
  async createRecipe(args: CreateRecipeArgs): Promise<Recipe> {
    const recipe = this.entityManager.create(Recipe, args)
    if (args.categoryIds) {
      recipe.categories = await Promise.all(args.categoryIds.map(categoryId => {
        return this.entityManager.findOne(Category, categoryId)
      }))
    }

    return this.entityManager.save(Recipe, recipe)
  }

  @Mutation()
  async deleteRecipe({ id }: { id: number }): Promise<Boolean> {
    await this.entityManager.remove(Recipe, { id: id })
    return true
  }
}
