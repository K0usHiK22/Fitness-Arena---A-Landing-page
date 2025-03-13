// JAVASCRIPT FOR THE WEBSITE TO MAKE IT INTERACTIVE

// -----------------------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
    console.log("javascript")

// popupform contents

const popupform = document.querySelector(".popup-form")
const submitbtn = document.querySelector(".submit-btn")
const joinusbtn = document.querySelector(".join-us button")
const closebtn = document.getElementById("closeBtn")
const innercontent = document.querySelector(".hero-inner-content")
const forminputs = document.querySelectorAll(".popup-form input")

// nutrition data content

const nutritionData = document.getElementById("data-of-nutrition")
const nutritionclosebtn = document.querySelector(".nutrition-close-btn")
const nutritionbtn = document.querySelector(".check")
const nutritionform = document.querySelector(".nutrition-holder")
const checknutrition = document.getElementById("nutrition-btn")
const fooditem = document.getElementById("fooditem")
const enrollform = document.getElementById("enrollform")
const enrollbtn = document.querySelector(".Enroll-btn")
const enolledbtn = document.querySelector(".Enrolled-btn")
const enrollsubmit = document.querySelector("#enrollform .submit-btn")
const closeenroll = document.querySelector("#enrollform .close-btn")
const enrollforminputs = document.querySelectorAll("#enrollform input")
const enrollinner = document.querySelector(".only-nutrition")

// Plans content

const registerbtns = document.querySelectorAll(".register-btn button")

// hamburger content

const menuIcon = document.getElementById("menu-icon");
const navBar = document.getElementById("navigation-bar");
const hamburger = document.querySelector(".hamburger");
const closeIcon = document.querySelector(".close-icon");
// -------------JS---------------------------------------------------------------

// ACTUAL JAVASCRIPT STARTS FROM HERE

// logic to display form

let currentbutton = null

function displayform(){
    registerbtns.forEach(button =>{
        button.addEventListener("click", ()=>{
            popupform.classList.add("popupform")
            currentbutton = button
        })
    })
    closebtn.addEventListener("click", ()=>{
        popupform.classList.remove("popupform")
    })

   window.addEventListener("click", (e)=>{
    if (e.target === popupform) {
        popupform.classList.remove("popupform")
    }
   }) 
   submitbtn.addEventListener("click", (event)=>{
        event.preventDefault()
        let allfilled = true

        forminputs.forEach(input => {
            if (input.value.trim() === "") {
                alert(`you cant leave it empty`)
                allfilled = false
            }              
        });

        if (allfilled && currentbutton) {
            popupform.classList.remove("popupform")
            
            const parentdiv = currentbutton.closest(".pricing")
            const registeredbutton = parentdiv.querySelector(".registered-btn button")

            currentbutton.style.display = "none";
            registeredbutton.style.display = "block";

            forminputs.forEach(input => input.value = "")
        }
   })
}

// Function for scrolling into plans when join-us button is clicked

function scrolltoPlans() {
    document.querySelector(".join-us button").addEventListener("click", function () {
        document.getElementById("Plans").scrollIntoView({ behavior: "smooth" });
    });
}


// logic to display checknutrition box

function checkNutrition(){
    nutritionbtn.addEventListener("click", ()=>{
        nutritionform.classList.add("nutritionform")
    })
    nutritionclosebtn.addEventListener("click", () =>{
        nutritionform.classList.remove("nutritionform")
        nutritionData.style.display = "none"
        fooditem.value = "" 
        nutritionData.innerHTML = ""
        
    })
    checknutrition.addEventListener("click", async ()=>{
        let food = fooditem.value.trim()
        if (food === "") {
            alert("enter any food item inn box")
            return
        }

        nutritionform.classList.add("nutritionform")
        nutritionData.style.display = "block"
        await FetchNutrition(food)
        
    })

    // Enrollment code block in nutrition section

    enrollbtn.addEventListener("click", ()=>{
        enrollform.classList.add("popupform")
    })
    closeenroll.addEventListener("click", ()=>{
        enrollform.classList.remove("popupform")
    })

   window.addEventListener("click", (e)=>{
    if (e.target === enrollform) {
        enrollform.classList.remove("popupform")
    }
   }) 
   enrollsubmit.addEventListener("click", (event)=>{
        event.preventDefault()
        let allfilled = true

        enrollforminputs .forEach(input => {
            if (input.value.trim() === "") {
                alert(`you cant leave it empty`)
                allfilled = false
            }              
        });

        if (allfilled) {
            enrollform.classList.remove("popupform")
            enrollinner.classList.add("enrolledbtn")
            enrollinner.classList.remove("enrollbtn")
    
            enrollbtn.style.display = "none"; 
            enolledbtn.style.display = "block"
        }     
   })
}   

// logic for fetching API provided by APi ninjas from Rapid API

const Apikey ='37d5d8328amsh24fe57927be5978p16d286jsn9db52563f1d4' 
const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': Apikey,
        'x-rapidapi-host': 'nutrition-by-api-ninjas.p.rapidapi.com'
    }
    
}

async function FetchNutrition(food) {
    const url = `https://nutrition-by-api-ninjas.p.rapidapi.com/v1/nutrition?query=${food}`;

    let response = await fetch(url, options)
    let data = await response.json()
    console.log(data)

    if (data.length > 0) {
        nutritionData.innerHTML =`
        <p>Food: ${data[0].name}</p>
        <p>calories: ${data[0].calories}g</p>
        <p>protein: ${data[0].protein_g}g</p>
        <p>fat: ${data[0].fat_total_g}g</p>
        <p>carbohydrates: ${data[0].carbohydrates_total_g}g</p>
    `   
    }else{
        nutritionData.style.visibility = "visible"
        nutritionData.innerHTML = "<p>No data found.</p>"

    } 
}

// Code block for Hamburger menu which appears in certain pixels

menuIcon.addEventListener("click", () => {
    navBar.classList.toggle("active");

    if (navBar.classList.contains("active")) {
        hamburger.classList.add("hide");  // Hide hamburger
        closeIcon.classList.add("show");  // Show close icon
    } else {
        hamburger.classList.remove("hide"); // Show hamburger
        closeIcon.classList.remove("show"); // Hide close icon
    }
});


// text animation for automatic text generating

    if (typeof Typed !== "undefined") {
        const typed = new Typed('.multiline', {
            strings: ['GET FIT', 'STAY HEALTHY', 'STAY MOTIVATED', 'STAY FIT', 'STAY STRONG', 'FAT LOSS', "STRENGTH TRAINING", 'NUTRITION COURSE'],
            typeSpeed: 65,
            backDelay: 1000,
            loop: true,
        });
    } else {
        console.error("Typed.js is not loaded!");
    }

// Main function where the whole code is executed

async function main(){

   await FetchNutrition()
    displayform()
    checkNutrition()
    scrolltoPlans()
}

main()
})

// END OF JAVASCRIPT

// FEEL FREE TO CONTACT ME FOR THE USE OF CODE
// FEEL FREE TO RE-EDIT THE CODE AS YOU DESIRE 

