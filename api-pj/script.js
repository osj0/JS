
//const API_KEY=`def2a526c8274005801712825b3c820c`
let openMenu = document.getElementById("open_menu")

let searchBtn = document.getElementById("searchBtn")
let scloseBtn = document.getElementById("scloseBtn")
let searchBx = document.getElementById("searchBx")
let searchInput = document.getElementById("searchInput")
let noMessage = document.getElementById("noResultsMessage")

let url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&pageSize=20`
  );

let newsList=[]
let searchHistory = [];

let totalResults = 0;
let paget = 1;
const pageSize = 10;
const groupSize = 5;

const menus = document.querySelectorAll(".menu-bx button")
// noMessage.style.display = "none";
menus.forEach(menus=>menus.addEventListener("click",(event)=>getNewsByCategory(event)))

// 엔터키로도 작업 추가
searchInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        getNewsByKeyword();        
    }
  });
//menu
const menuBox = document.querySelector(".menu-bx");
        
function openNav() {
    this.classList.toggle("active");
    menuBox.classList.toggle("active");
  }

searchBtn.addEventListener("click", () => {
    searchBx.classList.add("active");
});
scloseBtn.addEventListener("click", () => {
    searchBx.classList.remove("active");
});

function checkDevice() {
    if (window.innerWidth <= 1024) {
        openMenu.removeEventListener("click", openNav);

        openMenu.addEventListener("click", openNav);
    } else {
        openMenu.removeEventListener("click", openNav);
        console.log("PC에서 실행됨");
    }
}

checkDevice();
window.addEventListener("resize", checkDevice);

// 중복
const getNews = async()=>{
    try{
        url.searchParams.set("page",paget) // &page=page
        url.searchParams.set("pageSize",pageSize);

        const response = await fetch(url);
        
        const data = await response.json();
        if(response.status === 200){
            if (data.totalResults === 0) {
                throw new Error("검색어와 일치하는 결과가 없습니다");
              }
        
              newsList = data.articles;
              totalResults = data.totalResults; 
              
              render();
              pagenationRender();
            } else {
              throw new Error(data.message);
            }
        

    } catch (e) {
        errorRender(e.message);
      }
    
}
const errorRender = (message) => {
    const errorHTML = `<div class="noResultsMessage">
                <p>${message}</p>
            </div>`
    document.getElementById("newsCont").innerHTML=errorHTML;

  };

//api 
// 불러오기
const getLatestNews = async()=>{

    // const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
    url = new URL(
        `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&pageSize=20`
      );
      getNews()
};
//page
const pagenationRender=()=>{
    const totalPages = Math.ceil(totalResults / pageSize);
    const pageGroup = Math.ceil(paget / groupSize);
    let lastPage = pageGroup * groupSize;

    if(lastPage > totalPages){
        lastPage = totalPages;
    }
    console.log("tot", totalResults)
    const firstPage = lastPage - (groupSize - 1) <= 0 ? 1 : lastPage - (groupSize - 1);
    
      let pagenationHTML =``
      if (paget > 1) {
        pagenationHTML += `<li onclick="moveToPage(1)"><a href="#"> &lt;&lt;</a></li>`;
        pagenationHTML += `<li onclick="moveToPage(${paget - 1})"><a href="#"> &lt;</a></li>`;
    } 

    for(let i=firstPage;i<=lastPage;i++){
        pagenationHTML+=`<li class="pageitem ${i===paget?"active":''}" onclick="moveToPage(${i})"><a href="#">${i}</a></li>`
    }
    if (paget < totalPages) {
        pagenationHTML += `<li onclick="moveToPage(${paget + 1})"><a href="#"> &gt;</a></li>`;
        pagenationHTML += `<li onclick="moveToPage(${totalPages})"><a href="#"> &gt;&gt;</a></li>`;
    }
    
    document.querySelector(".pagenation").innerHTML=pagenationHTML
};

const moveToPage=(pageNum)=>{
    console.log("move",pageNum)
    paget = pageNum;
    getNews()
}
getLatestNews()


//카테고리 선택
const getNewsByCategory= async (event)=>{
    const category = event.target.textContent.toLowerCase()
    url = new URL(
        `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&category=${category}&pageSize=20`
      );

      getNews()
}

// 키워드 입력
const getNewsByKeyword =async ()=>{
    const keyword = searchInput.value.trim();
    if (keyword === "") return alert("키워드 입력해주세요");
   
    if (!searchHistory.includes(keyword)) {
        searchHistory.unshift(keyword); // 최신 검색어가 위로 오도록 추가
        if (searchHistory.length > 5) searchHistory.pop(); // 최대 5개까지만 유지
        renderSearchHistory(); // 화면에 업데이트
    }

    url = new URL(
        `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&q=${keyword}&pageSize=20`
      );

      getNews()
      historyDelete();
}
// 키워드 검색 보여지기
const renderSearchHistory = () => {
    const historyContainer = document.getElementById("searchResult");
    historyContainer.innerHTML = searchHistory
        .map(
            (keyword) => `<p class="result-item">${keyword}</p>`
        )
        .join("");
};

// 검색기록삭제
const resultDelete = () => {
    searchHistory = [];
    
    let historyList = document.getElementById("searchResult");
    if (historyList) {
        historyList.innerHTML = ""; // 검색 기록 삭제
    }
    

    console.log("검색 기록이 삭제되었습니다.");
};

const historyDelete = () => {
    document.getElementById("searchInput").value = ""; // 입력 필드 초기화

    if (searchBx) {
        searchBx.classList.remove("active"); // active 클래스 제거
    }

}


// 로고 클릭 시 카테고리 상관없이 랜덤으로 나옴
document.querySelector(".headline a").addEventListener("click", (event) => {
    event.preventDefault(); // 링크 이동 방지
    getLatestNews();
});




const render = () => {
    const newsCont = document.getElementById("newsCont");

        // 뉴스가 있으면 뉴스 목록을 출력
        const newsHTML = newsList.map(news => `
            <div class="news_cont">
                <div class="newsimg">
                    <img src="${news.urlToImage || './img/no-image.png'}" 
                         onerror="this.onerror=null; this.src='./img/no-image.png';" 
                         alt="">
                </div>
                <div class="newstxt">
                    <div class="tit-bx">
                        <p class="tit">${news.title}</p>
                        <p class="txt">${news.description 
                            ? (news.description.length > 200 
                                ? news.description.substring(0, 200) + "..." 
                                : news.description) 
                            : "내용 없음"} </p>
                    </div>
                    <p class="date">${news.source.name || "no source"} ${moment(news.publishedAt).fromNow()}</p>
                </div>
            </div>
        `).join("");
    
    document.getElementById("newsCont").innerHTML=newsHTML;
}

/*
1. 버튼들 클릭이벤트 주기
2. 카테고리별 뉴스 가져오기
3. 그 뉴스를 보여주기
*/
