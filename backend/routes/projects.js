import express from 'express';
import pool from '../config/database.js';

const router = express.Router();

// Middleware para verificar API Key (para operações de escrita)
const checkApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  
  if (!process.env.API_KEY || apiKey === process.env.API_KEY) {
    next();
  } else {
    res.status(401).json({ error: 'API Key inválida' });
  }
};

// GET /api/projects - Listar todos os projetos ativos
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    
    let query = 'SELECT * FROM projects WHERE is_active = true';
    const params = [];
    
    if (category) {
      query += ' AND category = ?';
      params.push(category);
    }
    
    query += ' ORDER BY order_index ASC, created_at DESC';
    
    const [projects] = await pool.execute(query, params);
    
    res.json({
      success: true,
      data: projects,
      count: projects.length
    });
  } catch (error) {
    console.error('Erro ao buscar projetos:', error);
    res.status(500).json({ 
      success: false,
      error: 'Erro ao buscar projetos' 
    });
  }
});

// GET /api/projects/:id - Obter projeto específico
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const [projects] = await pool.execute(
      'SELECT * FROM projects WHERE id = ? AND is_active = true',
      [id]
    );
    
    if (projects.length === 0) {
      return res.status(404).json({ 
        success: false,
        error: 'Projeto não encontrado' 
      });
    }
    
    res.json({
      success: true,
      data: projects[0]
    });
  } catch (error) {
    console.error('Erro ao buscar projeto:', error);
    res.status(500).json({ 
      success: false,
      error: 'Erro ao buscar projeto' 
    });
  }
});

// POST /api/projects - Criar novo projeto (requer API Key)
router.post('/', checkApiKey, async (req, res) => {
  try {
    const {
      name,
      description,
      description_key,
      description_en,
      media_url,
      media_type = 'image',
      test_link,
      github_link,
      is_github_private = false,
      category = 'geral',
      technologies,
      order_index = 0
    } = req.body;
    
    // Validações
    if (!name || !description || !media_url) {
      return res.status(400).json({ 
        success: false,
        error: 'Nome, descrição e mídia são obrigatórios' 
      });
    }
    
    // Converter technologies para JSON string se for array
    const technologiesJson = technologies 
      ? (Array.isArray(technologies) ? JSON.stringify(technologies) : technologies)
      : null;

    const [result] = await pool.execute(
      `INSERT INTO projects 
      (name, description, description_key, description_en, media_url, media_type, test_link, github_link, is_github_private, category, technologies, order_index) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, description, description_key || null, description_en || null, media_url, media_type, test_link, github_link, is_github_private, category, technologiesJson, order_index]
    );
    
    res.status(201).json({
      success: true,
      data: {
        id: result.insertId,
        name,
        description,
        description_key,
        description_en,
        media_url,
        media_type,
        test_link,
        github_link,
        is_github_private,
        category,
        technologies: technologiesJson,
        order_index
      },
      message: 'Projeto criado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao criar projeto:', error);
    res.status(500).json({ 
      success: false,
      error: 'Erro ao criar projeto' 
    });
  }
});

// PUT /api/projects/:id - Atualizar projeto (requer API Key)
router.put('/:id', checkApiKey, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      description_key,
      description_en,
      media_url,
      media_type,
      test_link,
      github_link,
      is_github_private,
      category,
      technologies,
      order_index,
      is_active
    } = req.body;
    
    const fields = [];
    const values = [];
    
    if (name !== undefined) { fields.push('name = ?'); values.push(name); }
    if (description !== undefined) { fields.push('description = ?'); values.push(description); }
    if (description_key !== undefined) { fields.push('description_key = ?'); values.push(description_key); }
    if (description_en !== undefined) { fields.push('description_en = ?'); values.push(description_en); }
    if (media_url !== undefined) { fields.push('media_url = ?'); values.push(media_url); }
    if (media_type !== undefined) { fields.push('media_type = ?'); values.push(media_type); }
    if (test_link !== undefined) { fields.push('test_link = ?'); values.push(test_link); }
    if (github_link !== undefined) { fields.push('github_link = ?'); values.push(github_link); }
    if (is_github_private !== undefined) { fields.push('is_github_private = ?'); values.push(is_github_private); }
    if (category !== undefined) { fields.push('category = ?'); values.push(category); }
    if (technologies !== undefined) { 
      const technologiesJson = Array.isArray(technologies) ? JSON.stringify(technologies) : technologies;
      fields.push('technologies = ?'); 
      values.push(technologiesJson); 
    }
    if (order_index !== undefined) { fields.push('order_index = ?'); values.push(order_index); }
    if (is_active !== undefined) { fields.push('is_active = ?'); values.push(is_active); }
    
    if (fields.length === 0) {
      return res.status(400).json({ 
        success: false,
        error: 'Nenhum campo para atualizar' 
      });
    }
    
    values.push(id);
    
    const [result] = await pool.execute(
      `UPDATE projects SET ${fields.join(', ')} WHERE id = ?`,
      values
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ 
        success: false,
        error: 'Projeto não encontrado' 
      });
    }
    
    res.json({
      success: true,
      message: 'Projeto atualizado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao atualizar projeto:', error);
    res.status(500).json({ 
      success: false,
      error: 'Erro ao atualizar projeto' 
    });
  }
});

// DELETE /api/projects/:id - Deletar projeto (soft delete) (requer API Key)
router.delete('/:id', checkApiKey, async (req, res) => {
  try {
    const { id } = req.params;
    
    const [result] = await pool.execute(
      'UPDATE projects SET is_active = false WHERE id = ?',
      [id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ 
        success: false,
        error: 'Projeto não encontrado' 
      });
    }
    
    res.json({
      success: true,
      message: 'Projeto deletado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao deletar projeto:', error);
    res.status(500).json({ 
      success: false,
      error: 'Erro ao deletar projeto' 
    });
  }
});

export default router;


