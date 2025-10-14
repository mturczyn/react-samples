import { DataSource } from 'typeorm'
import { User } from './User'

export const AppDataSource = new DataSource({
    // Database type: mysql | sqlite | postgres | etc.
    type: 'postgres',
    host: process.env.DATABASE_HOST_NAME,
    port: 5432,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_INITIAL_DATABASE,
    // Auto-create database tables
    synchronize: true,
    logging: false,
    // Your entity classes
    entities: [User],
    migrations: [],
    subscribers: [],
    ssl: true
})