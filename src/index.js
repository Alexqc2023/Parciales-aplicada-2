import 'dotenv/config';
import express from 'express';
import { requestLogger } from './middlewares/logger.middleware.js';


import authRoutes from './routes/auth.routes.js';

import libroRoutes from './routes/libro.routes.js';

import prestamosRoutes from './routes/prestamos.routes.js';

const app = express();


app.use(express.json());
app.use(requestLogger);


app.use('/auth', authRoutes);

app.use('/libros', libroRoutes);

app.use('/prestamos', prestamosRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API de la Biblioteca corriendo en el puerto ${PORT}`);
});