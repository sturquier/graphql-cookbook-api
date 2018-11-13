import { Controller, Query, Mutation } from 'vesper'
import { EntityManager } from 'typeorm'
import { Ingredient } from '../entity/Ingredient'

@Controller()
export class IngredientController {

  constructor(private entityManager: EntityManager) {}

  @Query()
  ingredients() {
    return this.entityManager.find(Ingredient)
  }

  @Query()
  ingredient({ id }) {
    return this.entityManager.findOne(Ingredient, id)
  }

  @Mutation()
  createIngredient(args) {
    const ingredient = this.entityManager.create(Ingredient, args)
    return this.entityManager.save(Ingredient, ingredient)
  }

  @Mutation()
  async deleteIngredient({ id }) {
    await this.entityManager.remove(Ingredient, { id: id })
    return true
  }
}
