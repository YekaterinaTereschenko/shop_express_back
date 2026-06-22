import models from '../models/models.js';
const { Basket, BasketDevice, Device } = models;
import ApiError from './error/ApiError.js';

class BasketController {
    async get(req, res) {
        const {id} = req.user

        const basket = await Basket.findOne({
            where: {userId: id},
            include: [{
                model: BasketDevice,
                include: [{
                    model: Device
                }]
            }]
        })

        return res.json(basket)
    }

    async post(req, res) {
        const { deviceId, quantity = 1 } = req.body
        const { id } = req.user

        let basket = await Basket.findOne({ where: { userId: id } })
        if (!basket) {
            basket = await Basket.create({ userId: id })
        }

        // если товар уже есть в корзине — увеличиваем количество
        const existing = await BasketDevice.findOne({ where: { basketId: basket.id, deviceId } })

        if (existing) {
            await existing.update({ quantity: existing.quantity + quantity })
            return res.json(existing)
        }

        const basketDevice = await BasketDevice.create({ basketId: basket.id, deviceId, quantity })
        return res.json(basketDevice)
    }


    async delete(req, res) {
        const { id } = req.params

        await BasketDevice.destroy({ where: { id } })

        return res.json({ message: 'Удалено' })
    }
}

export default new BasketController();