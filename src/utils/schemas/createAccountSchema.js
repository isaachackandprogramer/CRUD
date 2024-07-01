import * as yup from "yup"

const createAccountSchema = yup.object({
    body: yup.object({
        name: yup.string().required("nome é obrigatório").strict(),
        email: yup.string().email("email inválido").required("email é obrigatório").strict(),
        nickName: yup.string().required("nickName é obrigatório").strict(),
        password: yup.string().required("Senha é nessessaria").strict()
    }).required()
});

export { createAccountSchema }
