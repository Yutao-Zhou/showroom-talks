'use strict';
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const source = path.join(root, 'site');
const output = path.resolve(root, 'build');
if (path.dirname(output) !== root || path.basename(output) !== 'build') throw new Error('Unexpected build destination');
for (const file of ['index.html', 'app.js', 'styles.css', 'reviews.json', '404.html']) {
  if (!fs.existsSync(path.join(source, file))) throw new Error(`Missing site file: ${file}`);
}
const reviews = JSON.parse(fs.readFileSync(path.join(source, 'reviews.json'), 'utf8'));
if (!Array.isArray(reviews) || !reviews.length || reviews.some(r => !r.content)) throw new Error('Review content is missing');
fs.rmSync(output, {recursive:true, force:true});
fs.cpSync(source, output, {recursive:true});
console.log('Built Showroom Talks in build/ for /showroom-talks/.');
