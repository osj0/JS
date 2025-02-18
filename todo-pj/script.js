//유저가 값을 입력한다
//+ 버튼 > 할일이 추가
//delete 버튼 > 할일 삭제
//진행중 끝남 탭 > 언더바 이동
// 끝남 : 끝남 아이템 / 진행중 : 진행중 아이템만
// 전체탭 > 다시 전체 아이템으로

let taskInput = document.getElementById("task-input");
let taskBtn = document.getElementById("taskBtn");
let taskList=[];

taskBtn.addEventListener("click",addTask);

function addTask(){
    let taskContent = taskInput.value;
    taskList.push(taskContent);
    console.log(taskList)
    render();
}

function render(){
    let resultHTML = "";
    for(let i=0; i<taskList.length;i++){
        resultHTML += `
                            <div class="task">
                                <div class="task-cont">
                                    <p><span><button>check</button></span>
                                    ${taskList[i]}</p>
                                    <button>Delete</button>
                                </div>
                                <p class="date">25.02.18</p>
                            </div>
                        `
    }
    document.getElementById("taskBoard").innerHTML = resultHTML;
}