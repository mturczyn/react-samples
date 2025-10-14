import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class User {
    @PrimaryGeneratedColumn({
        type: 'integer',
    })
    id?: number

    @Column({
        type: 'varchar',
    })
    firstName?: string

    @Column({
        type: 'varchar',
    })
    lastName?: string

    @Column({
        type: 'boolean',
    })
    isActive?: boolean
}
