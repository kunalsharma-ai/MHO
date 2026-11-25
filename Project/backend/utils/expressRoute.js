import {APIResponse} from "./index.js"
export default function expressRoute(callback, Controller) {
    return async (req, res) => {
        try {
            Controller.request = req;
            const { message, data,token } = await callback(req);
            if(!token)
            return res.json(APIResponse.Success(message, data))
            return res.json({
                status:"success",
                message,
                token
            })
        } catch (error) {
            console.log(error)
            res.status(404).json(APIResponse.Error(error.message))
        }
    }
}