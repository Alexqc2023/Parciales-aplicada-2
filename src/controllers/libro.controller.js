import prisma from '../db.js';

export const getLibros = async (req, res) => {
    
    const libros = await prisma.libro.findMany(); 
    res.json(libros);
};

export const agregarLibro = async (req, res) => {
    const { titulo, autor } = req.body;

    const libro = await prisma.libro.create({ data: { titulo, autor } });
    
    res.status(201).json(libro);
};

export const eliminarLibro = async (req, res) => {
    const id = parseInt(req.params.id);

    await prisma.libro.delete({ where: { id } });

    res.json({ mensaje: "libro borrado" });
};