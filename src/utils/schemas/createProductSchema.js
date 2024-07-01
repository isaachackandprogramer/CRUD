import * as yup from 'yup'

const createProductSchema = yup.object({
    body: yup.object({
        name: yup.string().required().strict(),
        description: yup.string().strict(),
        barcode: yup.string().required().strict(),
        userId: yup.number().required().strict()
    })
})

export { createProductSchema }