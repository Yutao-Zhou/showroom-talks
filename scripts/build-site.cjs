'use strict';
const fs = require('node:fs');
const path = require('node:path');
const {createHash} = require('node:crypto');
const root = path.resolve(__dirname, '..');
const source = path.join(root, 'site');
const output = path.resolve(root, 'build');
if (path.dirname(output) !== root || path.basename(output) !== 'build') throw new Error('Unexpected build destination');
for (const file of ['index.html', 'app.js', 'i18n.js', 'styles.css', 'reviews.json', 'reviews.zh.json', '404.html']) {
  if (!fs.existsSync(path.join(source, file))) throw new Error(`Missing site file: ${file}`);
}
const reviews = JSON.parse(fs.readFileSync(path.join(source, 'reviews.json'), 'utf8'));
if (!Array.isArray(reviews) || !reviews.length || reviews.some(r => !r.content)) throw new Error('Review content is missing');
const translations = JSON.parse(fs.readFileSync(path.join(source, 'reviews.zh.json'), 'utf8'));
for (const review of reviews) {
  const translated = translations.find(item => item.id === review.id);
  if (!translated || translated.content.trim().split('\n').length !== review.content.trim().split('\n').length) throw new Error(`Incomplete Chinese translation: ${review.id}`);
}
fs.rmSync(output, {recursive:true, force:true});
fs.cpSync(source, output, {recursive:true});
let html = fs.readFileSync(path.join(output, 'index.html'), 'utf8');
for (const asset of ['styles.css', 'i18n.js', 'app.js']) {
  const hash = createHash('sha256').update(fs.readFileSync(path.join(output, asset))).digest('hex').slice(0, 12);
  html = html.replace(`"${asset}"`, `"${asset}?v=${hash}"`);
}
fs.writeFileSync(path.join(output, 'index.html'), html);
console.log('Built Showroom Talks in build/ for /showroom-talks/.');
