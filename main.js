'use strict'

// 맨 위에 있을때 navbar를 투명하게 만든다.
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    console.log(window.scrollY);
    console.log(`navbarHeight :${navbarHeight}`);
    if(window.scrollY > navbarHeight){
        navbar.classList.add('navbar--dark');
    }else {
        navbar.classList.remove('navbar--dark');
    }
});

// Handle scrolling when tapping on the navbar menu
// navbar 메뉴를 눌렀을때 스크롤링 되게 만든다.
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) => {
    const target = event.target;
    const link = target.dataset.link;
    if(link == null) {
        return;
    }
    scrollIntoView(link);
});

// Handle click on "contact me" button on home
// Home화면의 contact me 버튼 클릭시 하단의 contact화면으로 스크롤링 된게 만든다.

const homeContactBtn = document.querySelector('.home__contact');
homeContactBtn.addEventListener('click', () => {
    scrollIntoView('#contact');
});

function scrollIntoView (selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior : "smooth"});
}