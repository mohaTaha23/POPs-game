const gameArea = document.getElementById('gameArea');

let score =0;
let balls =0; 

function getRandomColor() {
    const colors = ['red', 'blue', 'green', 'yellow', 'purple'];
    return colors[Math.floor(Math.random() * colors.length)];
}
function getRandomEnd(){
    const statements = ["ummm... u clicking or what?","LOL too slow","imagine these beat you 💀","one more time","GG... try again"]
    return statements[Math.floor(score/5)>4 ? 4:Math.floor(score/5)];
}

function createBall() {
    balls++;
    if(balls == 15){
        const ballsNumberP = document.getElementById("balls")
        ballsNumberP.textContent = getRandomEnd();
        pause();
        const allBalls = document.querySelectorAll(".ball")
        allBalls.forEach((element) =>{
            element.onclick = null;
            element.removeEventListener("click" , clickfunc);
        })
    }
    const ball = document.createElement('div');
    ball.className = 'ball';
    ball.style.backgroundColor = getRandomColor();
    ball.style.left = `${Math.random() * (window.innerWidth - 30)}px`; 
    ball.style.top = `${Math.random() * (window.innerHeight - 30)}px`; 
    ball.vx = Math.random() * 5 - 1; 
    ball.vy = Math.random() * 5 - 1; 

    const clickfunc = () =>{
        score++;
        balls--;
        ball.remove();   
    } 
    ball.addEventListener('click',clickfunc);
    gameArea.appendChild(ball);
    return ball;
}

function updateBallPosition() {
    document.querySelectorAll('.ball').forEach(ball => {
        let x = parseFloat(ball.style.left);
        let y = parseFloat(ball.style.top);
        x += ball.vx;
        y += ball.vy;

        if (x <= 0 || x >= window.innerWidth - 30) {
            ball.vx *= -1;
        }
        if (y <= 0 || y >= window.innerHeight - 30) {
            ball.vy *= -1;
        }

        ball.style.left = `${x}px`;
        ball.style.top = `${y}px`;
    });
};
function updateResult (){
    const balls = document.querySelectorAll('.ball');
    const ballsNumberP = document.getElementById("balls")
    const scoreP = document.getElementById("score")
    ballsNumberP.textContent = balls.length;
    ballsNumberP.setAttribute("color",`rgb(${25.5*balls},100,100)`);
    ballsNumberP.style.fontSize = (Math.pow(balls.length,2))+10+"px";
    ballsNumberP.style.color = `rgb(${balls.length*20},50,50)`;
    scoreP.textContent = score;
}

const f1 = setInterval(createBall, 1000); 
const f2 = setInterval(updateBallPosition, 30); 
const f3 = setInterval(updateResult,30);

function pause(){
    clearInterval(f1);
    clearInterval(f2);
    clearInterval(f3);
}
