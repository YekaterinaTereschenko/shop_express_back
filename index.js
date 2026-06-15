import 'dotenv/config';
import express from 'express';
import sequelize from './db.js';
import models from './models/models.js';
const PORT = process.env.PORT || 5000
import cors from 'cors'
import router from './routes/index.js';
import fileUpload from 'express-fileupload';
import path from "path";
import {fileURLToPath} from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, "static")))
app.use(fileUpload({}))
app.use('/api', router)

app.get('/', (req, res) => {
    res.status(200).json({message: 'WORKING'})
})

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log('server run on 5000'))
    } catch (e) {
        console.log(e);  
    }
}

start()
