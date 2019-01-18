import { Resolver, Query, Mutation, Arg, Args, ID } from 'type-graphql'
import { Repository, FindManyOptions } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { Category, Recipe, Ingredient, Preparation } from '../entities'
import { RecipeInput } from './input'
import { PaginationArgs } from '../args/PaginationArgs'

@Resolver(() => Recipe)
export class RecipeResolver {

  constructor(
    @InjectRepository(Recipe) private readonly recipeRepository: Repository<Recipe>,
    @InjectRepository(Category) private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Ingredient) private readonly ingredientRepository: Repository<Ingredient>,
    @InjectRepository(Preparation) private readonly preparationRepository: Repository<Preparation>
  ) {}

  @Query(() => [Recipe])
  recipes(@Args() { offset, limit, sortBy }: PaginationArgs): Promise<Recipe[]> {
    let findOptions: FindManyOptions = {}

    if (limit) { findOptions.take = limit }
    if (offset) { findOptions.skip = offset }
    if (sortBy === 'last') { findOptions.order = { 'id': 'DESC' } }
    if (sortBy === 'title') { findOptions.order = { 'title': 'ASC' } }

    return this.recipeRepository.find(findOptions)
  }

  @Query(() => Recipe)
  recipe(@Arg('id', () => ID) id: string): Promise<Recipe> {
    return this.recipeRepository.findOne(id)
  }

  @Mutation(() => Recipe)
  async createRecipe(@Arg('recipe') recipeInput: RecipeInput): Promise<Recipe> {
    const recipe = this.recipeRepository.create(recipeInput)

    if (recipeInput.categoryIds) {
      recipe.categories = await Promise.all(recipeInput.categoryIds.map(categoryId => {
        return this.categoryRepository.findOne(categoryId)
      }))
    }

    if (recipeInput.ingredientIds) {
      recipe.ingredients = await Promise.all(recipeInput.ingredientIds.map(ingredientId => {
        return this.ingredientRepository.findOne(ingredientId)
      }))
    }

    if (recipeInput.preparationInputs) {
      recipe.preparation = []
      recipeInput.preparationInputs.map(preparationInput => {
        const preparation = this.preparationRepository.create(preparationInput)
        recipe.preparation.push(preparation)
      })
    }
    
    return await this.recipeRepository.save(recipe)
  }

  @Mutation(() => Boolean)
  async deleteRecipe(@Arg('id', () => ID) id: string): Promise<Boolean> {
    try {
      await this.recipeRepository.delete({ id: id })
      return true
    } catch(err) {
      console.error(err)
      return false
    }
  }
}
