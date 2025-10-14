import { createServerFn } from '@tanstack/react-start'
import { AppDataSource } from './AppDataSource'
import { User } from './User'

export const getUsers = createServerFn().handler(async () => {
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize()
    }

    const userRepository = AppDataSource.getRepository(User)

    const users = await userRepository.find()

    return users.map((x) => ({
        id: x.id,
        firstName: x.firstName,
        lastName: x.lastName,
        isActive: x.isActive,
    }))
})

export const createNewUser = createServerFn()
    .inputValidator((data: { firstName: string; lastName: string }) => {
        if (!data) throw new Error('Emprty data passed!')
        return { firstName: data.firstName, lastName: data.lastName }
    })
    .handler(async ({ data }) => {
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize()
        }

        const userRepository = AppDataSource.getRepository(User)

        // example userRepository. to save DM entity
        const user = new User()
        user.firstName = data.firstName
        user.lastName = data.lastName
        user.isActive = true
        await userRepository.save(user)

        // example how to remove DM entity
        // await userRepository.remove(user)

        // example how to load DM entities
        // const users = await userRepository.find({ skip: 2, take: 5 })
        // const newUsers = await userRepository.findBy({ isActive: true })
        // const timber = await userRepository.findOneBy({
        //     firstName: 'Timber',
        //     lastName: 'Saw',
        // })
    })
