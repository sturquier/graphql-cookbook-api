import { Field, ID, ObjectType } from 'type-graphql'
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm'
import { Ingredient } from './Ingredient'
import { Category } from './Category'
import { Preparation } from './Preparation'

@Entity()
@ObjectType()
export class Recipe {

  @Field(() => ID)
  @PrimaryGeneratedColumn()
  readonly id: string

  @Field()
  @Column()
  title: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string

  @Field(() => [Ingredient])
  @ManyToMany(() => Ingredient, ingredient => ingredient.recipes)
  @JoinTable()
  ingredients: Ingredient[]

  @Field(() => [Category])
  @ManyToMany(() => Category, category => category.recipes)
  @JoinTable()
  categories: Category[]

  @Field(() => [Preparation])
  @OneToMany(() => Preparation, preparation => preparation.recipe)
  preparation: Preparation[]
}
