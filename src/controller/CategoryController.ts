import { Controller, Query } from 'vesper'
import { EntityManager } from 'typeorm'
import { Category } from '../entity/Category'

@Controller()
export class CategoryController {

  constructor(private entityManager: EntityManager) {}

  @Query()
  categories() {
    return this.entityManager.find(Category)
  }

  @Query()
  category({ id }) {
    return this.entityManager.findOne(Category, id)
  }
}
