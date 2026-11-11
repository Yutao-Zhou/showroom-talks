'use strict';

// Accept URLs produced by the previous GitHub Pages SPA redirect.
if (location.search.startsWith('?/')) {
  const legacyPath=location.search.slice(2).split('&')[0].replace(/\/$/,'');
  const destination={'post/1':'drive/tesla-model-3','post/2':'drive/bmw-550i-f10',about:'about'}[legacyPath]||'garage';
  history.replaceState(null,'',location.pathname+'#'+destination);
}

const metadata = {
  1: {slug:'tesla-model-3',name:'Tesla Model 3',brand:'Tesla',powertrain:'electric',date:'JAN 02, 2024',isoDate:'2024-01-02',image:'tesla-model3.jpg',category:'ELECTRIC',context:'ONE WEEK IN MIAMI',deck:'Instant response. A different rhythm.',summary:'A week with the Model 3 in Miami: effortless acceleration, weighty steering, and a few things that take getting used to.',tags:['Electric','Week-long rental','Miami'],headings:['First impressions','The accelerator','Steering & ride','Living with the noise','Charging in Miami','The verdict','One-pedal driving']},
  2: {slug:'bmw-550i-f10',name:'BMW 550i (F10)',brand:'BMW',powertrain:'gasoline',date:'JAN 03, 2024',isoDate:'2024-01-03',image:'bmw-550i.jpg',category:'GASOLINE',context:'MY FIRST CAR',deck:'A daily driver with another side.',summary:'My first car, and a lasting impression. A twin-turbo V8, a composed chassis, and the quiet confidence of a German sedan.',tags:['Gasoline','Ownership experience','V8'],headings:['My first car','The F10 character','Engine & transmission','Stability & traction','Behind the wheel','The verdict']}
};
const archive = [{name:'BMW 550i (F10)',id:2},{name:'Tesla Model 3',id:1},{name:'Jeep Wrangler'},{name:'KIA Soul'},{name:'Toyota Camry'},{name:'Toyota Corolla'},{name:'Toyota Highlander'},{name:'Audi A6'},{name:'Mercedes-Benz E-Class'},{name:'Volkswagen Jetta'}];
const state={filter:'all',query:'',view:'grid',reviews:[],saved:[]};
try{const saved=JSON.parse(localStorage.getItem('showroom-saved')||'[]');if(Array.isArray(saved))state.saved=saved.filter(id=>id===1||id===2);}catch{}
const $=s=>document.querySelector(s);
const escapeHtml=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const bookmarkIcon='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h12v18l-6-4-6 4z"/></svg>';
const engineIcon='<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 7h11v9H4zM7 4h5M9.5 4v3M1 9v5m0-2h3m11-2h3v4h-3"/></svg>';
const electricIcon='<svg viewBox="0 0 20 20" aria-hidden="true"><path d="m11 1-7 10h5l-1 8 8-11h-5z"/></svg>';

function toast(message){$('#toast').textContent=message;$('#toast').classList.add('visible');clearTimeout(toast.timer);toast.timer=setTimeout(()=>$('#toast').classList.remove('visible'),2400);}
function savedButton(id,article=false){const saved=state.saved.includes(id);return `<button class="${article?'article-save':'bookmark'}" data-save="${id}" aria-label="${saved?'Remove':'Save'} ${metadata[id].name}${saved?' from saved drives':''}" aria-pressed="${saved}">${bookmarkIcon}${article?`<span>${saved?'Saved':'Save this drive'}</span>`:''}</button>`;}
function updateSavedCount(){$('#saved-count').textContent=String(state.saved.length).padStart(2,'0');}
function renderJournal(){
  const drives=state.reviews.filter(r=>(state.filter==='all'||(state.filter==='saved'?state.saved.includes(r.id):r.powertrain===state.filter))&&`${r.name} ${r.brand} ${r.summary} ${r.tags.join(' ')}`.toLowerCase().includes(state.query.toLowerCase()));
  $('#drive-grid').className=`drive-grid${state.view==='list'?' list-view':''}`;
  $('#drive-grid').innerHTML=drives.map(r=>`<article class="drive-card"><a href="#drive/${r.slug}" class="card-image ${r.id===2?'bmw':'tesla'}" aria-label="Read ${r.name}"><img src="assets/${r.image}" alt="${r.id===2?'White BMW 550i F10 photographed at a gas station at night':'White Tesla Model 3 in a parking garage'}" width="${r.id===2?1284:1920}" height="${r.id===2?671:1280}" loading="lazy"><span class="card-image-label">${r.id===2?engineIcon:electricIcon}${r.category}</span></a>${savedButton(r.id)}<div class="card-copy"><div class="card-meta"><span class="${r.id===2?'ownership':''}">${r.context}</span><time datetime="${r.isoDate}">${r.date}</time></div><h3 class="card-title"><a href="#drive/${r.slug}">${r.name}<span aria-hidden="true">↗</span></a></h3><p class="card-description">${r.summary}</p><div class="card-tags">${r.tags.map(t=>`<span>${t}</span>`).join('')}</div></div></article>`).join('');
  $('#empty-state').hidden=drives.length>0;
  $('#empty-title').textContent=state.filter==='saved'&&!state.query?'No saved drives yet.':'No drives found.';
  $('#empty-message').textContent=state.filter==='saved'&&!state.query?'Use the bookmark on a drive to keep it here in this browser.':'Try another model, brand, or powertrain.';
  $('#results-status').textContent=`${drives.length} ${drives.length===1?'drive':'drives'} shown.`;
  updateSavedCount();
}
function renderGarage(){$('#garage-list').innerHTML=archive.map((car,i)=>{const row=`<span class="index">${String(i+1).padStart(2,'0')}</span><span class="row-name">${car.name}</span><span class="row-state">${car.id?'Read story':'Awaiting notes'}</span>${car.id?'<span class="row-arrow" aria-hidden="true">↗</span>':''}`;return car.id?`<a class="garage-row published" href="#drive/${metadata[car.id].slug}">${row}</a>`:`<div class="garage-row">${row}</div>`;}).join('');}
function toggleSave(id){
  if(!metadata[id])return;
  const wasSaved=state.saved.includes(id);state.saved=wasSaved?state.saved.filter(x=>x!==id):[...state.saved,id];
  let persisted=true;try{localStorage.setItem('showroom-saved',JSON.stringify(state.saved));}catch{persisted=false;}
  renderJournal();
  const articleButton=$('.article-save');if(articleButton){articleButton.outerHTML=savedButton(id,true);}
  toast(persisted?(wasSaved?'Removed from saved drives':'Drive saved in this browser'):'Saved for this visit. Browser storage is unavailable.');
}
function setFilter(filter){state.filter=filter;document.querySelectorAll('[data-filter]').forEach(b=>{const selected=b.dataset.filter===filter;b.classList.toggle('active',selected);b.setAttribute('aria-pressed',String(selected));});renderJournal();}
function showArticle(slug){
  const r=state.reviews.find(x=>x.slug===slug);
  $('#home-view').hidden=true;$('#article-view').hidden=false;$('#load-error').hidden=true;
  if(!r){$('#article-view').innerHTML='<div class="shell not-found"><div class="eyebrow">NOT IN THIS GARAGE</div><h1>This drive isn’t here.</h1><a class="text-link" href="#journal">Back to the journal <span>↗</span></a></div>';document.title='Drive not found — Showroom Talks';return;}
  const paragraphs=r.content.trim().split('\n').filter(Boolean);
  const next=state.reviews.find(x=>x.id!==r.id);
  $('#article-view').innerHTML=`<div class="shell"><a class="article-back" href="#journal"><span>←</span> Back to the journal</a><header class="article-header"><div class="eyebrow">${r.category} <span>·</span> ${r.context}</div><h1 id="article-title" tabindex="-1">${r.name}</h1><p class="article-deck">${r.deck}</p><div class="article-byline"><span>By Yutao Zhou</span><span>·</span><time datetime="${r.isoDate}">${r.date}</time><span>·</span><span>${Math.max(1,Math.ceil(r.content.split(/\s+/).length/220))} min read</span></div><div class="article-actions">${savedButton(r.id,true)}<button id="copy-link"><span aria-hidden="true">↗</span> Copy link</button></div></header><img class="article-cover ${r.id===2?'bmw':''}" src="assets/${r.image}" alt="${r.name}, from the original Showroom Talks journal" width="${r.id===2?1284:1920}" height="${r.id===2?671:1280}"><p class="article-photo-caption">${r.name} / Photo from the original Showroom Talks archive.</p><div class="article-layout"><aside class="article-sidebar"><div class="eyebrow muted">IN THIS DRIVE</div><nav aria-label="Article contents">${r.headings.map((h,i)=>`<a href="#drive/${r.slug}/section-${i}">${h}</a>`).join('')}</nav><p class="article-original">Originally published in January 2024.<br>Original review text preserved.</p></aside><div class="article-body">${paragraphs.map((p,i)=>`<section id="section-${i}"><h2>${r.headings[i]||'On the road'}</h2><p>${escapeHtml(p)}</p></section>`).join('')}<a class="next-drive" href="#drive/${next.slug}"><div><div class="eyebrow">ANOTHER PERSPECTIVE</div><h2>${next.name}</h2></div><span class="round-arrow" aria-hidden="true">↗</span></a></div></div></div>`;
  document.title=`${r.name} — Showroom Talks`;
}
let currentSlug=null;
function route(){
  const hash=location.hash.slice(1),parts=hash.split('/');
  $('.menu-button').setAttribute('aria-expanded','false');$('.menu-button').setAttribute('aria-label','Open menu');$('#main-nav').classList.remove('open');
  if(parts[0]==='drive'){
    const slug=parts[1]||'';
    const changed=currentSlug!==slug||$('#article-view').hidden;
    if(changed)showArticle(slug);
    currentSlug=slug;
    if(parts[2]&&/^section-\d+$/.test(parts[2])){requestAnimationFrame(()=>document.getElementById(parts[2])?.scrollIntoView({behavior:'smooth'}));}
    else if(changed){window.scrollTo({top:0,behavior:'instant'});requestAnimationFrame(()=>$('#article-title')?.focus({preventScroll:true}));}
  }else{
    const wasArticle=!$('#article-view').hidden;
    $('#home-view').hidden=false;$('#article-view').hidden=true;currentSlug=null;document.title="Showroom Talks — Notes from the driver's seat";
    if(['journal','garage','about'].includes(hash)){requestAnimationFrame(()=>document.getElementById(hash).scrollIntoView({behavior:wasArticle?'instant':'smooth'}));}else if(!hash){window.scrollTo({top:0,behavior:wasArticle?'instant':'smooth'});}
  }
}
document.addEventListener('click',async e=>{
  if(e.target.closest('#main-nav a')){$('#main-nav').classList.remove('open');$('.menu-button').setAttribute('aria-expanded','false');$('.menu-button').setAttribute('aria-label','Open menu');}
  if(e.target.closest('.skip-link')){e.preventDefault();const target=$('#article-view').hidden?$('#main'):$('#article-title');target.setAttribute('tabindex','-1');target.focus();target.scrollIntoView({behavior:'instant'});return;}
  if(e.target.closest('.back-top')){window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});return;}
  const save=e.target.closest('[data-save]');if(save){toggleSave(Number(save.dataset.save));return;}
  if(e.target.closest('#copy-link')){try{await navigator.clipboard.writeText(location.href);toast('Link copied to clipboard');}catch{toast('Copy the current address to share this drive.');}}
});
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>setFilter(b.dataset.filter)));
document.querySelectorAll('[data-view]').forEach(b=>b.addEventListener('click',()=>{state.view=b.dataset.view;document.querySelectorAll('[data-view]').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',String(x===b));});renderJournal();}));
$('#drive-search').addEventListener('input',e=>{state.query=e.target.value;renderJournal();});
$('#reset-filters').addEventListener('click',()=>{state.query='';$('#drive-search').value='';setFilter('all');});
$('.menu-button').addEventListener('click',()=>{const open=$('.menu-button').getAttribute('aria-expanded')!=='true';$('.menu-button').setAttribute('aria-expanded',String(open));$('.menu-button').setAttribute('aria-label',open?'Close menu':'Open menu');$('#main-nav').classList.toggle('open',open);});
document.addEventListener('keydown',e=>{if(e.key==='/'&&!['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)&&!e.ctrlKey&&!e.metaKey&&!e.altKey&&$('#article-view').hidden){e.preventDefault();$('#drive-search').focus();$('#journal').scrollIntoView({behavior:'smooth'});}if(e.key==='Escape'){document.activeElement.blur();$('#main-nav').classList.remove('open');$('.menu-button').setAttribute('aria-expanded','false');$('.menu-button').setAttribute('aria-label','Open menu');}});
window.addEventListener('hashchange',route);
$('#copyright-year').textContent=new Date().getFullYear();
renderGarage();
fetch('reviews.json').then(r=>{if(!r.ok)throw new Error('Unable to load journal');return r.json();}).then(reviews=>{state.reviews=reviews.map(r=>({...r,...metadata[r.id]})).sort((a,b)=>b.id-a.id);renderJournal();route();}).catch(()=>{$('#home-view').hidden=true;$('#article-view').hidden=true;$('#load-error').hidden=false;});
