import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Recipe } from './Recipe'

@Entity()
export class Preparation {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  step: number

  @Column()
  instruction: string

  @ManyToOne(() => Recipe, recipe => recipe.preparation)
  recipe: Recipe
}
