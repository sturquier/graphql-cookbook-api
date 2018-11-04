import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm'
import { Recipe } from './Recipe'

@Entity()
export class Ingredient {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  price: number

  @ManyToMany(() => Recipe, recipe => recipe.ingredients)
  recipes: Recipe[]
}
