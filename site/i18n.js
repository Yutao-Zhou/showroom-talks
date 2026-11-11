'use strict';

// Only these authored translation strings may use data-i18n-html.
(() => {
  const messages = {
    en: {
      skip:'Skip to content',home:'Showroom Talks home',navigation:'Main navigation',journalNav:'The journal',garageNav:'The garage',aboutNav:'About me',personalJournal:'A personal driving journal',personalJournalCaps:'A PERSONAL DRIVING JOURNAL',languageChoice:'Language',darkMode:'Switch to dark mode',lightMode:'Switch to light mode',openMenu:'Open menu',closeMenu:'Close menu',
      introEyebrow:'LESS SPEC SHEET. MORE SEAT TIME.',introHeading:'Life, from the<br><em>driver’s seat.</em>',byline:'A JOURNAL BY YUTAO ZHOU',introDescription:'Different cars. Different characters.<br>My experiences behind the wheel,<br>one drive at a time.',explore:'Explore the journal',featuredDrive:'Featured drive',featureLink:'Read Tesla Model 3: A different kind of connection',teslaAlt:'White Tesla Model 3 photographed from the front in a parking garage',bmwAlt:'White BMW 550i F10 photographed at a gas station at night',spotlight:'IN THE SPOTLIGHT',fieldNotes:'FIELD NOTES / 001',featureHeading:'A different kind<br>of connection.',featureDescription:'A week in Miami. An electric new perspective.',electric:'ELECTRIC',miami:'MIAMI',oneWeek:'ONE WEEK',firsthand:'FIRSTHAND IMPRESSIONS, ALWAYS.',
      experiences:'THE EXPERIENCES',journalHeading:'The driving journal',journalDescription:'What stays with you after the engine stops.',filterLabel:'Filter drives by powertrain',allDrives:'All drives',gasolineFilter:'Gasoline',electricFilter:'Electric',savedFilter:'Saved',savedTitle:'Show drives saved in this browser',searchPlaceholder:'Find a drive…',searchLabel:'Search driving journal',layoutLabel:'Journal layout',gridView:'Grid view',listView:'List view',showAll:'Show all drives',journalFootnote:'A growing collection of real experiences. More miles, more stories.',
      collection:'THE COLLECTION',garageHeading:'Every car has a character.',vehicleIndex:'VEHICLE INDEX',carsInIndex:' / cars in the index',garageDescription:'From a familiar daily driver to<br>something entirely different.<br>There’s always another story.',publishedCount:'2 stories published',pendingCount:'8 awaiting notes',garageNote:'Awaiting notes = listed in the original archive, with no written experience published yet.',readStory:'Read story',pending:'Awaiting notes',
      aboutEyebrow:'THE PERSON BEHIND THE WHEEL',aboutHeading:'Hi, I’m Yutao.<br><em>I just like to drive.</em>',aboutDescription:'Showroom Talks is my personal notebook for the cars I get to experience. The steering, the ride, the little things you only notice after spending time behind the wheel.',aboutDescriptionTwo:'A place to remember how a car feels, long after handing back the keys.',githubLink:'Find me on GitHub',signature:'See you on the road.',footerDescription:'Good cars. Honest impressions.<br>Always a reason to take the long way home.',backTop:'Back to top',loadError:'The journal couldn’t load.',loadRetry:'Please refresh the page to try again.',refresh:'Refresh',
      emptyTitle:'No drives found.',emptyMessage:'Try another model, brand, or powertrain.',emptySavedTitle:'No saved drives yet.',emptySavedMessage:'Use the bookmark on a drive to keep it here in this browser.',resultsOne:'1 drive shown.',resultsMany:'{count} drives shown.',readDrive:'Read {name}',saveDrive:'Save {name}',removeDrive:'Remove {name} from saved drives',saved:'Saved',saveThis:'Save this drive',savedToast:'Drive saved in this browser',removedToast:'Removed from saved drives',storageUnavailable:'Your changes apply for this visit. Browser storage is unavailable.',backJournal:'Back to the journal',author:'By Yutao Zhou',readTime:'{count} min read',copyLink:'Copy link',copied:'Link copied to clipboard',copyFallback:'Copy the current address to share this drive.',articleAlt:'{name}, from the original Showroom Talks journal',photoCaption:'{name} / Photo from the original Showroom Talks archive.',articleContents:'IN THIS DRIVE',contentsLabel:'Article contents',originalNote:'Originally published in January 2024.\nOriginal review text preserved.',translatedNote:'Translated from the original January 2024 review.',translationUnavailable:'The translation couldn’t load. Showing the original English review.',anotherPerspective:'ANOTHER PERSPECTIVE',onTheRoad:'On the road',notFoundEyebrow:'NOT IN THIS GARAGE',notFoundHeading:'This drive isn’t here.',notFoundTitle:'Drive not found — Showroom Talks',pageTitle:'Showroom Talks — Notes from the driver’s seat',pageDescription:'Showroom Talks is Yutao Zhou’s personal driving journal. Firsthand experiences, honest impressions, and the small details that give every car its character.'
    },
    zh: {
      skip:'跳到正文',home:'Showroom Talks 首页',navigation:'主导航',journalNav:'驾驶手记',garageNav:'车型档案',aboutNav:'关于我',personalJournal:'一本个人驾驶手记',personalJournalCaps:'个人驾驶手记',languageChoice:'选择语言',darkMode:'切换到深色模式',lightMode:'切换到浅色模式',openMenu:'打开菜单',closeMenu:'关闭菜单',
      introEyebrow:'少看参数，多去开一程。',introHeading:'每一程，<br><em>都有新感受。</em>',byline:'YUTAO ZHOU 的驾驶手记',introDescription:'不同的车，有不同的性格。<br>记录握住方向盘时的真实感受，<br>一程一篇。',explore:'翻开驾驶手记',featuredDrive:'精选驾驶体验',featureLink:'阅读 Tesla Model 3：另一种驾驶的默契',teslaAlt:'停车场内，从正面拍摄的白色 Tesla Model 3',bmwAlt:'夜间加油站内的白色 BMW 550i F10',spotlight:'本期精选',fieldNotes:'驾驶笔记 / 001',featureHeading:'另一种<br>驾驶的默契。',featureDescription:'在迈阿密的一周，体验电动驾驶的另一面。',electric:'纯电',miami:'迈阿密',oneWeek:'一周体验',firsthand:'每一份感受，都来自亲自驾驶。',
      experiences:'亲身体验',journalHeading:'驾驶手记',journalDescription:'熄火之后，依然留在心里的感受。',filterLabel:'按动力类型筛选体验',allDrives:'全部体验',gasolineFilter:'燃油',electricFilter:'纯电',savedFilter:'已收藏',savedTitle:'查看保存在本机浏览器的体验',searchPlaceholder:'寻找一台车……',searchLabel:'搜索驾驶手记',layoutLabel:'手记显示方式',gridView:'卡片视图',listView:'列表视图',showAll:'查看全部体验',journalFootnote:'真实体验，持续记录。多开一程，多一个故事。',
      collection:'车型档案',garageHeading:'每台车，都有自己的性格。',vehicleIndex:'车型索引',carsInIndex:' / 款车型已归档',garageDescription:'从熟悉的日常座驾，<br>到截然不同的驾驶体验。<br>总有下一个故事。',publishedCount:'2 篇手记已发布',pendingCount:'8 款车型待记录',garageNote:'「待记录」表示原站已收录该车型，暂未发布驾驶体验正文。',readStory:'阅读手记',pending:'待记录',
      aboutEyebrow:'方向盘后的那个人',aboutHeading:'你好，我是玉涛。<br><em>单纯喜欢开车。</em>',aboutDescription:'Showroom Talks 是我的个人驾驶笔记。转向的手感、底盘的反馈，还有那些坐进驾驶席、相处一段时间才会留意到的小细节，都值得记下来。',aboutDescriptionTwo:'即使已经交还钥匙，也想在这里留住一台车带来的感受。',githubLink:'在 GitHub 找到我',signature:'我们路上见。',footerDescription:'好车，真实的感受。<br>总有一个理由，绕点远路回家。',backTop:'回到顶部',loadError:'驾驶手记暂时无法加载。',loadRetry:'请刷新页面后重试。',refresh:'刷新页面',
      emptyTitle:'没有找到相关体验。',emptyMessage:'试试其他车型、品牌或动力类型。',emptySavedTitle:'还没有收藏的体验。',emptySavedMessage:'点击体验卡片上的书签，就能将它保存在本机浏览器。',resultsOne:'显示 1 篇驾驶体验。',resultsMany:'显示 {count} 篇驾驶体验。',readDrive:'阅读 {name} 的驾驶体验',saveDrive:'收藏 {name}',removeDrive:'取消收藏 {name}',saved:'已收藏',saveThis:'收藏这篇体验',savedToast:'已收藏到本机浏览器',removedToast:'已取消收藏',storageUnavailable:'更改仅在本次访问中生效，浏览器存储暂不可用。',backJournal:'返回驾驶手记',author:'作者：周玉涛',readTime:'约 {count} 分钟阅读',copyLink:'复制链接',copied:'链接已复制',copyFallback:'复制浏览器地址即可分享这篇体验。',articleAlt:'{name}，来自 Showroom Talks 原站的照片',photoCaption:'{name} / 照片来自 Showroom Talks 原站。',articleContents:'本篇内容',contentsLabel:'文章目录',originalNote:'最初发表于 2024 年 1 月。\n英文原文已完整保留。',translatedNote:'根据 2024 年 1 月发表的英文原文翻译。',translationUnavailable:'中文译文暂时无法加载，以下显示英文原文。',anotherPerspective:'换一种驾驶感受',onTheRoad:'驾驶感受',notFoundEyebrow:'档案中没有这台车',notFoundHeading:'这篇驾驶体验还不在这里。',notFoundTitle:'未找到驾驶体验 — Showroom Talks',pageTitle:'Showroom Talks — 玉涛的驾驶手记',pageDescription:'玉涛的个人驾驶手记。记录不同车型的亲身体验、真实感受，以及每一台车独有的性格。'
    }
  };
  let language=document.documentElement.lang==='zh-CN'?'zh':'en';
  let manualTheme=null;
  try{const stored=localStorage.getItem('showroom-theme');if(stored==='dark'||stored==='light')manualTheme=stored;}catch{}
  const systemTheme=window.matchMedia('(prefers-color-scheme: dark)');
  function t(key,parameters={}){
    const value=messages[language][key]??messages.en[key]??key;
    return value.replace(/\{(\w+)\}/g,(_,name)=>String(parameters[name]??`{${name}}`));
  }
  function updateControls(){
    document.querySelectorAll('[data-language]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.language===language)));
    const themeButton=document.getElementById('theme-toggle');
    const dark=document.documentElement.dataset.theme==='dark';
    themeButton.setAttribute('aria-pressed',String(dark));
    themeButton.setAttribute('aria-label',t(dark?'lightMode':'darkMode'));
    themeButton.title=t(dark?'lightMode':'darkMode');
    const menu=document.querySelector('.menu-button');
    menu.setAttribute('aria-label',t(menu.getAttribute('aria-expanded')==='true'?'closeMenu':'openMenu'));
  }
  function apply(){
    document.documentElement.lang=language==='zh'?'zh-CN':'en';
    document.querySelectorAll('[data-i18n]').forEach(element=>{element.textContent=t(element.dataset.i18n);});
    document.querySelectorAll('[data-i18n-html]').forEach(element=>{element.innerHTML=t(element.dataset.i18nHtml);});
    for(const [data,attribute] of [['i18nAria','aria-label'],['i18nTitle','title'],['i18nPlaceholder','placeholder'],['i18nAlt','alt']]){
      const selector='[data-'+data.replace(/[A-Z]/g,c=>'-'+c.toLowerCase())+']';
      document.querySelectorAll(selector).forEach(element=>element.setAttribute(attribute,t(element.dataset[data])));
    }
    document.querySelector('meta[name="description"]').content=t('pageDescription');
    document.querySelector('meta[property="og:title"]').content=t('pageTitle');
    document.querySelector('meta[property="og:description"]').content=t('pageDescription');
    updateControls();
  }
  function setLanguage(next){
    if(!messages[next]||next===language)return;
    language=next;
    try{localStorage.setItem('showroom-language',language);}catch{}
    // Let the app capture the current reading position before translated text reflows.
    document.dispatchEvent(new Event('showroom:beforelanguagechange'));
    apply();
    document.dispatchEvent(new Event('showroom:languagechange'));
  }
  function setTheme(next,persist=false){
    document.documentElement.dataset.theme=next;
    document.querySelector('meta[name="theme-color"]').content=next==='dark'?'#151d1a':'#f5f3ed';
    if(persist){manualTheme=next;try{localStorage.setItem('showroom-theme',next);}catch{}}
    updateControls();
  }
  document.querySelectorAll('[data-language]').forEach(button=>button.addEventListener('click',()=>setLanguage(button.dataset.language)));
  document.getElementById('theme-toggle').addEventListener('click',()=>setTheme(document.documentElement.dataset.theme==='dark'?'light':'dark',true));
  systemTheme.addEventListener('change',event=>{if(!manualTheme)setTheme(event.matches?'dark':'light');});
  window.ShowroomI18n={t,get language(){return language;},updateControls};
  apply();
})();
