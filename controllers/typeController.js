import models from '../models/models.js';
const { Type } = models;
import ApiError from './error/ApiError.js';

class TypeController {
    async post(req, res) {
        const {name} = req.body
        const brand = await Type.create({name})
        return res.json(type)
    }

    async get(req, res) {
        const brands = await Type.findAll()
        return res.json(brands)
    }
}

export default new TypeController();