const nav=document.querySelector('.nav');
const menu=document.querySelector('#menu-toggle');
const mainNav=document.querySelector('#main-nav');

function setMenu(open){
  nav.classList.toggle('open',open);
  menu.setAttribute('aria-expanded',String(open));
  menu.setAttribute('aria-label',open?'Zamknij menu':'Otwórz menu');
  menu.querySelector('span').textContent=open?'ZAMKNIJ':'MENU';
}

menu.addEventListener('click',()=>setMenu(!nav.classList.contains('open')));
mainNav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>setMenu(false)));
document.addEventListener('click',event=>{if(!nav.contains(event.target))setMenu(false)});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&nav.classList.contains('open')){setMenu(false);menu.focus()}});

const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('visible')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(element=>observer.observe(element));

document.querySelector('#contact-form')?.addEventListener('submit',event=>{
  event.preventDefault();
  alert('To wersja próbna. W finalnej stronie podłączymy prawdziwą wysyłkę wiadomości.');
});

const ebookDialog=document.querySelector('#ebook-dialog');
const ebookListToggle=document.querySelector('#ebook-list-toggle');
const ebookList=document.querySelector('#ebook-list');
ebookListToggle?.addEventListener('click',()=>{
  const open=ebookListToggle.getAttribute('aria-expanded')!=='true';
  ebookListToggle.setAttribute('aria-expanded',String(open));
  ebookListToggle.querySelector('span').textContent=open?'ZWIŃ LISTĘ':'ZOBACZ DOSTĘPNE E-BOOKI';
  ebookList.hidden=!open;
});
document.querySelector('#open-ebook')?.addEventListener('click',()=>ebookDialog.showModal());
document.querySelector('#open-ebook-cover')?.addEventListener('click',()=>ebookDialog.showModal());
document.querySelector('#close-ebook')?.addEventListener('click',()=>ebookDialog.close());
ebookDialog?.addEventListener('click',event=>{if(event.target===ebookDialog)ebookDialog.close()});

const resultDialog=document.querySelector('#results-dialog');
const resultDialogImage=document.querySelector('#results-dialog-image');
const resultCounter=document.querySelector('#results-counter');
const resultButtons=[...document.querySelectorAll('.result-open')];
let activeResult=0;

function showResult(index){
  activeResult=(index+resultButtons.length)%resultButtons.length;
  const source=resultButtons[activeResult].querySelector('img');
  resultDialogImage.src=source.currentSrc||source.src;
  resultDialogImage.alt=source.alt;
  resultCounter.textContent=`${activeResult+1} / ${resultButtons.length}`;
}

resultButtons.forEach((button,index)=>button.addEventListener('click',()=>{
  showResult(index);
  resultDialog.showModal();
}));
document.querySelector('#close-results')?.addEventListener('click',()=>resultDialog.close());
document.querySelector('#results-prev')?.addEventListener('click',()=>showResult(activeResult-1));
document.querySelector('#results-next')?.addEventListener('click',()=>showResult(activeResult+1));
resultDialog?.addEventListener('click',event=>{if(event.target===resultDialog)resultDialog.close()});
resultDialog?.addEventListener('keydown',event=>{
  if(event.key==='ArrowLeft')showResult(activeResult-1);
  if(event.key==='ArrowRight')showResult(activeResult+1);
});
let resultTouchStart=0;
resultDialog?.addEventListener('touchstart',event=>{resultTouchStart=event.changedTouches[0].clientX},{passive:true});
resultDialog?.addEventListener('touchend',event=>{
  const distance=event.changedTouches[0].clientX-resultTouchStart;
  if(Math.abs(distance)>45)showResult(activeResult+(distance<0?1:-1));
},{passive:true});

const privacyDialog=document.querySelector('#privacy-dialog');
['#open-privacy-form','#open-privacy-footer'].forEach(selector=>document.querySelector(selector)?.addEventListener('click',()=>privacyDialog.showModal()));
document.querySelector('#close-privacy')?.addEventListener('click',()=>privacyDialog.close());
privacyDialog?.addEventListener('click',event=>{if(event.target===privacyDialog)privacyDialog.close()});
