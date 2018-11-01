import { bootstrap } from 'vesper'

bootstrap({
  port: 8080,
  controllers: [__dirname + '/controller/**/*.ts'],
  entities: [__dirname + '/entity/**/*.ts'],
  resolvers: [__dirname + '/resolver/**/*.ts'],
  schemas: [__dirname + '/schema/**/*.graphql']
}).then(() => {
  console.log('GraphQL API running at localhost:8080')
}).catch(err => {
  console.error(err.stack ? err.stack : err)
})
