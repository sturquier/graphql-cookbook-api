import { Resolver, Query, Mutation, Arg, ID } from 'type-graphql'
import { Repository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { Ingredient } from '../entities/Ingredient'
import { IngredientInput } from './input/IngredientInput'

@Resolver(() => Ingredient)
export class IngredientResolver {

  constructor(
    @InjectRepository(Ingredient) private readonly ingredientRepository: Repository<Ingredient>
  ) {}

  @Query(() => [Ingredient])
  ingredients(): Promise<Ingredient[]> {
    return this.ingredientRepository.find()
  }

  @Query(() => Ingredient)
  ingredient(@Arg('id', () => ID) id: string): Promise<Ingredient> {
    return this.ingredientRepository.findOne(id)
  }

  @Mutation(() => Ingredient)
  async createIngredient(@Arg('ingredient') ingredientInput: IngredientInput): Promise<Ingredient> {
    const ingredient = this.ingredientRepository.create(ingredientInput)
    return await this.ingredientRepository.save(ingredient)
  }

  @Mutation(() => Boolean)
  async deleteIngredient(@Arg('id', () => ID) id: string): Promise<Boolean> {
    try {
      await this.ingredientRepository.delete({ id: id })
      return true
    } catch(err) {
      console.error(err)
      return false
    }
  }
}
