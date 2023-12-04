const allSection = document.querySelectorAll('.section');
const allButtons = document.getElementsByTagName('button');
const header = document.querySelector('.header');
const nav = document.querySelector('.nav')

const message = document.createElement('div');
message.classList.add('cookie-message');



message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

const logo = document.querySelector('.nav__logo');
const link = document.querySelector('.twitter-link');

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function(e){
    const s1coords = section1.getBoundingClientRect();
    window.scrollTo({
        left: s1coords.left + window.pageXOffset,
        top: s1coords.top + window.pageYOffset,
        behavior: 'smooth'
    })
   
});

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () => `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`

document.querySelector('.nav__link').addEventListener('click', function(e){
    this.style.backgroundColor = randomColor();
    // console.log('link', e.target , e.currentTarget);
    e.stopPropagation()
})
document.querySelector('.nav__links').addEventListener('click', function(e){
    this.style.backgroundColor = randomColor();
    // console.log('container', e.target, e.currentTarget);
});

document.querySelector('.nav').addEventListener('click', function(e){
    this.style.backgroundColor = randomColor()  ;
    // console.log('nav', e.target, e.currentTarget);
});

document.querySelectorAll('.nav__link').forEach(function(item){
    item.addEventListener('click', function(e){
        e.preventDefault();
       const id = item.getAttribute('href');
       console.log(id);
       document.querySelector(id).scrollIntoView({behavior: 'smooth'});
    })
});

const tabs = document.querySelectorAll('.operations__tab');

const tabsContainer = document.querySelector('.operations__tab-container');

const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function(e){
    const clicked = e.target.closest('.operations__tab');
    if(!clicked) return;
    tabs.forEach((item)=>{
        item.classList.remove('operations__tab--active')
    });
    tabsContent.forEach((item)=>{
        item.classList.remove('operations__content--active')
    })
   clicked.classList.add('operations__tab--active');

   document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')
});

const handelHover = function(e, opacity){
    if(e.target.classList.contains('nav__link')){
        const link = e.target;
        const siblings = link.closest('.nav').querySelectorAll('.nav__link');
        const logo = link.closest('.nav').querySelector('img');

        siblings.forEach((item)=>{
            if(item !== link) {
                item.style.opacity = opacity
            }
        });
        logo.style.opacity = opacity;
    }

};
nav.addEventListener('mouseover', function(e){
    handelHover(e, 0.5)
});
nav.addEventListener('mouseout', function(e){
    handelHover(e, 1)
});

const initialCoords = section1.getBoundingClientRect();

window.addEventListener('scroll', function(e){
    if(window.scrollY > initialCoords.top){
        nav.classList.add('sticky')
    }else{
        nav.classList.remove('sticky')
    }

});

const allSections = document.querySelectorAll('.section');
const revealSection = function(entries, observer){
    const [entry] = entries;
    if(!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden')
    observer.unobserve(entry.target)
}

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15
});
allSections.forEach(function(item){
    sectionObserver.observe(item);
    item.classList.add('section--hidden')
});

const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function(entries, observe){
    const [entry] = entries;
    if(!entry.isIntersecting) return;
    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener('load', function(){
        entry.target.classList.remove('lazy-img')
    });
    observer.unobserve(entry.target)

}

const imgObserver = new IntersectionObserver(loadImg, {
    root: null,
    threshold: 0
});

imgTargets.forEach((item)=>{imgObserver.observe(item)});

const btnLeft = document.querySelector('.slider__btn--left')
const btnRight = document.querySelector('.slider__btn--right')
const slides = document.querySelectorAll('.slide');
let curSlide = 0; 
const maxSlide = slides.length

slides.forEach((item, index)=>(
    item.style.transform = `translateX(${100 * index}%)`
));

const goToSlide = function(slide){
    slides.forEach((item, index)=>(
        item.style.transform = `translateX(${100 * (index - slide)}%)`
    ));

};
goToSlide(0)

const nextSlide = function(){
    if(curSlide === maxSlide - 1){
        curSlide = 0
    }else{
        curSlide++;
    }
goToSlide(curSlide)
};

const prevSlide = function(){
    if(curSlide === 0){
        curSlide = maxSlide -1
    }else{
        curSlide--;
    }
    goToSlide(curSlide)
}

btnRight.addEventListener('click', nextSlide)
btnLeft.addEventListener('click', prevSlide)

