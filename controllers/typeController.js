import models from '../models/models.js';
const { Type } = models;
import ApiError from './error/ApiError.js';

class TypeController {
    async post(req, res) {
        const {name} = req.body
        const type = await Type.create({name}).catch(e => { throw new Error(e.message) })
        return res.json(type)
    }

    async get(req, res) {
        const brands = await Type.findAll()
        return res.json(brands)
    }
}

export default new TypeController();