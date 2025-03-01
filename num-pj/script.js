let computerNum = 0;
//랜덤 번호지정
function pickRandomNum(){
    computerNum = Math.floor(Math.random()*100)+1;
    resultNum.textContent = "정답 : " + computerNum;
    console.log("정답", computerNum);
};

let userInput = document.getElementById("userInput");
let playBtn = document.getElementById("playBtn");
let resultArea = document.getElementById("resultArea")
let resultAreaImg = document.getElementById("main-img");
let resetBtn = document.getElementById("resetBtn")
let chanceArea = document.getElementById("chanceArea")
let history=[]

let chances = 3;
let gameOver = false;

playBtn.addEventListener("click", play);
resetBtn.addEventListener("click", reset);
userInput.addEventListener("focus",function(){userInput.value=""})

function play(){
    //사용자가 숫자를 입력값이 저장된다.
    let userValue = userInput.value;
    console.log(userValue)

    // 단, 1-100 범위
    // 범위 밖 숫자를 입력시 알려주지만, 기회는 깍지 않음
    if(userValue<1 || userValue > 100){
        resultArea.textContent="1-100까지 입력해주세요"
        return;
    }

 
    //단, 또 입력하면 알려주지만, 기회는 깍지 않음 
    if(history.includes(userValue)){
        resultArea.textContent="이미 입력한 숫자야"
        return;
    }

    history.push(userValue)//history에 저장
    console.log(history)

    //3번 기회를 다 쓰면 게임이 끝남
    chances --;
    chanceArea.textContent=`남은 기회 : ${chances}번`;
    console.log("chance",chances)


    //랜덤범호 = 유저번호 GOOD
    //랜덤범호 < 유저번호 DOWN
    //랜덤범호 > 유저번호 UP
    
    if(computerNum < userValue){
        resultAreaImg.src = "./img/down.png"
        resultArea.textContent="DOWN"
        console.log("DOWN")
    }else if(computerNum > userValue){
        resultAreaImg.src = "./img/up.png"
        resultArea.textContent="UP"
        console.log("UP")
    }else {
        resultAreaImg.src = "./img/good.png"
        resultArea.textContent="Good"
        gameOver = true
        console.log("good")
    }

    if(chances < 1){
        resultAreaImg.src = "./img/retry.png"
        resultArea.textContent="retry"
        gameOver = true
        console.log("retry")
    }

    if(gameOver == true){
        playBtn.disabled = true;
    }
    
};




//REST 된다
function reset(){
    userInput.value = "";
    pickRandomNum();

    resultArea.textContent="이제 게임을 시작해볼까나"
    chances = 3;
    resultAreaImg.src = "./img/start.png"
    chanceArea.textContent=`남은 기회 : ${chances}번`
    gameOver == false;
    playBtn.disabled = false;
    history=[];

    
};

pickRandomNum();