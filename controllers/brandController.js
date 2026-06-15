import models from '../models/models.js';
const { Brand } = models;
import ApiError from './error/ApiError.js';

class BrandController {
    async post(req, res) {
        const {name} = req.body
        const type = await Brand.create({name})
        return res.json(type)
    }

    async get(req, res) {
        const types = await Brand.findAll()
        return res.json(types)
    }
}

export default new BrandController();