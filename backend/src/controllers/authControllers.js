import express from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { autenticarUsuario, insertNewUser } from '../services/authServices.js';

export const login = async (req, res) => {
    try {
        const { email, senha } = req.body;
        if (!email || !senha) {
            return res.status(403).json({ error: 'E-mail ou Senha inválidos!' });
        }

        const login = await autenticarUsuario(email, senha);

        if (login.success) {
            return res.status(201).json({ message: 'Logado com sucesso!', token: login.token});
        } else {
            return res.status(400).json({ error: 'E-mail ou Senha inválidos!' });
        }
    } catch (e) {
        res.status(500).json({ error: 'Erro de rede, tente novamente mais tarde!' });
        console.log('Erro function login: ' + e);
    }
}

export const cadastrarUser = async (req, res) => {
    try {
        const { nome, email, senha, senhaConfirmacao } = req.body;

        if (!nome || !email || !senha || !senhaConfirmacao) {
            res.status(402).json({ error: 'Preencha todos os campos!' });
        }
        
        if (senha != senhaConfirmacao) {
            res.status(402).json({ error: 'As senhas não coincidem!' });
        }

        const insert = await insertNewUser({ nome, email, senha })

        if (insert.success) {
            return res.status(201).json({ message: 'Cadastrado com sucesso!' });
        } else {
            return res.status(401).json({ error: 'Falha ao cadastrar usuario!' });
        }
    } catch (e) {
        res.status(500).json({ error: 'Erro de rede, tente novamente mais tarde!' });
        console.log('Erro function cadastrarUser: ' + e);
    }

}