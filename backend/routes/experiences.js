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

/** Converte bullets (array ou JSON string) para JSON string para gravar no banco */
function toBulletsJson(bullets) {
  if (bullets === undefined || bullets === null) return null;
  return Array.isArray(bullets) ? JSON.stringify(bullets) : bullets;
}

// GET /api/experiences - Listar experiências ativas (ordenadas)
router.get('/', async (req, res) => {
  try {
    const [experiences] = await pool.execute(
      'SELECT * FROM experiences WHERE is_active = true ORDER BY `index` ASC, created_at DESC'
    );

    res.json({
      success: true,
      data: experiences,
      count: experiences.length
    });
  } catch (error) {
    console.error('Erro ao buscar experiências:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao buscar experiências'
    });
  }
});

// POST /api/experiences - Criar experiência (requer API Key)
router.post('/', checkApiKey, async (req, res) => {
  try {
    const { role, role_en, period, bullets, bullets_en, index = 0 } = req.body;

    if (!role || !period || !bullets) {
      return res.status(400).json({
        success: false,
        error: 'role, period e bullets são obrigatórios'
      });
    }

    const [result] = await pool.execute(
      'INSERT INTO experiences (role, role_en, period, bullets, bullets_en, `index`) VALUES (?, ?, ?, ?, ?, ?)',
      [role, role_en || null, period, toBulletsJson(bullets), toBulletsJson(bullets_en), Number(index)]
    );

    res.status(201).json({
      success: true,
      data: { id: result.insertId, role, role_en, period, index: Number(index) },
      message: 'Experiência criada com sucesso'
    });
  } catch (error) {
    console.error('Erro ao criar experiência:', error);
    res.status(500).json({ success: false, error: 'Erro ao criar experiência' });
  }
});

// PUT /api/experiences/:id - Atualizar experiência (requer API Key)
router.put('/:id', checkApiKey, async (req, res) => {
  try {
    const { id } = req.params;
    const { role, role_en, period, bullets, bullets_en, index, is_active } = req.body;

    const fields = [];
    const values = [];

    if (role !== undefined) { fields.push('role = ?'); values.push(role); }
    if (role_en !== undefined) { fields.push('role_en = ?'); values.push(role_en); }
    if (period !== undefined) { fields.push('period = ?'); values.push(period); }
    if (bullets !== undefined) { fields.push('bullets = ?'); values.push(toBulletsJson(bullets)); }
    if (bullets_en !== undefined) { fields.push('bullets_en = ?'); values.push(toBulletsJson(bullets_en)); }
    if (index !== undefined) { fields.push('`index` = ?'); values.push(Number(index)); }
    if (is_active !== undefined) { fields.push('is_active = ?'); values.push(is_active); }

    if (fields.length === 0) {
      return res.status(400).json({ success: false, error: 'Nenhum campo para atualizar' });
    }

    values.push(id);

    const [result] = await pool.execute(
      `UPDATE experiences SET ${fields.join(', ')} WHERE id = ?`,
      values
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, error: 'Experiência não encontrada' });
    }

    res.json({ success: true, message: 'Experiência atualizada com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar experiência:', error);
    res.status(500).json({ success: false, error: 'Erro ao atualizar experiência' });
  }
});

// DELETE /api/experiences/:id - Soft delete (requer API Key)
router.delete('/:id', checkApiKey, async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.execute(
      'UPDATE experiences SET is_active = false WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, error: 'Experiência não encontrada' });
    }

    res.json({ success: true, message: 'Experiência deletada com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar experiência:', error);
    res.status(500).json({ success: false, error: 'Erro ao deletar experiência' });
  }
});

export default router;
