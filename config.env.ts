import dotenv from 'dotenv'
dotenv.config({ path: '.env' })

const config = {
  development: {
    ormConfig: {
      type: 'mysql',
      host: process.env.LOCAL_DATABASE_URI,
      port: 3306,
      username: process.env.LOCAL_DATABASE_USERNAME,
      password: process.env.LOCAL_DATABASE_PASSWORD,
      database: process.env.LOCAL_DATABASE_NAME,
      synchronize: true,
      cache: true,
      entities: [__dirname + '/src/entities/*.ts']
    },
  },
  production: {
    ormConfig: {
      type: 'mysql',
      host: process.env.AWS_RDS_DATABASE_URI,
      port: 3306,
      username: process.env.AWS_RDS_DATABASE_USERNAME,
      password: process.env.AWS_RDS_DATABASE_PASSWORD,
      database: process.env.AWS_RDS_DATABASE_NAME,
      synchronize: false,
      cache: true,
      entities: [__dirname + '/src/entities/*.js']
    },
  },
}

const envConfig = config[process.env.NODE_ENV || 'development']
export default envConfig
