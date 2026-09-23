import prisma from '../db.js';

export const pedirPrestado = async (req, res) => {
    const { libroId } = req.body;
    try {
        const libro = await prisma.libro.findUnique({ where: { id: libroId } });

        if (!libro) return res.status(404).json({ error: "Libro no encontrado" });

        if (!libro.disponible) return res.status(400).json({ error: "El libro no se encuentra disponible" }); 

        
        const prestamo = await prisma.prestamo.create({
            data: { usuarioId: req.usuario.id, libroId }
        });
        await prisma.libro.update({
            where: { id: libroId },
            data: { disponible: false }
        });

        res.status(201).json(prestamo);
    } catch (error) {
        res.status(500).json({ error: "error al procesar el prestamo" });
    }
};

export const devolverLibro = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const prestamo = await prisma.prestamo.findUnique({ where: { id } });
        if (!prestamo) return res.status(404).json({ error: "Prestamo no resgistrado" });
        
        if (prestamo.usuarioId !== req.usuario.id) {
            return res.status(403).json({ error: "No puedes devolver un libro" });
        }

        const actualizado = await prisma.prestamo.update({
            where: { id },
            data: { fechaFin: new Date() }
        });
        await prisma.libro.update({
            where: { id: prestamo.libroId },
            data: { disponible: true } 
        });

        res.json({ mensaje: "Libro devuelto existosamente", prestamo: actualizado });
    } catch (error) {
        res.status(500).json({ error: "Error al devolver el libro" });
    }
};

export const verTodosPrestamos = async (req, res) => {
    
    const prestamos = await prisma.prestamo.findMany({ include: { usuario: true, libro: true } });
    res.json(prestamos);
};

export const misPrestamos = async (req, res) => {
    const prestamos = await prisma.prestamo.findMany({

        where: { usuarioId: req.usuario.id },

        include: { libro: true }
    });
    res.json(prestamos);
};