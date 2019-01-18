import { Field, ID, ObjectType } from 'type-graphql'
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm'
import { Category, Ingredient, Preparation } from './'

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
  @ManyToMany(() => Ingredient, ingredient => ingredient.recipes, { eager: true })
  @JoinTable()
  ingredients: Ingredient[]

  @Field(() => [Category])
  @ManyToMany(() => Category, category => category.recipes, { eager: true })
  @JoinTable()
  categories: Category[]

  @Field(() => [Preparation])
  @OneToMany(() => Preparation, preparation => preparation.recipe, { eager: true, cascade: true })
  preparation: Preparation[]
}
