import { Router } from 'express';
import { pedirPrestado, devolverLibro, verTodosPrestamos, misPrestamos } from '../controllers/prestamos.controller.js';
import { verifyToken, verifyAdmin } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/', verifyToken, pedirPrestado);

router.put('/:id/devolver', verifyToken, devolverLibro);

router.get('/mis-prestamos', verifyToken, misPrestamos);

router.get('/', verifyToken, verifyAdmin, verTodosPrestamos);

export default router;