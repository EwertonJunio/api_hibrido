const UserRepository = require('../repositories/UserRepository');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

function tokenGenerate(user) {
  return jwt.sign(
      {
        id: user._id,
        nome: user.nome,
      },
      process.env.AUTH_SECRET,
      {
        expiresIn: 86400,
      }
  );
}

module.exports = {
  async registrar(req, res) {
    const { nome, email, senha, idade, genero } = req.body;

    try {
      const usuarioExistente = await UserRepository.findByEmail(email);

      if (usuarioExistente) {
        return res.status(400).json({ error: true, message: 'Usuário já existe' });
      }

      const hashedPassword = await bcrypt.hash(senha, 10);
      const usuario = await UserRepository.create({ nome, email, senha: hashedPassword, idade, genero });

      return res.status(200).json({ usuario, token: tokenGenerate(usuario) });
    } catch (error) {
      return res.status(500).json({ error: true, message: 'Erro ao registrar usuário' });
    }
  },

  async listarUsuarios(req, res) {
    try {
      const usuarios = await UserRepository.findAll();
      return res.status(200).json(usuarios);
    } catch (error) {
      return res.status(500).json({ error: true, message: 'Erro ao buscar usuários' });
    }
  },

  async buscarUsuarioPorId(req, res) {
    const id = req.params.id;

    try {
      const usuario = await UserRepository.findById(id);

      if (!usuario) {
        return res.status(404).json({ error: true, message: 'Usuário não encontrado' });
      }

      return res.status(200).json(usuario);
    } catch (error) {
      return res.status(500).json({ error: true, message: 'Erro ao buscar usuário' });
    }
  },

  async atualizarUsuarioPorId(req, res) {
    const id = req.params.id;
    const { nome, email, senha, idade, genero } = req.body;

    try {
      const camposAtualizados = {};

      if (nome) camposAtualizados.nome = nome;
      if (email) camposAtualizados.email = email;
      if (senha) camposAtualizados.senha = await bcrypt.hash(senha, 10);
      if (idade) camposAtualizados.idade = idade;
      if (genero) camposAtualizados.genero = genero;

      const usuarioAtualizado = await UserRepository.updateById(id, camposAtualizados);

      if (!usuarioAtualizado) {
        return res.status(404).json({ error: true, message: 'Usuário não encontrado ou nenhum campo foi atualizado' });
      }

      return res.status(200).json(usuarioAtualizado);
    } catch (error) {
      return res.status(500).json({ error: true, message: 'Erro ao atualizar usuário' });
    }
  },

  async excluirUsuarioPorId(req, res) {
    const id = req.params.id;

    try {
      const usuario = await UserRepository.deleteById(id);

      if (!usuario) {
        return res.status(404).json({ error: true, message: 'Usuário não encontrado' });
      }

      return res.status(200).json({ error: false, message: 'Usuário excluído com sucesso' });
    } catch (error) {
      return res.status(500).json({ error: true, message: 'Erro ao excluir usuário' });
    }
  },

  async autenticar(req, res) {
    const { email, senha } = req.body;

    try {
      const usuario = await UserRepository.findByEmail(email);

      if (!usuario) {
        return res.status(404).json({ error: true, message: 'Usuário não encontrado' });
      }

      const senhaValida = await bcrypt.compare(senha, usuario.senha);

      if (!senhaValida) {
        return res.status(401).json({ error: true, message: 'Senha inválida' });
      }

      usuario.senha = undefined;
      return res.status(200).json({ usuario, token: tokenGenerate(usuario) });
    } catch (error) {
      return res.status(500).json({ error: true, message: 'Erro ao autenticar usuário' });
    }
  },
};
