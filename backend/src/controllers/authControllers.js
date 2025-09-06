import express from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { autenticarUsuario, insertNewUser, usuarioJaExiste } from '../services/authServices.js';

export const login = async (req, res) => {
    try {
        const { email, senha } = req.body;
        if (!email || !senha) {
            console.log('Email ou senha vazios!');
            return res.status(403).json({ error: 'E-mail ou Senha inválidos!' });
        }

        const authResult = await autenticarUsuario(email, senha);

        if (authResult.success) {
            res.cookie('authToken', authResult.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 3600000,
            });

            return res.status(201).json({ message: 'Logado com sucesso!' });
        } else {
            console.log('Email ou senha incorretos!');
            return res.status(401).json({ error: 'E-mail ou Senha inválidos!' });
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
            res.status(400).json({ error: 'Preencha todos os campos!' });
        }

        if (senha != senhaConfirmacao) {
            res.status(400).json({ error: 'As senhas não coincidem!' });
        }

        const userExist = await usuarioJaExiste(email);

        if (userExist) {
            res.status(400).json({ error: 'E-mail, já está em uso!' });
        }

        const insert = await insertNewUser({ nome, email, senha })

        if (insert.success) {
            return res.status(201).json({ message: 'Cadastrado com sucesso!' });
        } else {
            return res.status(400).json({ error: 'Falha ao cadastrar usuario!' });
        }
    } catch (e) {
        res.status(500).json({ error: 'Erro de rede, tente novamente mais tarde!' });
        console.log('Erro function cadastrarUser: ' + e);
    }

}