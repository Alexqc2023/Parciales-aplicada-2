import 'dotenv/config';
import express from 'express';
import { requestLogger } from './middlewares/logger.middleware.js';
import { verifyToken, verifyAdmin } from './middlewares/auth.middleware.js';

import { registro, login } from './controllers/auth.controller.js';

import { getLibros, agregarLibro, eliminarLibro } from './controllers/libro.controller.js';

import { pedirPrestado, devolverLibro, verTodosPrestamos, misPrestamos } from './controllers/prestamos.controller.js';

const app = express();
app.use(express.json());
app.use(requestLogger);


app.post('/auth/registro', registro);
app.post('/auth/login', login);


app.get('/libros', verifyToken, getLibros);

app.post('/libros', verifyToken, verifyAdmin, agregarLibro);

app.delete('/libros/:id', verifyToken, verifyAdmin, eliminarLibro);


app.post('/prestamos', verifyToken, pedirPrestado);

app.put('/prestamos/:id/devolver', verifyToken, devolverLibro);

app.get('/prestamos/mis-prestamos', verifyToken, misPrestamos);

app.get('/prestamos', verifyToken, verifyAdmin, verTodosPrestamos); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`la api de la Biblioteca deberia ir corriendo en http://localhost:${PORT}`);
});