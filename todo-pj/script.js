//menu
let menuCloseBtn = document.getElementById("menuCloseBtn");
let menuOpenBtn = document.getElementById("menuOpenBtn");
let navCont = document.getElementById("t-inner");

menuOpenBtn.addEventListener("click", () => {
    navCont.classList.add("active"); // active 클래스 추가
});

menuCloseBtn.addEventListener("click", () => {
    navCont.classList.remove("active"); // active 클래스 제거
});


//inputarea
let taskInput = document.getElementById("task-input");
let startDateInput = document.getElementById("startDate");
let endDateInput = document.getElementById("endDate");
let taskBtn = document.getElementById("taskBtn");
let tabs = document.querySelectorAll(".task-tab .tab")
let underLine = document.getElementById("tab-underline");

let taskList=[]
let filterList=[]
let mode="all"
console.log(taskInput); // null이면 선택이 안 된 상태!

// 엔터키로도 작업 추가
taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addTask();
    }
  });
  
taskBtn.addEventListener("click",addTask);

taskInput.addEventListener("focus",function(){taskInput.value=""})



//탭을 클릭했을 때 이벤트 발생
for(let i=0; i<tabs.length; i++){
    tabs[i].addEventListener("click",function(event){
        filter(event)}
)}

function addTask(){
    let taskValue = taskInput.value;
    let taskstartDate = startDateInput.value; // 여기서 value를 추가
    let taskendDate = endDateInput ? endDateInput.value : ""; // endDateInput이 없을 경우 빈 문자열

    if (taskValue === "") return alert("할일을 입력해주세요");
    //list에 입력한 값은 저장되지만 사용자페이지는 변화 없음
    //let task = taskInput.value
    //아이디값 부여하기
    let task = {
        id:randomIdGenerate(), //아이디 값
        taskContent: taskInput.value, //입력한 값을 나타내자
        taskstartDate: taskstartDate, // 제대로 값 할당
        taskendDate: taskendDate,
        addDropCont: selectedDropValue,
        isComplete:false //
    }
    taskList.push(task)
    console.log("taskList:", taskList)

    render()
    // 입력 필드 초기화
    taskInput.value = "";
    startDateInput.value = ""; // 시작 날짜 초기화
    if (endDateInput) endDateInput.value = ""; // 종료 날짜 초기화
    dropBtn.textContent = "분류";

}

function render(){
    let list=[]
    //내가 선택한 탭에 따라서 리스트를 달리 보여준다다
    if(mode === "all"){
        list = [...taskList].sort((a, b) => a.isComplete - b.isComplete);
    //전체 일정에서 "진행중 → 완료" 순서로 정렬하는 코드
    }else if(mode === "progress" || mode === "done"){
        list=filterList;
    }
    //사용자 화면에도 표시가 되겠끔하기
    //click 버튼 누르면 onclick으로 반응하기
    //isComplete가 true일 때, false 일 때 html 다르게 넣기
    let result="";
 
    let todoResult = "";
    let progressResult = "";
    let doneResult = "";

    //let list = mode === "all" ? taskList : filterList;

    for (let i = 0; i < list.length; i++) {
        let startDate = list[i].taskstartDate;
        let endDate = list[i].taskendDate;
        let task = list[i];
        let dateHTML = "";

        // 날짜가 있는 경우만 <p> 태그 생성
        if (startDate && endDate) {
            dateHTML = `<p class="date"><span>${startDate}</span> ~ <span>${endDate}</span></p>`;
        } else if (startDate) {
            dateHTML = `<p class="date"><span>${startDate}</span> ~</p>`;
        } else if (endDate) {
            dateHTML = `<p class="date">~ <span>${endDate}</span></p>`;
        }


        let taskHTML = `
        <div class="task ${list[i].isComplete ? "task-done" : ""}">
            <div class="task-cont">
                <div class="check-cont-bx">
                    <button class="checkbtn ${list[i].isComplete ? "done" : ""}" onclick="toggleComplete('${list[i].id}')"></button>
                    <p>${list[i].taskContent}</p>
                </div>
                <button class="delbtn" onclick="deleteTask('${list[i].id}')"></button>
            </div>
            ${task.addDropCont ? `<p class="adddrop-cont">${task.addDropCont}</p>` : ""}

            ${dateHTML} 
        </div>`;

        // 상태별로 다른 섹션에 추가
         if (mode === "all") {
            todoResult += taskHTML;
        }
        if (list[i].isComplete) {
            doneResult += taskHTML;
        } else {
            progressResult += taskHTML;
        }
    }

    // 모든 상태에 맞게 업데이트
    document.getElementById("taskBoard").innerHTML = todoResult;
    document.getElementById("taskBoardprog").innerHTML = progressResult;
    document.getElementById("taskBoarddone").innerHTML = doneResult;
}

//click할 때 클릭한 id값이 list id값과 동일하면 기존 isComplete 반대로 되게 하기
function toggleComplete(id){
    for(let i=0; i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList[i].isComplete=!  taskList[i].isComplete;
            break;
        }
    }
    render()
    console.log(taskList);
}
function deleteTask(id) {
    taskList = taskList.filter(task => task.id !== id);
    filterList = filterList.filter(task => task.id !== id);
    render();

    // for (let i = 0; i < taskList.length; i++) {
    //   if (taskList[i].id === id) {
    //     taskList.splice(i, 1);
    //   }
    // }
  
    render();
  }

//필터
function filter(event){
    mode = event.target.id
    filterList=[]
    moveUnderline(event.target);

    console.log("filter",mode);
    if(mode === "all"){
        document.querySelector(".task-board.todo").style.display = "block";
        document.querySelector(".task-board.prog").style.display = "block";
        document.querySelector(".task-board.done").style.display = "block";
        render();
    }else if(mode === "progress"){
        document.querySelector(".task-board.todo").style.display = "none";
        document.querySelector(".task-board.prog").style.display = "block";
        document.querySelector(".task-board.done").style.display = "none";
         //task.isComplete=false
         for(let i=0; i<taskList.length;i++){
            if(taskList[i].isComplete === false){
                filterList.push(taskList[i])
            }
        }
        render() 
    }else if(mode === "done"){
        document.querySelector(".task-board.todo").style.display = "none";
        document.querySelector(".task-board.prog").style.display = "none";
        document.querySelector(".task-board.done").style.display = "block";
         //task.isComplete=true
         for(let i=0; i<taskList.length;i++){
            if(taskList[i].isComplete === true){
                filterList.push(taskList[i])
            }
        }
        render()
    }
}

function moveUnderline(target) {
    let underline = document.getElementById("under-line");
    underline.style.left = target.offsetLeft + "px";
    underline.style.width = target.offsetWidth + "px";
  }

  
//랜덤 id 값 부여
function randomIdGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9);
}
