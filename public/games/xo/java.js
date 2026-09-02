let turn = 'x';
let TIELE = document.querySelector('.title');
let Arraay = [];
let clickSound = new Audio("sound/C.mp3");
let winSound   = new Audio("sound/W.mp3");
let DrawSound  = new Audio("sound/E.mp3");

function end(num1,num2,num3){
  TIELE.innerHTML = Arraay[num1] + " Winner 🏆";
    winSound.play();
    setTimeout(()=> winSound.play(),200);
document.getElementById('i'+num1).style.background = '#46c16dff';
document.getElementById('i'+num2).style.background = '#46c16dff';
document.getElementById('i'+num3).style.background = '#46c16dff';


setInterval(function(){TIELE.innerHTML +='.'},1000);
setTimeout(function(){location.reload()},3000);
}
function winer(){
    let full = true; 

    for(let i = 1; i < 10; i++){
        Arraay[i] = document.getElementById('i' + i).innerHTML;
        if(Arraay[i] == "") full = false;
    }

   
    if( Arraay[1]==Arraay[2] && Arraay[2]==Arraay[3] && Arraay[1] != '' ) return end(1,2,3);
    if( Arraay[4]==Arraay[5] && Arraay[5]==Arraay[6] && Arraay[4] != '' ) return end(4,5,6);
    if( Arraay[7]==Arraay[8] && Arraay[8]==Arraay[9] && Arraay[7] != '' ) return end(7,8,9);

    if( Arraay[1]==Arraay[4] && Arraay[4]==Arraay[7] && Arraay[1] != '' ) return end(1,4,7);
    if( Arraay[2]==Arraay[5] && Arraay[5]==Arraay[8] && Arraay[2] != '' ) return end(2,5,8);
    if( Arraay[3]==Arraay[6] && Arraay[6]==Arraay[9] && Arraay[3] != '' ) return end(3,6,9);

    if( Arraay[1]==Arraay[5] && Arraay[5]==Arraay[9] && Arraay[1] != '' ) return end(1,5,9);
    if( Arraay[3]==Arraay[5] && Arraay[5]==Arraay[7] && Arraay[3] != '' ) return end(3,5,7);


    if(full){
  DrawSound.play();
        TIELE.innerHTML = "Draw 😐";
        setTimeout(()=> location.reload(),2000);
    }
}

function game(id) {
    let element = document.getElementById(id);

    if (turn === 'x' && element.innerHTML == '') {
        element.innerHTML = 'X';
        clickSound.currentTime = 0;
         clickSound.play();
        turn = 'o'; 
        TIELE.innerHTML = 'Turn: O';
    } 
    else if (turn === 'o' && element.innerHTML == '') {
        element.innerHTML = 'O';
        clickSound.currentTime = 0;
         clickSound.play();
        turn = 'x'; 
        TIELE.innerHTML = 'Turn: X';
    }
    winer();
}