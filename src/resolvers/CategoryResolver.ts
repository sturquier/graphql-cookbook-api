import { Resolver, Query, Mutation, Arg, ID } from 'type-graphql'
import { Repository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { Category } from '../entities/Category'
import { CategoryInput } from './input/CategoryInput'

@Resolver(() => Category)
export class CategoryResolver {

  constructor(
    @InjectRepository(Category) private readonly categoryRepository: Repository<Category>
  ) {}

  @Query(() => [Category])
  categories(): Promise<Category[]> {
    return this.categoryRepository.find()
  }

  @Query(() => Category)
  category(@Arg('id', () => ID) id: string): Promise<Category> {
    return this.categoryRepository.findOne(id)
  }

  @Mutation(() => Category)
  async createCategory(@Arg('category') categoryInput: CategoryInput): Promise<Category> {
    const category = this.categoryRepository.create(categoryInput)
    return await this.categoryRepository.save(category)
  }

  @Mutation(() => Boolean)
  async deleteCategory(@Arg('id', () => ID) id: string): Promise<Boolean> {
    try {
      await this.categoryRepository.delete({ id: id })
      return true
    } catch(err) {
      console.error(err)
      return false
    }
  }
}
