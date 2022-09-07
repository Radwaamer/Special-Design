// close all windows by clicking on free space
document.querySelector("body").onclick=(e)=>{
    if((e.target.classList!="bars") && (e.target.classList!="gear") && (e.target.tagName!="path") && (e.target.tagName!="svg")){
        document.querySelector(".menu").classList.remove("open");
        document.querySelector(".menu .gear .fa-gear").classList.remove("fa-spin");
        header.classList.remove("mini");
        document.querySelector(".menu .gear").style.display="block";
    }
}


// change landing background randomly
let changeBKground=true;
let backgroundChoice=localStorage.getItem("backgroundChoice");
let choices=document.querySelectorAll(".menu .backgrounds .choose button");
if(backgroundChoice!=null){
    choices.forEach((c)=>{
        c.classList.remove("active");
    });
    if(backgroundChoice=="true"){
        changeBKground=true;
        document.querySelector(".menu .backgrounds .choose [data-choice='yes']").classList.add("active");
    }
    else{
        changeBKground=false;
        document.querySelector(".menu .backgrounds .choose [data-choice='no']").classList.add("active");
    }
}

let landing = document.querySelector(".landing");
let imgs= [];
for(let i=1;i<10;i++){
    imgs.push(`0${i}.jpg`);
}

let bkgroundInterval;
function change(){
    bkgroundInterval=setInterval(()=>{
        let randomNumber = Math.floor(Math.random()*imgs.length);
        landing.style.backgroundImage=`url(../imgs/${imgs[randomNumber]})`;
    },7000);
}
if (changeBKground){
    change();
}

choices.forEach((ch)=>{
    ch.addEventListener("click",()=>{
        choices.forEach((c)=>{
            c.classList.remove("active");
        });
        ch.classList.add("active");
        if(document.querySelector(".menu .backgrounds .choose .active").dataset.choice=="yes"){
            changeBKground=true;
            setTimeout(()=>{
                let randomNumber = Math.floor(Math.random()*imgs.length);
                landing.style.backgroundImage=`url(../imgs/${imgs[randomNumber]})`;
            },1000);
            change();
        }else{
            changeBKground=false;
            clearInterval(bkgroundInterval);
        };
        localStorage.setItem("backgroundChoice",changeBKground);
    });
})


// spin icon in landing page and open menu
document.querySelector(".menu .gear").addEventListener("click", function(e){
    document.querySelector(".menu .gear .fa-gear").classList.toggle("fa-spin");
    document.querySelector(".menu").classList.toggle("open");
});


// change the main color of website
let colors =document.querySelectorAll(".menu .colors ul li");
let color=localStorage.getItem("color");
if(color!=null){
    document.documentElement.style.setProperty("--main-color",color);
    colors.forEach(li=>{
        li.classList.remove("active");
        if(li.dataset.color==color){
            li.classList.add("active");
        }
})
}

colors.forEach(li=>{
    li.addEventListener("click",(e)=>{
        document.documentElement.style.setProperty("--main-color",e.target.dataset.color);
        if (li.classList!="active"){
            colors.forEach(color=>{
                color.classList.remove("active");
            })
        }
        li.classList.add("active");
        localStorage.setItem("color",e.target.dataset.color);
    });
});


// our skills progress
let skills= document.querySelectorAll(".skills .languages .lang div span");
let ourSkills=document.querySelector(".skills")
window.onscroll=()=>{
    if(window.scrollY >=(ourSkills.getBoundingClientRect().top+(ourSkills.getBoundingClientRect().height/2)) && window.scrollY <=(ourSkills.getBoundingClientRect().bottom+(ourSkills.getBoundingClientRect().height*2))){
        skills.forEach(skill=>{
            skill.style.width=skill.dataset.progress;
        })
    }else{
        skills.forEach(skill=>{
            skill.style.width=0;
        })
    }
}


//our gallery images
let images= document.querySelectorAll(".gallery .container .images img");
images.forEach((image) => {
    image.addEventListener("click", ()=>{
        let layout=document.createElement("div");
        layout.style.cssText="position: fixed;top: 0;left: 0;width: 100%;height: 100%;background-color: rgba(51, 51, 51, 0.75);z-index: 1000;"
        document.body.appendChild(layout);
        let popUp = document.createElement("div");
        popUp.style.cssText="position: fixed;left: 50%;top: 50%;transform: translate(-50% , -50%);z-index: 1000; background-color: white;padding: 20px;";
        document.body.appendChild(popUp);
        let heading=document.createElement("h3");
        heading.textContent=image.alt;
        heading.style.cssText="color: var(--main-color);text-align: center;"
        popUp.appendChild(heading);
        let popImg = document.createElement("img");
        popImg.src=image.src;
        popImg.style.cssText="width: 550px;"
        popUp.appendChild(popImg);
        let exit= document.createElement("div");
        exit.innerHTML='X';
        exit.style.cssText="color: white;position: absolute;top: -14px;right: -14px;font-size: 25px;font-weight: bold;background-color: var(--main-color);border-radius: 50%;width: 40px;height: 40px;display: flex;align-items: center;justify-content: center;cursor: pointer;transition: var(--main-transion);";
        popUp.appendChild(exit);
        function remv(){
            popUp.remove();
            layout.remove();
        }
        exit.addEventListener("click",remv);
        exit.addEventListener("mouseenter",()=>{
            exit.style.color="black";
        });
        exit.addEventListener("mouseleave",()=>{
            exit.style.color="white";
        });
        layout.addEventListener("click",remv)
    })
})


//bullets moves
let bullets = document.querySelectorAll(".bullets div");
bullets.forEach((bullet)=>{
    bullet.addEventListener("click",(e)=>{
        document.querySelector(e.target.dataset.move).scrollIntoView({behavior:'smooth'});
    });
});


//header show
let bars=document.querySelector("header .container .bars");
let header=document.querySelector("header .container ul");
bars.onclick=function(){
    header.classList.toggle("mini");
    document.querySelector(".menu .gear").style.display="none";
}
let maxWidth=window.matchMedia("(min-width: 992px)");
function resize(maxWidth){
    if(maxWidth.matches){
        header.classList.remove("mini");
        document.querySelector(".menu .gear").style.display="block";
    }
}
maxWidth.addListener(resize);
resize(maxWidth);