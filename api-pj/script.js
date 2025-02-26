
//const API_KEY=`def2a526c8274005801712825b3c820c`
let openMenu = document.getElementById("open_menu")

let searchBtn = document.getElementById("searchBtn")
let scloseBtn = document.getElementById("scloseBtn")
let searchBx = document.getElementById("searchBx")

let newsList=[]

//menu
const menuBox = document.querySelector(".menu-bx");
        


function openNav() {
    this.classList.toggle("active");
    menuBox.classList.toggle("active");
  }


searchBtn.addEventListener("click", () => {
    searchBx.classList.add("active");// active 클래스 추가
});
scloseBtn.addEventListener("click", () => {
    searchBx.classList.remove("active");// active 클래스 추가
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


const render = () => {
    const newsHTML = newsList.map(news=>`
        <div class="news_cont">
                        <div class="newsimg">
                            <img src=${news.urlToImage || `./img/no-image.png` } alt="">
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


