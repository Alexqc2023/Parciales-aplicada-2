import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {

const token = req.headers['authorization']?.split(' ')[1];

if (!token) return res.status(401).json({ error: "Acceso denegado, quedan tokens faltante" });

    try {
        const verificado = jwt.verify(token, process.env.JWT_SECRET || 'clave_de_libro');
        req.usuario = verificado; 
        next();
    } catch (error) {
        res.status(401).json({ error: "token invalido" });
    }
};

export const verifyAdmin = (req, res, next) => {

    if (req.usuario.rol !== 'admin') {
       
        return res.status(403).json({ error: "Acceso no aprobado, solo administradores" });
    }
    next();
};

