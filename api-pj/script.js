
//const API_KEY=`def2a526c8274005801712825b3c820c`
let openMenu = document.getElementById("open_menu")

let searchBtn = document.getElementById("searchBtn")
let scloseBtn = document.getElementById("scloseBtn")
let searchBx = document.getElementById("searchBx")
let searchInput = document.getElementById("searchInput")
let noMessage = document.getElementById("noResultsMessage")

let newsList=[]
let searchHistory = [];
const menus = document.querySelectorAll(".menu-bx button")
noMessage.style.display = "none";
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

// 처음 실행
checkDevice();

// 화면 크기 변경 감지
window.addEventListener("resize", checkDevice);


//api 불러오기
const getLatestNews = async()=>{

    // const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
    const url = new URL(
        `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&pageSize=20`
      );
    const response = await fetch(url);
    const data = await response.json()
    newsList = data.articles
    
    render()
    console.log("rdr", newsList)
};
getLatestNews()

//카테고리 선택
const getNewsByCategory= async (event)=>{
    const category = event.target.textContent.toLowerCase()
    if (noMessage) {
        noMessage.style.display = "none"; // 검색 결과가 없다는 메시지 숨기기
    }
    console.log("catagory", category)
    const url = new URL(
        `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&category=${category}&pageSize=20`
      );
      const response = await fetch(url);
      const data = await response.json();
      console.log("date", data);

      newsList = data.articles;
      render();
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

    const url = new URL(
        `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&q=${keyword}&pageSize=20`
      );

    const response = await fetch(url);
      const data = await response.json();
      console.log("keyword", keyword, searchHistory)

      if (data.articles.length === 0) {
        // 뉴스가 없다면 "검색 결과가 없습니다" 메시지 표시
        noMessage.style.display = "block";
    } else {
        // 뉴스가 있으면 데이터 업데이트 후 렌더링
        newsList = data.articles;
        render();
    }

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
    if (noMessage) {
        noMessage.style.display = "none"; // 검색 결과가 없다는 메시지 숨기기
    }

    
    if (newsList.length === 0) {
        console.log("뉴스가 아직 로드되지 않았습니다.");
        return;
    }

    // 뉴스 리스트에서 랜덤으로 5개 선택
    const shuffled = newsList.sort(() => 0.5 - Math.random()); 
    const randomNews = shuffled.slice(0, 5); // 5개 선택

    render();
});

const render = () => {
    const newsHTML = newsList.map(news=>`
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
        `).join("")
    
    document.getElementById("newsCont").innerHTML=newsHTML;
}

/*
1. 버튼들 클릭이벤트 주기
2. 카테고리별 뉴스 가져오기
3. 그 뉴스를 보여주기
*/
