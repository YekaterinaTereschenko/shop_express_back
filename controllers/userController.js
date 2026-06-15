import ApiError from "./error/ApiError.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import models from '../models/models.js';
const {User, Basket} = models;

const generateJwt = (id, email, role) => {
    return jwt.sign({
        id: id, email, role}, 
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next) {
        const {email, password, role} = req.body
        if(!email || !password) {
            return next(console.log('Registration Error'))
        }

        const candidate = await User.findOne({where: {email}})
        if(candidate) {
            return next(console.log('already exist'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, role, password: hashPassword})
        const basket = await Basket.create({userId: user.id})
        const token = generateJwt(user.id, email, role)
        return res.json({token})
    }

    async login(req, res, next) {
        const {email, password, role} = req.body
        const user = await User.findOne({where: {email}})
        if(!user) {
            return next(console.log('Login Error'))
        }
        const comparePassword = bcrypt.compareSync(password, user.password)
        if(!comparePassword) {
            return next(console.log('Enter correct password'))
        }
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }
}

export default new UserController();