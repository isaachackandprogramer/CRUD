import * as yup from 'yup'

const updatePasswordSchema = yup.object({
    body: yup.object({
        password: yup.string().strict().required(),
        newpassword: yup.string().strict().required()
    })
})

export { updatePasswordSchema }