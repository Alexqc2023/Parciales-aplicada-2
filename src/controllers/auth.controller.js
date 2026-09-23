import prisma from '../db.js';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registro = async (req, res) => {
    const { nombre, email, password, rol } = req.body;
    try {
        const hashPassword = await bcrypt.hash(password, 10);

        const usuario = await prisma.usuario.create({
            
            data: { nombre, email, password: hashPassword, rol: rol || "usuario" }
        });
        res.status(201).json({ mensaje: "Usuario registrado", id: usuario.id });
    } catch (error) {
        res.status(400).json({ error: "El email ya esta registrado o faltan datos" });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const usuario = await prisma.usuario.findUnique({ where: { email } });

        if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });

        const passValido = await bcrypt.compare(password, usuario.password);
        
        if (!passValido) return res.status(401).json({ error: "password incorrecta intenta otra vez" });

        const token = jwt.sign(
            { id: usuario.id, rol: usuario.rol }, 

            process.env.JWT_SECRET || 'clave_de_libro', 

            { expiresIn: '2h' }
        );
        res.status(200).json({ token });

    } catch (error) {

        res.status(500).json({ error: "Error en el servidor" });
    }
};