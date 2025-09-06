
import jwt from 'jsonwebtoken';

export const checkAuth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.redirect('/'); 
        }

        const token = authHeader.split(' ')[1];
        const jwtSecret = process.env.JWT_SECRET;

        const decodedPayload = jwt.verify(token, jwtSecret);

        req.user = decodedPayload; 

        next();

    } catch (error) {
        console.error("Authentication error:", error.message);
        return res.redirect('/'); 
    }
};

export const checkAdmin = (req, res, next) => {
    if (req.user && req.user.perfilId === 2) { 
        next(); 
    } else {
        res.status(403).json({ erros: "Pemissão negada."});
    }
};