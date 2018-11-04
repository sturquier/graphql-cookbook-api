import { Controller, Query } from 'vesper'
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
}
