'use strict';
const $=s=>document.querySelector(s);
const language=document.documentElement.lang;
const words={en:['Switch to light theme','Switch to dark theme','Open navigation','Close navigation','tools found'],fr:['Activer le thème clair','Activer le thème sombre','Ouvrir la navigation','Fermer la navigation','outils trouvés'],de:['Helles Design aktivieren','Dunkles Design aktivieren','Navigation öffnen','Navigation schließen','Werkzeuge gefunden'],es:['Activar tema claro','Activar tema oscuro','Abrir navegación','Cerrar navegación','herramientas encontradas'],it:['Attiva tema chiaro','Attiva tema scuro','Apri navigazione','Chiudi navigazione','strumenti trovati']}[language];
const theme=$('#theme-toggle'),menu=$('#menu-toggle'),nav=$('#navigation');
function setTheme(value){const dark=value==='dark';document.documentElement.dataset.theme=dark?'dark':'light';theme.setAttribute('aria-label',words[dark?0:1]);document.querySelector('meta[name="theme-color"]').content=dark?'#0D1320':'#FAFAFD';try{localStorage.setItem('prime-website-theme',value)}catch{}}
let saved='light';try{saved=localStorage.getItem('prime-website-theme')||saved}catch{}setTheme(saved);
theme.addEventListener('click',()=>setTheme(document.documentElement.dataset.theme==='dark'?'light':'dark'));
function closeMenu(){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label',words[2])}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';nav.classList.toggle('open',open);menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',words[open?3:2])});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenu();if(document.activeElement.closest('#navigation'))menu.focus()}});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
const search=$('#tool-search');if(search)search.addEventListener('input',()=>{let n=0;const q=search.value.trim().toLocaleLowerCase(language);document.querySelectorAll('.tool-category .tool').forEach(t=>{t.hidden=!t.textContent.toLocaleLowerCase(language).includes(q);if(!t.hidden)n++});document.querySelectorAll('.tool-category').forEach(c=>c.hidden=![...c.querySelectorAll('.tool')].some(t=>!t.hidden));const singular={en:'tool found',fr:'outil trouvé',de:'Werkzeug gefunden',es:'herramienta encontrada',it:'strumento trovato'};$('#search-count').textContent=`${n} ${n===1?singular[language]:words[4]}`;$('#no-tools').hidden=n!==0});
document.querySelector('#language-picker').addEventListener('change',e=>{const l=e.target.value;if(!['en','fr','de','es','it'].includes(l))return;try{localStorage.setItem('prime-website-language',l)}catch{}location.assign((l==='en'?'':'/'+l)+'/'+document.documentElement.dataset.page+location.hash)});
try{const preferred=localStorage.getItem('prime-website-language');if((location.pathname==='/'||location.pathname==='/index.html')&&['fr','de','es','it'].includes(preferred)){location.replace('/'+preferred+'/index.html'+location.hash)}else localStorage.setItem('prime-website-language',language)}catch{}

// Header state observes the existing Firebase session; never redirects visitors.
import("/v11-auth.js").catch(() => {});
