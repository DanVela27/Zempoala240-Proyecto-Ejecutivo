const fs = require('node:fs');
const vm = require('node:vm');
const input = process.argv[2];
if (!input) throw Error('Indica la ruta del respaldo descargado del dashboard.');
const backup = JSON.parse(fs.readFileSync(input, 'utf8'));
if (![1,2].includes(backup.version) || backup.project !== 'Zempoala 240') throw Error('El archivo no corresponde a este dashboard.');
const script = fs.readFileSync('dashboard.html', 'utf8').match(/<script>([\s\S]*?)<\/script>/)[1];
const validation = script.slice(0, script.indexOf('try{if(snapshot'));
const context = vm.createContext({structuredClone, location:{protocol:'file:', search:''}, URLSearchParams, window:{migrarLaminas:require('./migrar-laminas.js').migrate}, backup});
vm.runInContext(validation + ';globalThis.validated = readRows(backup);', context);
const snapshot = {version:2, updated:new Date().toISOString(), rows:context.validated};
fs.writeFileSync('datos-publicados.js', 'window.ZEMPOALA_PUBLICADO = ' + JSON.stringify(snapshot, null, 2).replace(/</g, '\\u003c') + ';\n');
console.log('Actualización preparada: ' + snapshot.rows.length + ' planos. Revisa y publica la versión.');

const crypto = require('node:crypto');
const revision = crypto.createHash('sha256').update(fs.readFileSync('datos-publicados.js')).digest('hex').slice(0,12);
const html = fs.readFileSync('dashboard.html', 'utf8').replace(/src="datos-publicados\.js(?:\?v=[a-f0-9]+)?"/, 'src="datos-publicados.js?v=' + revision + '"');
fs.writeFileSync('dashboard.html', html);
