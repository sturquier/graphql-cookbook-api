import { Controller, Query } from 'vesper'
import { EntityManager } from 'typeorm'
import { Recipe } from '../entity/Recipe'

@Controller()
export class RecipeController {

  constructor(private entityManager: EntityManager) {}

  @Query()
  recipes() {
    return this.entityManager.find(Recipe)
  }

  @Query()
  recipe({ id }) {
    return this.entityManager.findOne(Recipe, id)
  }
}
