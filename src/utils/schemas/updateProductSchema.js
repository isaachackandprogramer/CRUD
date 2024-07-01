import * as yup from 'yup'

const updateProductSchema = yup.object({
    body: yup.object({
        name: yup.string().strict(),
        description: yup.string().strict(),
        price: yup.string().strict()
    })
})

export { updateProductSchema }