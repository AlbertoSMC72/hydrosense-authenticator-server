import express from 'express';
import cors from 'cors';
import index from './src/routes/index.router.js';
import config from './src/config/config.js';
import https from 'https';
import fs from 'fs';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use("/", index);

app.use((req, res) => {
    res.status(404).send("Wrong route");
});

const options = {
    key: fs.readFileSync('/etc/letsencrypt/live/hydrosense-autentificador.integrador.xyz/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/hydrosense-autentificador.integrador.xyz/fullchain.pem')
};

config.connect().then(() => {
    console.log("Database connected");
    https.createServer(options, app).listen(PORT, () => {
        console.log(`HTTPS Server running on port ${PORT}`);
    });
}).catch((error) => {
    console.log("Error al iniciar el servidor:", error);
});
