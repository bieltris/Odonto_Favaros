import express from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const authenticateUser = async (email, password) => {

    const user = await prisma.usuario.findUnique({
        where: {
            email: email,
        }
    });

    if (!user) {
        return { success: false, error: "E-mail ou Senha inválidos!" };
    }

    const isPasswordValid = await bcrypt.compare(password, user.senha);

    if (!isPasswordValid) {
        return { success: false, error: "E-mail ou Senha inválidos!" };
    }

    const payload = {
        userId: user.id,
        name: user.nome,
        perfilId: user.perfilId 
    };

    const jwtSecret = process.env.JWT_SECRET;

    const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });

    return { success: true, token: token };
};