import * as yup from "yup"

const getProductsSchema = yup.object({
    body: yup.object({
        userId: yup.number().required().strict()
    })
})

export { getProductsSchema }