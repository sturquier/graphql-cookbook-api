import { Controller, Query, Mutation } from 'vesper'
import { EntityManager } from 'typeorm'
import { Ingredient } from '../entity/Ingredient'
import { CreateIngredientArgs } from '../args/CreateIngredientArgs'

@Controller()
export class IngredientController {

  constructor(private entityManager: EntityManager) {}

  @Query()
  ingredients(): Promise<Ingredient[]> {
    return this.entityManager.find(Ingredient)
  }

  @Query()
  ingredient({ id }: { id: number }): Promise<Ingredient> {
    return this.entityManager.findOne(Ingredient, id)
  }

  @Mutation()
  createIngredient(args: CreateIngredientArgs): Promise<Ingredient> {
    const ingredient = this.entityManager.create(Ingredient, args)
    return this.entityManager.save(Ingredient, ingredient)
  }

  @Mutation()
  async deleteIngredient({ id }: { id: number }): Promise<Boolean> {
    await this.entityManager.remove(Ingredient, { id: id })
    return true
  }
}
