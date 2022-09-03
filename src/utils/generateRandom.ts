import { faker } from '@faker-js/faker'

const generator = (size: number): string => {
  return faker.random.numeric(size)
}

export default generator
