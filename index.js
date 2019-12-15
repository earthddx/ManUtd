let curr = 0;
let scrollSlide = 0;
const slides = document.querySelectorAll('.slide');
const pages = document.querySelectorAll('.page');
const backgrounds = [  
                    `radial-gradient(#630F16, #080303)`,
                    `radial-gradient(#2E0105, #080303)`,
                    `radial-gradient(#C21725, #080303)`,
                    `radial-gradient(#630F16, #080303)`,
                    `radial-gradient(#2E0105, #080303)`,
                    `radial-gradient(#C21725, #080303)`,
                    `radial-gradient(#630F16, #080303)`,
                    `radial-gradient(#2E0105, #080303)`,
                    `radial-gradient(#C21725, #080303)`
                ];

//change dots on the right
slides.forEach((slide, index) => {
    slide.addEventListener('click', function(){
        changeDots(this);
        nextSlide(index);
        scrollSlide = index;
    });
});

function changeDots(dot){
    slides.forEach(slide=>{
        slide.classList.remove('active');
    });
    dot.classList.add('active');
}

//page scroll
function nextSlide(pageNumber){
    const nextPage = pages[pageNumber];
    const currPage = pages[curr];
    const nextLeft = nextPage.querySelector('.hero .player-left');
    const nextRight = nextPage.querySelector('.hero .player-right');
    const currLeft = currPage.querySelector('.hero .player-left');
    const currRight = currPage.querySelector('.hero .player-right');
    const portfolio = document.querySelector('.portfolio');
    const currShadow = currPage.querySelector('.hero');
    const nextShadow = nextPage.querySelector('.hero');
    
    const tl = new TimelineMax();

    tl.fromTo(currLeft, 0.3, {y: '-10%'}, {y:'-100%'})
    .fromTo(currRight, 0.3, {y: '10%'}, {y:'-100%'}, '-=0.2')
    .to(portfolio, 0.3,{backgroundImage:backgrounds[pageNumber]})
    .fromTo(currPage, 0.3, {opacity: 1, pointerEvents:'all'}, {opacity: 0, pointerEvents:'none'})
    .fromTo(nextPage, 0.3, {opacity: 0, pointerEvents:'none'}, {opacity: 1, pointerEvents:'all'},'-=0.3')
    .fromTo(nextLeft, 0.3, {y:'-100%'}, {y:'10%'},'-=0.4')
    .fromTo(nextRight, 0.3, {y:'-100%'}, {y:'-10%'},'-=0.5')
    .fromTo(currShadow, 0.3, { boxShadow: '0 5px 10px rgba(0,0,0,1)'}, {boxShadow: 'none'},'-=1')
    .fromTo(nextShadow, 0.3,  {boxShadow: 'none'}, { boxShadow: '0 5px 10px rgba(0,0,0,1)'})
    .set(nextLeft, {clearProps:'all'})//reset hover state so the links work
    .set(nextRight, {clearProps:'all'})
    .set(nextShadow,{clearProps:'all'})

    curr=pageNumber;
}

//menu toggle  
const hamburger = document.querySelector('.menu');
const hamburgerLines= document.querySelectorAll('.menu line');
const navOpen = document.querySelector('.nav-open');

const tl = new TimelineMax({paused: true, reversed: true});

tl.to(navOpen, 0.5, {x:0})
    .fromTo(hamburgerLines, 0.2, {stroke:'white'}, {stroke:'black'});

hamburger.addEventListener('click', ()=> {
    tl.reversed() ? tl.play(): tl.reverse();
});

//mouse scroll
document.addEventListener('wheel', throttle(scrollChange, 500));
//touch scroll
document.addEventListener("touchmove", throttle(scrollChange, 500));


function switchDots(dotNumber){
    const activeDot = document.querySelectorAll('.slide')[dotNumber];
    slides.forEach(slide => {
        slide.classList.remove('active');
    })
    activeDot.classList.add('active');
}

//scroll up or down depending on deltaY(+ - 100)
function scrollChange(e){
    if(e.deltaY >0){
        scrollSlide +=1;
    }else{
        scrollSlide-=1;
    }
    if(scrollSlide >8){
        scrollSlide = 0;
    }
    if(scrollSlide <0){
        scrollSlide = 8;
    }
    //go to next page
    switchDots(scrollSlide);
    nextSlide(scrollSlide) ;
}

//wheel scroll
function throttle(func, limit){
        let inThrottle;
    return function(){
        const args = arguments;
        const context = this;
        if(!inThrottle){
            func.apply(context, args);
            inThrottle = true;
            setTimeout(()=> (inThrottle = false), limit);
        }
    };
}



