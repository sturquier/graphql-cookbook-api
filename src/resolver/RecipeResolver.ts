import { Resolver, Resolve, ResolverInterface } from 'vesper'
import { EntityManager } from 'typeorm'
import { Recipe } from '../entity/Recipe'
import { Category } from '../entity/Category'

@Resolver(Recipe)
export class RecipeResolver implements ResolverInterface<Recipe> {

  constructor(private entityManager: EntityManager) {}

  @Resolve()
  async categoryNames(recipes: Recipe[]) {
    const recipeIds = recipes.map(recipe => recipe.id)
    const categories = await this.entityManager
      .createQueryBuilder(Category, "category")
      .innerJoinAndSelect(
        "category.recipes",
        "recipe",
        "recipe.id IN (:...recipeIds)",
        { recipeIds }
      )
      .getMany()

    return recipes.map(recipe => {
      return categories
        .filter(category => category.recipes.some(categoryRecipe => categoryRecipe.id === recipe.id))
        .map(category => category.name)
    })
  }
}
