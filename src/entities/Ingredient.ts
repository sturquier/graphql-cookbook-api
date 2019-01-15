import { Field, ID, Float, ObjectType } from 'type-graphql'
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm'
import { Recipe } from './Recipe'

@Entity()
@ObjectType()
export class Ingredient {

  @Field(() => ID)
  @PrimaryGeneratedColumn()
  readonly id: string

  @Field()
  @Column()
  name: string

  @Field(() => Float)
  @Column()
  price: number

  @Field(() => [Recipe])
  @ManyToMany(() => Recipe, recipe => recipe.ingredients)
  recipes: Promise<Recipe[]>
}
