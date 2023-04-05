import { usersList } from "../data/users.mjs"
import { decodeToken } from "../utils/token.mjs"

export const homeController = (req, res) => {
    const authId = decodeToken(req.headers.token)?.id;
    const user = usersList.find(({ _id }) => _id === authId)

    // jeigu nera tokeno ir userio error
    res.json({
        adress: user.adress,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        gender: user.gender,
        subscribe: user.subscribe,
    })
    
}