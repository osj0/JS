//유저가 값을 입력한다
//+ 버튼 > 할일이 추가
//delete 버튼 > 할일 삭제
//check click > true or false
//true : the end > underline
//false : --


//진행중 끝남 탭 > 언더바 이동
// 끝남 : 끝남 아이템 / 진행중 : 진행중 아이템만
// 전체탭 > 다시 전체 아이템으로

let taskInput = document.getElementById("task-input");
let taskBtn = document.getElementById("taskBtn");
let taskList=[];

taskBtn.addEventListener("click",addTask);
taskInput.addEventListener("focus",function(){taskInput.value=""})

function addTask(){
    //객체이용
    let task = {
        id:randomIdGenerate(),
        taskContent: taskInput.value,
        isComplete:false
    }
    taskList.push(task);
    console.log(taskList)
    render();
}

function render(){
    let resultHTML = "";
    for(let i=0; i<taskList.length;i++){
        if(taskList[i].isComplete == true){
            resultHTML += `
            <div class="task task-done">
                <div class="task-cont">
                    <div class="check-cont-bx">
                        <button class="checkbtn done" onclick="toggleComplete('${taskList[i].id}')"></button>
                        <p>${taskList[i].taskContent}</p>
                    </div>
                    <button class="delbtn" onclick="deleteTask('${taskList[i].id}')"></button>
                </div>
                <p class="date">25.02.18</p>
            </div>
        `
        }else{
            resultHTML += `
            <div class="task">
                <div class="task-cont">
                    <div class="check-cont-bx">
                        <button class="checkbtn" onclick="toggleComplete('${taskList[i].id}')"></button>
                        <p>${taskList[i].taskContent}</p>
                    </div>
                    <button class="delbtn" onclick="deleteTask('${taskList[i].id}')"></button>
                </div>
                <p class="date">25.02.18</p>
            </div>
        `

        }
        
    }
    document.getElementById("taskBoard").innerHTML = resultHTML;
}

function toggleComplete(id){
    console.log("id;",id);
    for(let i=0; i<taskList.length;i++){
        if(taskList[i].id == id){
            //오른쪽에 있는 값이 아닌것!
            taskList[i].isComplete=!taskList[i].isComplete;
            break;
        }
    }
    render();
    console.log(taskList);
}
function  deleteTask(id){
    for(let i=0; i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList.splice(i,1);
            break;
        }
    }
    render();
}
function randomIdGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9);
}