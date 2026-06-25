import models from '../models/models.js';
const {Device, DeviceInfo} = models;
import path from "path";
import {fileURLToPath} from "url";
import {v4 as uuidv4} from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class DeviceController {
    async post(req, res, next) {
        try {
            const { name, price, brandId, typeId, info } = req.body;
            const { img } = req.files;
            let fileName = uuidv4() + ".jpg";
            const device = await Device.create({ name, price, brandId, typeId, img: fileName })
                .catch(e => { console.log('DEVICE ERROR:', e.message); throw e; });

            if(info) {
                const parsedInfo = JSON.parse(info)
                parsedInfo.forEach(i => {
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                });
            }

            img.mv(path.resolve(__dirname, "..", "static", fileName));

            return res.json(device);
        } catch (e) {
            next(e);
        }
    }

    async get(req, res) {
        let { brandId, typeId, limit, page } = req.query;
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let devices

        if (!brandId && !typeId) {
            devices = await Device.findAndCountAll({ limit, offset })
        }
        if (brandId && !typeId) {
            devices = await Device.findAndCountAll({where: {brandId}, limit, offset})
        }
        if (!brandId && typeId) {
            devices = await Device.findAndCountAll({where: {typeId}, limit, offset})
        }
        if (brandId && typeId) {
            devices = await Device.findAndCountAll({where: {brandId, typeId}, limit, offset})
        }
        return res.json(devices)
    }

    async getById(req, res) {
        const {id} = req.params
        const device =await Device.findOne(
            {
                where: {id},
                include: [{model: DeviceInfo, as: 'info'}]
            }
        )
        return res.json(device)
    }
}


export default new DeviceController();