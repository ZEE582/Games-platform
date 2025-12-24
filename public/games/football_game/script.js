let rawData={players:[],coaches:[],leagues:[],tournaments:[],stadiums:[],events:[]}
let data=[]
let score=0
let correctIndex=0
let baseTime=15
let time=15
let timer=null
let level="easy"
let ready=false

const sCorrect=new Audio("sounds/correct.mp3")
const sWrong=new Audio("sounds/wrong.mp3")
const sTimer=new Audio("sounds/tick.mp3")
sTimer.loop=true

Promise.all([
fetch("data/players.json").then(r=>r.json()),
fetch("data/coaches.json").then(r=>r.json()),
fetch("data/leagues.json").then(r=>r.json()),
fetch("data/international_tournaments.json").then(r=>r.json()),
fetch("data/stadiums.json").then(r=>r.json()),
fetch("data/events.json").then(r=>r.json())
]).then(([p,c,l,t,s,e])=>{
rawData.players=p
rawData.coaches=c
rawData.leagues=l
rawData.tournaments=t
rawData.stadiums=s
rawData.events=e
buildQuestions()
ready=true
document.getElementById("highScore").textContent=getHighScore()
})

function buildQuestions(){
data=[]

rawData.players.forEach(p=>{
let club=random(p.career)
let opts=shuffle([p.name,random(rawData.players).name,random(rawData.players).name,random(rawData.players).name])
data.push({q:"أي لاعب لعب مع نادي "+club+"؟",options:opts,answer:p.name})
})

rawData.coaches.forEach(c=>{
let team=random(c.career)
let opts=shuffle([c.name,random(rawData.coaches).name,random(rawData.coaches).name,random(rawData.coaches).name])
data.push({q:"من هو المدرب الذي درب "+team+"؟",options:opts,answer:c.name})
})

rawData.leagues.forEach(l=>{
let opts=shuffle([l.country,random(rawData.leagues).country,random(rawData.leagues).country,random(rawData.leagues).country])
data.push({q:"في أي دولة يقام دوري "+l.name+"؟",options:opts,answer:l.country})
})

rawData.tournaments.forEach(t=>{
let opts=shuffle([
String(t.firstEdition),
String(random(rawData.tournaments).firstEdition),
String(random(rawData.tournaments).firstEdition),
String(random(rawData.tournaments).firstEdition)
])
data.push({q:"سنة انطلاق بطولة "+t.name+"؟",options:opts,answer:String(t.firstEdition)})
})

rawData.stadiums.forEach(s=>{
let opts=shuffle([s.club,random(rawData.stadiums).club,random(rawData.stadiums).club,random(rawData.stadiums).club])
data.push({q:"أي نادي يلعب في ملعب "+s.name+"؟",options:opts,answer:s.club})
})

rawData.events.forEach(e=>{
let opts=shuffle([e.event,random(rawData.events).event,random(rawData.events).event,random(rawData.events).event])
data.push({q:"أي من هذه أحداث كروية مشهورة؟",options:opts,answer:e.event})
})
}

function setLevel(l){
level=l
baseTime=l==="easy"?15:l==="medium"?10:7
}

function startGame(){
if(!ready||!data.length)return
score=0
document.getElementById("score").textContent=score
document.getElementById("menu").classList.add("hidden")
document.getElementById("game").classList.remove("hidden")
nextQuestion()
}

function startTimer(){
clearInterval(timer)
time=baseTime
document.getElementById("time").textContent=time
sTimer.currentTime=0
sTimer.play()
timer=setInterval(()=>{
time--
document.getElementById("time").textContent=time
if(time<=0)endGame()
},1000)
}

function nextQuestion(){
const q=random(data)
document.getElementById("question").textContent=q.q
let options=shuffle([...q.options])
correctIndex=options.indexOf(q.answer)
options.forEach((o,i)=>document.getElementById("o"+i).textContent=o)
startTimer()
}

function answer(i){
if(i===correctIndex){
score+=10
sCorrect.play()
}else{
score-=5
if(score<0)score=0
sWrong.play()
}
document.getElementById("score").textContent=score
nextQuestion()
}

function endGame(){
clearInterval(timer)
sTimer.pause()
sTimer.currentTime=0
saveHighScore(score)
document.getElementById("game").classList.add("hidden")
document.getElementById("end").classList.remove("hidden")
document.getElementById("finalScore").textContent="نتيجتك: "+score+" | أعلى نتيجة: "+getHighScore()
}

function random(arr){
return arr[Math.floor(Math.random()*arr.length)]
}

function shuffle(arr){
return arr.sort(()=>Math.random()-0.5)
}

function saveHighScore(s){
const h=getHighScore()
if(s>h)localStorage.setItem("highScore",s)
}

function getHighScore(){
return Number(localStorage.getItem("highScore")||0)
}
