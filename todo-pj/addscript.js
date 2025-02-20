//menu


let dropBtn = document.getElementById("dropBtn");
let dropMenu = document.getElementById("dropMenu");
let addDropInput = document.getElementById("addDropInput");
let addDropBtn = document.getElementById("addDropBtn");


let addDropList = [];
let selectedDropValue = ""; // 사용자가 선택한 값 저장



//drop toggle
dropBtn.addEventListener("click", () => {
    dropMenu.classList.toggle("active"); 
});


//addDropInput값을 addDropList에 추가
addDropBtn.addEventListener("click",addDrop);

// 엔터키로도 추가
addDropInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addDrop();
        addDropInput.value=""
    }
  });

  function addDrop(){
    let dropValue = addDropInput.value;

    let drop = {
        id:randomIdGenerate(),
        addDropCont:addDropInput.value
    }
    if (dropValue === "") return alert("분류를 입력해주세요");

    addDropList.push(drop)
    console.log(addDropList)
    renderdrop()
  };

  function renderdrop(){
    let addDropResult=""

    for(let i=0; i<addDropList.length; i++){
        addDropResult +=`
        <li><a class="dropdown-item" href="#"  onclick="selectDropItem('${addDropList[i].addDropCont}')">${addDropList[i].addDropCont}</a></li>
        `
    }
    
    document.getElementById("dropCont").innerHTML = addDropResult;

  }

  function selectDropItem(value) {
    selectedDropValue = value; // 선택한 값을 변수에 저장
    dropMenu.classList.remove("active"); // 드롭다운 메뉴 닫기
    dropBtn.textContent = value; // 버튼에 선택한 값 표시
    console.log("list에서 선택됨")
}
