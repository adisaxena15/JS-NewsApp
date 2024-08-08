const API_KEY = "ee0c5d7f3bc24434a4d06d3a5c1d3a6b";
const url = "https://newsapi.org/v2/everything?q=";


window.addEventListener("load", () => fetchNews("India"));
function reload() {
    window.location.reload();
}
async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}


function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");


    cardsContainer.innerHTML = "";


    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}
function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");


    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;


    //timezone setting from api data
    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });


    newsSource.innerHTML = `${article.source.name} - ${date}`;


    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank"); //new tab
    });
}


////////////////////////////////////////////////////////////
/* navigating bars */
let curSelectedNav=null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}
const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");


searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});


function displayTime(){
    const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true};
    const time = new Date().toLocaleTimeString('US-en',options);
    const timeElements = document.getElementsByClassName('time');
    for(let element of timeElements){
        element.innerHTML = time;
    }
}
setInterval(displayTime,1000);
displayTime();