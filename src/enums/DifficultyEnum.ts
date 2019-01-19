import { registerEnumType } from 'type-graphql'

export enum Difficulty {
  Easy,
  Medium,
  Hard
}

registerEnumType(Difficulty, {
  name: 'Difficulty',
  description: 'Recipe difficulty levels'
})
