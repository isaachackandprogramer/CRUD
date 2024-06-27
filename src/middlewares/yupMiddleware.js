export const yupMiddleware = schema => async (req, res, next) => {
    try {
        await schema.validate({
            body: req.body
        })
        next()
    } catch (err) {
        console.log(err.message)
        res.status(400).json({ message: `${err.name}.${err.message}` })
    }
} 