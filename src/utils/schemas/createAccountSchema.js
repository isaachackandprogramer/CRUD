import * as yup from "yup"

const createAccountSchema = yup.object({
    body: yup.object({
        name: yup.string().required(),
        email: yup.string().email().required(),
        nickName: yup.string().required(),
        password: yup.string().required()
    })
});

export { createAccountSchema }