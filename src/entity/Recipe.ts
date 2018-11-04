import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm'
import { Ingredient } from './Ingredient'
import { Category } from './Category'
import { Preparation } from './Preparation'

@Entity()
export class Recipe {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  description: string

  @ManyToMany(() => Ingredient, ingredient => ingredient.recipes)
  @JoinTable()
  ingredients: Ingredient[]

  @ManyToMany(() => Category, category => category.recipes)
  @JoinTable()
  categories: Category[]

  @OneToMany(() => Preparation, preparation => preparation.recipe)
  preparation: Preparation[]
}
