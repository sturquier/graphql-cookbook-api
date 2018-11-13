import { Controller, Query, Mutation } from 'vesper'
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

  @Mutation()
  createCategory(args) {
    const category = this.entityManager.create(Category, args)
    return this.entityManager.save(Category, category)
  }

  @Mutation()
  async deleteCategory({ id }) {
    await this.entityManager.remove(Category, { id: id })
    return true
  }
}
