'use strict';

// Accept URLs produced by the previous GitHub Pages SPA redirect.
if (location.search.startsWith('?/')) {
  const legacyPath=location.search.slice(2).split('&')[0].replace(/\/$/,'');
  const destination={'post/1':'drive/tesla-model-3','post/2':'drive/bmw-550i-f10',about:'about'}[legacyPath]||'garage';
  history.replaceState(null,'',location.pathname+'#'+destination);
}

const {t}=window.ShowroomI18n;
const metadata={
  1:{slug:'tesla-model-3',name:'Tesla Model 3',brand:'Tesla 特斯拉',powertrain:'electric',date:'JAN 02, 2024',isoDate:'2024-01-02',image:'tesla-model3.jpg',category:'ELECTRIC',context:'ONE WEEK IN MIAMI',deck:'Instant response. A different rhythm.',summary:'A week with the Model 3 in Miami: effortless acceleration, weighty steering, and a few things that take getting used to.',tags:['Electric','Week-long rental','Miami'],headings:['First impressions','The accelerator','Steering & ride','Living with the noise','Charging in Miami','The verdict','One-pedal driving'],zh:{date:'2024年1月2日',category:'纯电',context:'迈阿密一周体验',deck:'即时响应，另一种驾驶节奏。',summary:'在迈阿密和 Model 3 相处一周：轻快的加速、偏重的转向，以及一些需要重新适应的驾驶习惯。',tags:['纯电','一周租车体验','迈阿密'],headings:['初次印象','加速踏板的响应','转向与底盘','车厢里的噪声','在迈阿密充电','总体感受','关于单踏板驾驶']}},
  2:{slug:'bmw-550i-f10',name:'BMW 550i (F10)',brand:'BMW 宝马',powertrain:'gasoline',date:'JAN 03, 2024',isoDate:'2024-01-03',image:'bmw-550i.jpg',category:'GASOLINE',context:'MY FIRST CAR',deck:'A daily driver with another side.',summary:'My first car, and a lasting impression. A twin-turbo V8, a composed chassis, and the quiet confidence of a German sedan.',tags:['Gasoline','Ownership experience','V8'],headings:['My first car','The F10 character','Engine & transmission','Stability & traction','Behind the wheel','The verdict'],zh:{date:'2024年1月3日',category:'燃油',context:'我的第一台车',deck:'日常座驾，也有另一副面孔。',summary:'我的第一台车，也是一份长久的记忆。双涡轮 V8、沉稳的底盘，以及德系轿车独有的从容。',tags:['燃油','车主体验','V8'],headings:['我的第一台车','F10 的性格','发动机与变速箱','稳定与牵引力控制','握住方向盘之后','总体感受']}}
};
const archive=[{name:'BMW 550i (F10)',id:2},{name:'Tesla Model 3',id:1},{name:'Jeep Wrangler'},{name:'KIA Soul'},{name:'Toyota Camry'},{name:'Toyota Corolla'},{name:'Toyota Highlander'},{name:'Audi A6'},{name:'Mercedes-Benz E-Class'},{name:'Volkswagen Jetta'}];
const state={filter:'all',query:'',view:'grid',reviews:[],translations:[],saved:[],loaded:false};
try{const saved=JSON.parse(localStorage.getItem('showroom-saved')||'[]');if(Array.isArray(saved))state.saved=saved.filter(id=>id===1||id===2);}catch{}
const $=selector=>document.querySelector(selector);
const isChinese=()=>window.ShowroomI18n.language==='zh';
const escapeHtml=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const motion=()=>matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth';
const bookmarkIcon='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h12v18l-6-4-6 4z"/></svg>';
const engineIcon='<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 7h11v9H4zM7 4h5M9.5 4v3M1 9v5m0-2h3m11-2h3v4h-3"/></svg>';
const electricIcon='<svg viewBox="0 0 20 20" aria-hidden="true"><path d="m11 1-7 10h5l-1 8 8-11h-5z"/></svg>';

function localizeReview(review){
  const translated=state.translations.find(item=>item.id===review.id);
  return {...review,...(isChinese()?review.zh:{}),content:isChinese()&&translated?translated.content:review.content,translationMissing:isChinese()&&!translated};
}
function toast(message){
  $('#toast').textContent=message;$('#toast').classList.add('visible');
  clearTimeout(toast.timer);toast.timer=setTimeout(()=>$('#toast').classList.remove('visible'),2400);
}
function savedButton(id,article=false){
  const saved=state.saved.includes(id);
  return `<button class="${article?'article-save':'bookmark'}" data-save="${id}" aria-label="${escapeHtml(t(saved?'removeDrive':'saveDrive',{name:metadata[id].name}))}" aria-pressed="${saved}">${bookmarkIcon}${article?`<span>${t(saved?'saved':'saveThis')}</span>`:''}</button>`;
}
function renderJournal(){
  const drives=state.reviews.filter(review=>{
    const searchable=[review.name,review.brand,review.summary,...review.tags,review.zh.summary,...review.zh.tags].join(' ').toLowerCase();
    return (state.filter==='all'||(state.filter==='saved'?state.saved.includes(review.id):review.powertrain===state.filter))&&searchable.includes(state.query.toLowerCase().trim());
  }).map(localizeReview);
  $('#drive-grid').className=`drive-grid${state.view==='list'?' list-view':''}`;
  $('#drive-grid').innerHTML=drives.map(review=>`<article class="drive-card"><a href="#drive/${review.slug}" class="card-image ${review.id===2?'bmw':'tesla'}" aria-label="${escapeHtml(t('readDrive',{name:review.name}))}"><img src="assets/${review.image}" alt="${t(review.id===2?'bmwAlt':'teslaAlt')}" width="${review.id===2?1284:1920}" height="${review.id===2?671:1280}" loading="lazy"><span class="card-image-label">${review.id===2?engineIcon:electricIcon}${review.category}</span></a>${savedButton(review.id)}<div class="card-copy"><div class="card-meta"><span class="${review.id===2?'ownership':''}">${review.context}</span><time datetime="${review.isoDate}">${review.date}</time></div><h3 class="card-title"><a href="#drive/${review.slug}">${review.name}<span aria-hidden="true">↗</span></a></h3><p class="card-description">${review.summary}</p><div class="card-tags">${review.tags.map(tag=>`<span>${tag}</span>`).join('')}</div></div></article>`).join('');
  const emptySaved=state.filter==='saved'&&!state.query;
  $('#empty-state').hidden=drives.length>0;
  $('#empty-title').textContent=t(emptySaved?'emptySavedTitle':'emptyTitle');
  $('#empty-message').textContent=t(emptySaved?'emptySavedMessage':'emptyMessage');
  $('#results-status').textContent=t(drives.length===1?'resultsOne':'resultsMany',{count:drives.length});
  $('#saved-count').textContent=String(state.saved.length).padStart(2,'0');
}
function renderGarage(){
  $('#garage-list').innerHTML=archive.map((car,index)=>{
    const row=`<span class="index">${String(index+1).padStart(2,'0')}</span><span class="row-name">${car.name}</span><span class="row-state">${t(car.id?'readStory':'pending')}</span>${car.id?'<span class="row-arrow" aria-hidden="true">↗</span>':''}`;
    return car.id?`<a class="garage-row published" href="#drive/${metadata[car.id].slug}">${row}</a>`:`<div class="garage-row">${row}</div>`;
  }).join('');
}
function toggleSave(id){
  if(!metadata[id])return;
  const wasSaved=state.saved.includes(id);state.saved=wasSaved?state.saved.filter(item=>item!==id):[...state.saved,id];
  let persisted=true;try{localStorage.setItem('showroom-saved',JSON.stringify(state.saved));}catch{persisted=false;}
  renderJournal();
  const articleButton=$('.article-save');if(articleButton)articleButton.outerHTML=savedButton(id,true);
  toast(t(persisted?(wasSaved?'removedToast':'savedToast'):'storageUnavailable'));
}
function setFilter(filter){
  state.filter=filter;
  document.querySelectorAll('[data-filter]').forEach(button=>{
    const selected=button.dataset.filter===filter;button.classList.toggle('active',selected);button.setAttribute('aria-pressed',String(selected));
  });renderJournal();
}
function showArticle(slug){
  const original=state.reviews.find(review=>review.slug===slug);
  $('#home-view').hidden=true;$('#article-view').hidden=false;$('#load-error').hidden=true;
  if(!original){
    $('#article-view').innerHTML=`<div class="shell not-found"><div class="eyebrow">${t('notFoundEyebrow')}</div><h1>${t('notFoundHeading')}</h1><a class="text-link" href="#journal"><span>${t('backJournal')}</span><span aria-hidden="true">↗</span></a></div>`;
    document.title=t('notFoundTitle');return;
  }
  const review=localizeReview(original),paragraphs=review.content.trim().split('\n').filter(Boolean);
  const next=state.reviews.find(item=>item.id!==review.id);
  const minutes=Math.max(1,Math.ceil(isChinese()&&!review.translationMissing?review.content.length/350:review.content.split(/\s+/).length/220));
  const note=isChinese()&&!review.translationMissing?t('translatedNote'):t('originalNote');
  $('#article-view').innerHTML=`<div class="shell"><a class="article-back" href="#journal"><span aria-hidden="true">←</span>${t('backJournal')}</a><header class="article-header"><div class="eyebrow">${review.category}<span>·</span>${review.context}</div><h1 id="article-title" tabindex="-1">${review.name}</h1><p class="article-deck">${review.deck}</p><div class="article-byline"><span>${t('author')}</span><span>·</span><time datetime="${review.isoDate}">${review.date}</time><span>·</span><span>${t('readTime',{count:minutes})}</span></div><div class="article-actions">${savedButton(review.id,true)}<button id="copy-link"><span aria-hidden="true">↗</span>${t('copyLink')}</button></div></header><img class="article-cover ${review.id===2?'bmw':''}" src="assets/${review.image}" alt="${escapeHtml(t('articleAlt',{name:review.name}))}" width="${review.id===2?1284:1920}" height="${review.id===2?671:1280}"><p class="article-photo-caption">${t('photoCaption',{name:review.name})}</p><div class="article-layout"><aside class="article-sidebar"><div class="eyebrow muted">${t('articleContents')}</div><nav aria-label="${t('contentsLabel')}">${review.headings.map((heading,index)=>`<a href="#drive/${review.slug}/section-${index}">${heading}</a>`).join('')}</nav><p class="article-original">${escapeHtml(note).replace(/\n/g,'<br>')}</p></aside><div class="article-body">${review.translationMissing?`<p class="translation-notice" role="status">${t('translationUnavailable')}</p>`:''}${paragraphs.map((paragraph,index)=>`<section id="section-${index}"><h2>${review.headings[index]||t('onTheRoad')}</h2><p lang="${isChinese()&&!review.translationMissing?'zh-CN':'en'}">${escapeHtml(paragraph)}</p></section>`).join('')}${next?`<a class="next-drive" href="#drive/${next.slug}"><div><div class="eyebrow">${t('anotherPerspective')}</div><h2>${next.name}</h2></div><span class="round-arrow" aria-hidden="true">↗</span></a>`:''}</div></div></div>`;
  document.title=`${review.name} — ${isChinese()?'驾驶手记 · ':''}Showroom Talks`;
}
function closeMenu(){
  $('.menu-button').setAttribute('aria-expanded','false');$('.menu-button').setAttribute('aria-label',t('openMenu'));$('#main-nav').classList.remove('open');
}
let currentSlug=null;
function route(){
  if(!state.loaded)return;
  const hash=location.hash.slice(1),parts=hash.split('/');closeMenu();
  if(parts[0]==='drive'){
    const slug=parts[1]||'',changed=currentSlug!==slug||$('#article-view').hidden;
    if(changed)showArticle(slug);currentSlug=slug;
    if(parts[2]&&/^section-\d+$/.test(parts[2]))requestAnimationFrame(()=>document.getElementById(parts[2])?.scrollIntoView({behavior:motion()}));
    else if(changed){window.scrollTo({top:0,behavior:'instant'});requestAnimationFrame(()=>$('#article-title')?.focus({preventScroll:true}));}
  }else{
    const wasArticle=!$('#article-view').hidden;
    $('#home-view').hidden=false;$('#article-view').hidden=true;currentSlug=null;document.title=t('pageTitle');
    if(['journal','garage','about'].includes(hash))requestAnimationFrame(()=>document.getElementById(hash).scrollIntoView({behavior:wasArticle?'instant':motion()}));
    else if(!hash)window.scrollTo({top:0,behavior:wasArticle?'instant':motion()});
  }
}
let readingPosition=null;
document.addEventListener('showroom:beforelanguagechange',()=>{
  const article=!$('#article-view').hidden;
  const elements=article?document.querySelectorAll('#article-title,.article-body section'):document.querySelectorAll('#intro-heading,.feature,#journal,#garage,#about,.site-footer');
  const readingLine=$('.site-header').getBoundingClientRect().bottom+20;
  const anchor=[...elements].find(element=>element.getBoundingClientRect().bottom>readingLine+40);
  if(anchor){
    const box=anchor.getBoundingClientRect();
    const fraction=article&&box.top<readingLine?Math.min(1,(readingLine-box.top)/box.height):0;
    readingPosition={article,id:anchor.id,element:article?null:anchor,fraction,top:fraction?readingLine:box.top};
  }else readingPosition=null;
});
document.addEventListener('showroom:languagechange',()=>{
  renderGarage();
  if(state.loaded){renderJournal();if(currentSlug!==null)showArticle(currentSlug);else document.title=t('pageTitle');}
  else document.title=t('pageTitle');
  $('#toast').classList.remove('visible');
  if(readingPosition){
    const anchor=readingPosition.article?document.getElementById(readingPosition.id):readingPosition.element;
    if(anchor){const box=anchor.getBoundingClientRect();window.scrollBy({top:box.top+readingPosition.fraction*box.height-readingPosition.top,behavior:'instant'});}
  }
});
document.addEventListener('click',async event=>{
  const contentsLink=event.target.closest('.article-sidebar nav a');
  if(contentsLink&&contentsLink.hash===location.hash){event.preventDefault();route();}
  if(event.target.closest('#main-nav a'))closeMenu();
  if(event.target.closest('.skip-link')){
    event.preventDefault();const target=$('#article-view').hidden?$('#main'):($('#article-title')||$('#article-view'));
    target.setAttribute('tabindex','-1');target.focus();target.scrollIntoView({behavior:'instant'});return;
  }
  if(event.target.closest('.back-top')){window.scrollTo({top:0,behavior:motion()});return;}
  const save=event.target.closest('[data-save]');if(save){toggleSave(Number(save.dataset.save));return;}
  if(event.target.closest('#copy-link')){try{await navigator.clipboard.writeText(location.href);toast(t('copied'));}catch{toast(t('copyFallback'));}}
});
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>setFilter(button.dataset.filter)));
document.querySelectorAll('[data-view]').forEach(button=>button.addEventListener('click',()=>{
  state.view=button.dataset.view;
  document.querySelectorAll('[data-view]').forEach(item=>{item.classList.toggle('active',item===button);item.setAttribute('aria-pressed',String(item===button));});renderJournal();
}));
$('#drive-search').addEventListener('input',event=>{state.query=event.target.value;renderJournal();});
$('#reset-filters').addEventListener('click',()=>{state.query='';$('#drive-search').value='';setFilter('all');});
$('.menu-button').addEventListener('click',()=>{
  const open=$('.menu-button').getAttribute('aria-expanded')!=='true';
  $('.menu-button').setAttribute('aria-expanded',String(open));$('.menu-button').setAttribute('aria-label',t(open?'closeMenu':'openMenu'));$('#main-nav').classList.toggle('open',open);
});
document.addEventListener('keydown',event=>{
  if(event.key==='/'&&!['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)&&!event.ctrlKey&&!event.metaKey&&!event.altKey&&$('#article-view').hidden){event.preventDefault();$('#drive-search').focus();$('#journal').scrollIntoView({behavior:motion()});}
  if(event.key==='Escape'){document.activeElement.blur();closeMenu();}
});
window.addEventListener('hashchange',route);$('#copyright-year').textContent=new Date().getFullYear();document.title=t('pageTitle');renderGarage();
async function loadJson(url){const response=await fetch(url);if(!response.ok)throw new Error('Unable to load journal');return response.json();}
Promise.all([loadJson('reviews.json'),loadJson('reviews.zh.json').catch(()=>[])]).then(([reviews,translations])=>{
  state.reviews=reviews.map(review=>({...review,...metadata[review.id]})).sort((a,b)=>b.id-a.id);
  state.translations=translations;state.loaded=true;renderJournal();route();
}).catch(()=>{$('#home-view').hidden=true;$('#article-view').hidden=true;$('#load-error').hidden=false;});
