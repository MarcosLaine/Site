// Executa um arquivo de migração SQL usando a mesma conexão do backend (backend/.env).
// Uso (dentro de backend/): npm run migrate -- database/migration_update_po_2026_10.sql
import 'dotenv/config';
import { readFile } from 'node:fs/promises';

const file = process.argv[2];

if (!file) {
  console.error('Uso: npm run migrate -- <arquivo.sql>');
  process.exit(1);
}

const missing = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'].filter((key) => !process.env[key]);
if (missing.length > 0) {
  console.error(`❌ Faltam variáveis no backend/.env: ${missing.join(', ')}`);
  console.error('   Use os mesmos valores configurados no serviço do Render (inclua DB_PORT e DB_SSL=true para o Aiven).');
  process.exit(1);
}

const { default: pool } = await import('../config/database.js');

const sql = await readFile(file, 'utf8');

// Remove comentários de linha e separa por ";" no fim da linha
const statements = sql
  .split('\n')
  .filter((line) => !line.trim().startsWith('--'))
  .join('\n')
  .split(/;\s*$/m)
  .map((s) => s.trim())
  .filter(Boolean);

const connection = await pool.getConnection();
try {
  await connection.beginTransaction();
  for (const statement of statements) {
    const [result] = await connection.query(statement);
    console.log(`✔ ${statement.split('\n')[0]} … (${result.affectedRows ?? 0} linha(s))`);
  }
  await connection.commit();
  console.log(`✅ ${statements.length} comando(s) aplicados de ${file}`);
} catch (error) {
  await connection.rollback();
  console.error('❌ Migração revertida:', error.message);
  process.exitCode = 1;
} finally {
  connection.release();
  await pool.end();
}
