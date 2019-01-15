import { Field, ID, ObjectType } from 'type-graphql'
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm'
import { Recipe } from './'

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
  @ManyToMany(() => Recipe, recipe => recipe.categories)
  recipes: Promise<Recipe[]>
}
