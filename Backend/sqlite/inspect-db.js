const path = require('path');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, 'clashRoyale.db');
console.log('Opening DB:', dbPath);
try {
  const db = new Database(dbPath, { readonly: true });

  const tables = db.prepare("SELECT name, type FROM sqlite_master WHERE type IN ('table','view') ORDER BY name").all();
  console.log('\nTables and views:');
  tables.forEach(t => console.log('-', t.name, `(${t.type})`));

  const userCandidates = ['usuarios','usuario','users','user','accounts','accounts_users'];
  const found = tables.map(t => t.name.toLowerCase());

  for (const cand of userCandidates) {
    if (found.includes(cand)) {
      console.log(`\nFound table matching '${cand}':\n`);
      const info = db.prepare(`PRAGMA table_info(${cand})`).all();
      console.log('Columns:');
      info.forEach(col => console.log(` - ${col.name} (${col.type})`));
      console.log(`\nFirst 20 rows from ${cand}:`);
      const rows = db.prepare(`SELECT * FROM ${cand} LIMIT 20`).all();
      console.dir(rows, { depth: 2, maxArrayLength: 50 });
    }
  }

  if (!userCandidates.some(c => found.includes(c))) {
    console.log('\nNo obvious user table found. Showing first 20 rows from each table:');
    for (const t of tables) {
      console.log(`\nTable: ${t.name}`);
      try {
        const rows = db.prepare(`SELECT * FROM ${t.name} LIMIT 5`).all();
        console.dir(rows, { depth: 2, maxArrayLength: 20 });
      } catch (err) {
        console.log('  (could not read rows)', err.message);
      }
    }
  }

  db.close();
} catch (err) {
  console.error('Error opening DB:', err.message);
  process.exit(1);
}
