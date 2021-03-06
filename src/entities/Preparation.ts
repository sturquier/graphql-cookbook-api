import { Field, ID, Int, ObjectType } from 'type-graphql'
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Recipe } from './'

@Entity()
@ObjectType()
export class Preparation {

  @Field(() => ID)
  @PrimaryGeneratedColumn()
  readonly id: string

  @Field(() => Int)
  @Column()
  step: number

  @Field()
  @Column()
  instruction: string

  @Field(() => Recipe)
  @ManyToOne(() => Recipe, recipe => recipe.preparation, { onDelete: 'CASCADE' })
  recipe: Promise<Recipe>
}
