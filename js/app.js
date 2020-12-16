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

    //adding the textcontent to the Li from the dataset related to the section itself

        li.textContent = allTheSections[i].dataset.set;

        if(i === allTheSections.length-1){

        li.classList.add('nav-button');
    }

    //append the li list to the documentfragment for preformance imporve

    container.appendChild(li);
}

//append the navbar to the ul list and then append them to the header container in the html document 

navList.appendChild(container);
navegation.appendChild(navList);
document.querySelector('.head-container').appendChild(navegation);
}

//Call Creating the navbar links dynamically function; 

createTheNavBar();

//Asign an eventlistener for all the navbar links to toggle the active class when clicking 

document.querySelectorAll('nav li').forEach(li =>li.addEventListener('click' , (e)=>{
    //get all the links siblings into an array so you can loop over it 

    const allNavLink= Array.from(e.target.parentNode.children);

    //loop over all the links and remove the class active from it 

    allNavLink.forEach(el => el.classList.remove('active'));

    //add the class active to the link that is being clicked only 

    e.target.classList.add('active');

    //Adding the functionality to scroll to the section selected when clicking on the navbar icon related to that section

    //getting the section related to the link that will be clicked by queryselector it by the data-set of the section as they are equal to the textcontent of the li elements
   
    const sectionSelection =document.querySelector(`section[data-set="${e.target.textContent}"]`);

    //make the document scrolltop value ==  to the offsettop of the section selected by its data-set
    
    document.body.scrollTop = sectionSelection.offsetTop;
    document.documentElement.scrollTop = sectionSelection.offsetTop;
})
);


//scroll to top function this will make the scroll top  = 0 

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

    //showing the scroll to top button when the scroll top is over 600 (this value can be changed)
    
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

//extra feature above the required in the udacity project 1

//this ability let the user switch between the name and the profession of the team memeber when hovering on the team member card

//Adding the functionality to switch between the team member's name and job title when hovering on his card

teamCards.forEach(card => {

    //getting the css classes and switch between them regarding the two children that contains both the team member name and team member profession
    card.onmouseenter = (e)=>{
       e.target.children[1].classList.add('switch-nameoff');
       e.target.children[0].classList.remove('switch-nameoff');
    }
    card.onmouseleave = (e)=>{
        e.target.children[1].classList.remove('switch-nameoff');
        e.target.children[0].classList.add('switch-nameoff');
    }
});