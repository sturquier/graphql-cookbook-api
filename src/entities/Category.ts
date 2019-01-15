import { Field, ID, ObjectType } from 'type-graphql'
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm'
import { Recipe } from './Recipe'

@Entity()
@ObjectType()
export class Category {

  @Field(() => ID)
  @PrimaryGeneratedColumn()
  readonly id: string

  @Field()
  @Column()
  name: string

  @Field(() => [Recipe])
  @ManyToMany(() => Recipe, recipe => recipe.categories, { eager: true })
  recipes: Recipe[]
}
