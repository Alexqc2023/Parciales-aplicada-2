import { Router } from 'express';
import { getLibros, agregarLibro, eliminarLibro } from '../controllers/libro.controller.js';
import { verifyToken, verifyAdmin } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', verifyToken, getLibros);
router.post('/', verifyToken, verifyAdmin, agregarLibro);
router.delete('/:id', verifyToken, verifyAdmin, eliminarLibro);

export default router;