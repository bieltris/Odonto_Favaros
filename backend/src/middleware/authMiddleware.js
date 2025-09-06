
import jwt from 'jsonwebtoken';

export const checkAuth = (req, res, next) => {
    const token = req.cookies.authToken;

    if (!token) {
        return res.status(401).json({ error: 'Acesso não autorizado. Faça login.' });
    }

    try {
        const jwtSecret = process.env.JWT_SECRET;
        const decodedPayload = jwt.verify(token, jwtSecret);
        
        req.user = decodedPayload; 
        next(); 

    } catch (error) {
        return res.status(401).json({ error: 'Token inválido ou expirado.' });
    }
};
export const checkAdmin = (req, res, next) => {
    if (req.user && req.user.perfilId === 2) { 
        next(); 
    } else {
        res.status(403).json({ erros: "Pemissão negada."});
    }
};