import * as yup from 'yup'

const updateUserSchema = yup.object({
    body: yup.object({
        name: yup.string().strict(),
        email: yup.string().strict(),
        nickName: yup.string().strict()
    })
})

export { updateUserSchema }