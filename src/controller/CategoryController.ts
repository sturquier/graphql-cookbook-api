import { Controller, Query, Mutation } from 'vesper'
import { EntityManager } from 'typeorm'
import { Category } from '../entity/Category'
import { CreateCategoryArgs } from '../args/CreateCategoryArgs'

@Controller()
export class CategoryController {

  constructor(private entityManager: EntityManager) {}

  @Query()
  categories(): Promise<Category[]> {
    return this.entityManager.find(Category)
  }

  @Query()
  category({ id }: { id: number }): Promise<Category> {
    return this.entityManager.findOne(Category, id)
  }

  @Mutation()
  createCategory(args: CreateCategoryArgs): Promise<Category> {
    const category = this.entityManager.create(Category, args)
    return this.entityManager.save(Category, category)
  }

  @Mutation()
  async deleteCategory({ id }: { id: number }): Promise<Boolean> {
    await this.entityManager.remove(Category, { id: id })
    return true
  }
}
