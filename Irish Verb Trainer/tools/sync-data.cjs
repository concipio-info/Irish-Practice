// Regenerate the browser's classic-script data bundle after editing data/verbs.json.
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');const data=JSON.parse(fs.readFileSync(path.join(root,'data/verbs.json'),'utf8'));
if(data.verbs.length!==61||data.verbs.filter(v=>v.irregular).length!==11)throw Error('Expected 11 irregular + 50 regular verbs');
fs.writeFileSync(path.join(root,'data.js'),'/* BuNaMo-derived database: ODbL 1.0; see licenses. */\nglobalThis.IRISH_DATA = '+JSON.stringify(data)+';\n');
console.log('Updated data.js');
