'use strict'

// Make navbar transparent when it is on the top
// 맨 위에 있을때 navbar를 투명하게 만든다.
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
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
    navbarMenu.classList.remove('open');
    scrollIntoView(link);
});

// Navbar toggle button for small screen
// 작은 화면을 위한 navbar 토글 버튼 만들기.
const navbarToggle = document.querySelector('.navber__toggle-btn');
navbarToggle.addEventListener('click', () => {
    navbarMenu.classList.toggle('open');
});

// Handle click on "contact me" button on home
// Home화면의 contact me 버튼 클릭시 하단의 contact화면으로 스크롤링 된게 만든다.
const homeContactBtn = document.querySelector('.home__contact');
homeContactBtn.addEventListener('click', () => {
    scrollIntoView('#contact');
});

// Make home slowly fade to transparent as the window scrolls down
// 스크롤을 아래로 내리면 홈화면의 투명도가 변하게 만든다.
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    home.style.opacity =  1 - window.scrollY / homeHeight;
});


// Show "arrow up" button when scrolling down
// 스크롤링을 아래로 내리면 "arrow up" 버튼이 보여지게 만든다.
const arrowUp = document.querySelector('.arrow-up')
document.addEventListener('scroll', () => {
    if(window.scrollY > homeHeight/2) {
        arrowUp.classList.add('visible');
    }else {
        arrowUp.classList.remove('visible');
    }
});

// Handle click on the "arrow up" button
// "arrow up" 버튼을 클릭하면 홈 화면으로 이동한다.
arrowUp.addEventListener('click', () => {
    scrollIntoView('#home');
})

// Projects
const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');

workBtnContainer.addEventListener('click', (e) => {
    const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
    if (filter == null ) {
        return;
    }

    // Remove selection form the previous item and select the new one
    // 이전에 선택된 아이템에서 selection을 제거하고 세로운것으로 선택되게 한다.
    const active = document.querySelector('.category__btn.selected');
    active.classList.remove('selected');
    const target = e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode;
    target.classList.add('selected');

    projectContainer.classList.add('anim-out');
    setTimeout(() => {
        projects.forEach((project) => {
            if (filter === '*' || filter === project.dataset.type) {
                project.classList.remove('invisible');
            } else {
                project.classList.add('invisible');
            }
        });
        projectContainer.classList.remove('anim-out');
    }, 300);
    
});

// 1. 모든 섹션 요소들과 메뉴 아이템들을 가지고 온다
// 2. IntersectionObserber를 이용해서 모든 섹션들을 관찰한다
// 3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화 시킨다

const sectionIds= ['#home','#about','#skills','#work','#testimonials','#contact'];

const sections = sectionIds.map(id => document.querySelector(id));
const navItems = sectionIds.map(id => document.querySelector(`[data-link="${id}"]`));

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];
function selectNavItem (selected) {
    selectedNavItem.classList.remove('active');
    selectedNavItem = selected;
    selectedNavItem.classList.add('active');
}

function scrollIntoView (selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior : "smooth"});
    selectNavItem(navItems[sectionIds.indexOf(selector)]);
}

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3,
};

const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting && entry.intersectionRatio > 0) {
            const index = sectionIds.indexOf(`#${entry.target.id}`);
            
            // 스크롤링이 아래로 되어서 페이지가 올라옴
            if(entry.boundingClientRect.y < 0) {
                selectedNavIndex = index + 1;
            }else {
                selectedNavIndex = index - 1;
            };
        };
    });
};

const oberver = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach(section => oberver.observe(section));

window.addEventListener('wheel', () => {

    if(window.scrollY === 0){
        selectedNavIndex = 0;
    } else if (Math.round(window.scrollY + window.innerHeight) === document.body.clientHeight) {
        selectedNavIndex = navItems.length - 1;
    }
    selectNavItem(navItems[selectedNavIndex]);
});



