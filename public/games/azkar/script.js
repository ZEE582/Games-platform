

const timerEl=document.getElementById('timer');
const inputEl=document.getElementById('userInput');
const zekrText=document.getElementById('zekrText');
const speedEl=document.getElementById('speed');
const accuracyEl=document.getElementById('accuracy');
const lettersEl=document.getElementById('letters');
const newBtn=document.getElementById('newZekr');
const resetBtn=document.getElementById('reset');

let timer=60;
let interval=null;
let started=false;
let currentZekr="";

function formatTime(sec){
  const m=Math.floor(sec/60);
  const s=sec%60;
  return`${m}:${s<10?'0'+s:s}`;
}

function startTimer(){
  if(interval) return;
  interval=setInterval(()=>{
    timer--;
    timerEl.textContent=formatTime(timer);
    if(timer<=0){
      clearInterval(interval);
      interval=null;
      inputEl.disabled=true;
      inputEl.placeholder="انتهى الوقت";
    }
  },1000);
}

function adjustZekrSize(text){
  zekrText.classList.remove("zekr-small","zekr-medium","zekr-large");
  const len=text.length;
  if(len<=40) zekrText.classList.add("zekr-large");
  else if(len<=120) zekrText.classList.add("zekr-medium");
  else zekrText.classList.add("zekr-small");
}

newBtn.addEventListener("click",()=>{
  if(!started){
    startTimer();
    started=true;
  }
  inputEl.disabled=false;
  inputEl.value="";
  currentZekr=azkar[Math.floor(Math.random()*azkar.length)];
  zekrText.textContent=currentZekr;
  adjustZekrSize(currentZekr);
  lettersEl.textContent=0;
  accuracyEl.textContent="0%";
  speedEl.textContent=0;
  inputEl.focus();
});

inputEl.addEventListener("input",()=>{
  const user=inputEl.value;
  let correct=0;
  for(let i=0;i<user.length;i++){
    if(currentZekr[i]===user[i]) correct++;
  }
  lettersEl.textContent=correct;
  accuracyEl.textContent=Math.round((correct/currentZekr.length)*100)+"%";
  speedEl.textContent=user.trim().split(/\s+/).filter(Boolean).length;
});

resetBtn.addEventListener("click",()=>{
  clearInterval(interval);
  interval=null;
  timer=60;
  started=false;
  currentZekr="";
  inputEl.value="";
  inputEl.disabled=false;
  timerEl.textContent="1:00";
  lettersEl.textContent=0;
  speedEl.textContent=0;
  accuracyEl.textContent="0%";
  zekrText.textContent="اضغط ذكر جديد";
});