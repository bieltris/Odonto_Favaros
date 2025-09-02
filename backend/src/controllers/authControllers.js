import express from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { autenticarUsuario } from '../routes/authRoutes.js';

export const login = async (req, res) => {
    try {
        const { email, senha } = req.body;
        if (!email.trim() || !senha.trim()) {
            return res.status(401).json({ error: 'E-mail ou Senha inválidos!' });
        }

        const success = await autenticarUsuario(email, senha);

        if (success) {
            res.status(201).json({ message: 'Logado com sucesso!' });
        } else {
            return res.status(401).json({ error: 'E-mail ou Senha inválidos!' });
        }
    } catch (e) {
        res.status(500).json({ error: 'Erro de rede, tente novamente mais tarde!' });
    }
}