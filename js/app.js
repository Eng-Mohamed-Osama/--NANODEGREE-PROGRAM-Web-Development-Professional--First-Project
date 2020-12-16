//Declaring the needed consts

const header = document.querySelector('header');
const logo = document.querySelector('.logo');
const timelineIndecators = document.querySelectorAll('#about-us span');
const teamCards = document.querySelectorAll('.team-holder');
const teamCardsArray =Array.from(teamCards);
const allTheSections = document.getElementsByTagName('section');
const scrollToTopButton = document.querySelector('.scrolling-button');

//Creating the navbar links dynamically 

const navegation =document.createElement('nav');
const navList = document.createElement('ul');
const container =  document.createDocumentFragment()
function createTheNavBar(){
    for(let i = 0 ; i <= allTheSections.length-1 ; i ++){
    let li =  document.createElement('li');

        li.textContent = allTheSections[i].dataset.set;

        if(i === allTheSections.length-1){
            
        li.classList.add('nav-button');
    }
    container.appendChild(li);
}
navList.appendChild(container);
navegation.appendChild(navList);
document.querySelector('.head-container').appendChild(navegation);
}

//Call Creating the navbar links dynamically function; 

createTheNavBar();

//Asign an eventlistener for all the navbar links to toggle the active class when clicking 

document.querySelectorAll('nav li').forEach(li =>li.addEventListener('click' , (e)=>{
    const allNavLink= Array.from(e.target.parentNode.children);
    allNavLink.forEach(el => el.classList.remove('active'));
    e.target.classList.add('active');

    //Adding the functionality to scroll to the section selected when clicking on the navbar icon related to that section

    const sectionSelection =document.querySelector(`section[data-set="${e.target.textContent}"]`);
    document.body.scrollTop = sectionSelection.offsetTop;
    document.documentElement.scrollTop = sectionSelection.offsetTop;
})
);

//Adding the functionality to switch between the team member's name and job title when hovering on his card

teamCards.forEach(card => {
    
    card.onmouseenter = (e)=>{
       e.target.children[1].classList.add('switch-nameoff');
       e.target.children[0].classList.remove('switch-nameoff');
    }
    card.onmouseleave = (e)=>{
        e.target.children[1].classList.remove('switch-nameoff');
        e.target.children[0].classList.add('switch-nameoff');
    }
});

//scroll to top function

const scrollToTopHandle = () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    
}


//Adding the scroll to top function  to the scrolling to top button

scrollToTopButton.addEventListener('click' , scrollToTopHandle)

///Adding the scroll to top function  to the logo icon

logo.addEventListener('click' , scrollToTopHandle)

//On scrolling show  the scrolling to top button after a certain length  && adding a dynamic effect to the nav bar

const showingTheScrollToTopHandle =()=>{
    header.classList.toggle('back' , window.scrollY > 0);
    header.classList.remove('hide');
    
    if(document.body.scrollTop > 600 || document.documentElement.scrollTop > 600){
        scrollToTopButton.classList.add('scrolling-button-show');
    }else{
        scrollToTopButton.classList.remove('scrolling-button-show');
    }

    //putting all the sections into array to loop on it 

    const sectionSelection =document.querySelectorAll('section');

    sectionSelection.forEach(sec => {

        //assign the active class according to the current section in the view

        if(window.pageYOffset >= sec.offsetTop - 200){
            document.querySelectorAll('nav li').forEach(li =>{
                allNavLink= Array.from(li.parentNode.children);
                if(li.textContent === sec.dataset.set){
                    allNavLink.forEach(el => el.classList.remove('active'));
                    li.classList.add('active');
                }
            })
        }
    })

    
}


window.onscroll = showingTheScrollToTopHandle;
