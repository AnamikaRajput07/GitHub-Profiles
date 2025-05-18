const url = "https://api.github.com/users/";

const input=document.querySelector("[data-input]");
const form=document.querySelector(".searchBar");
const btn=document.querySelector(".searchbtn");
const wrapper=document.querySelector("body");
const searchbar=document.querySelector(".searchBar");
const userInfo=document.querySelector(".userInfo");
const file=document.querySelector("[data-files]");

// event listener when user clicks button
btn.addEventListener('click',() => {
    if(input.value !== ""){
        getUserData(url+input.value);
    }
});

// event listener when user press enter
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(e.key==='Enter'){
        if(input.value !== ""){
            console.log("keyeventlistener");
            getUserData(url+input.value);
        }
    }
});

async function getUserData(gitUrl){

    const response=await fetch(gitUrl);
    const data=await response.json();

    if(!data) 
        throw new Error("Data is missing or invalid");

    updateProfile(data);
}

let dateSegment;
const noResults=document.querySelector("#noResults");

function updateProfile(data){

    noResults.style.scale = 0;
    if (data.message !== "Not Found") {
        function checkNull(apiItem, domItem) {
            if (apiItem === "" || apiItem === null) {
                // domItem.style.opacity = 0.5;
                // domItem.previousElementSibling.style.opacity = 0.5;
                return false;
            }
            else {
                return true;
            }
        }

        const image=document.querySelector("[data-img]");
        const usernm=document.querySelector("[data-username]");
        const profilenm=document.querySelector("[data-profilename]");
        const joining=document.querySelector("[data-joined]");
        const bio=document.querySelector("[data-bio]");
        const repos=document.querySelector("[data-repos]");
        const followers=document.querySelector("[data-followers]");
        const following=document.querySelector("[data-following]");
        const location=document.querySelector("[data-location]");
        const link=document.querySelector("[data-link]");
        const twitter=document.querySelector("[data-twitter]");
        const org=document.querySelector("[data-org]");
        const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        image.src=`${data.avatar_url}`;
        usernm.innerText=`@${data?.login}`;
        usernm.href = data?.html_url;
        profilenm.innerText=data?.name;
        dateSegment = data?.created_at.split("T").shift().split("-");
        joining.innerText=`Joined ${dateSegment[2]} ${month[dateSegment[1] - 1]} ${dateSegment[0]}`;
        bio.innerText=(data?.bio === null) ? "This Profile has no Bio" : data?.bio;

        repos.innerText = data?.public_repos;
        repos.href = data?.repos_url;
        followers.innerText = data?.followers;
        followers.href = data?.followers_url;
        following.innerText = data?.following;
        following.href = data?.following_url;

        location.innerText=checkNull(data?.location, location) ? data?.location : "Not Available";
        
        link.innerText=checkNull(data?.blog, link) ? data?.blog : "Not Available";
        link.href = checkNull(data?.blog, link) ? data?.blog : "#";

        twitter.innerText=checkNull(data?.twitter_username, twitter) ? data?.twitter_username : "Not Available";
        twitter.href = checkNull(data?.twitter_username, twitter) ? `https://twitter.com/${data?.twitter_username}` : "#";

        org.innerText=checkNull(data?.company, org) ? data?.company : "Not Available";

    }
    else{
        noResults.style.scale = 1;
        setTimeout(() => {
            noResults.style.scale = 0;
        }, 2500);
    }
}

const dark=document.querySelector(".dark");
const light=document.querySelector(".light");
const root = document.documentElement.style;
let darkMode=false;

function darkmode(){
    root.setProperty("--lm-bg", "#141D2F");
    root.setProperty("--lm-bg-content", "#1E2A47");
    root.setProperty("--lm-text", "white");
    root.setProperty("--lm-text-alt", "white");
    root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");
    dark.style.scale=0;
    light.style.scale=1;
    localStorage.setItem("dark-mode",true);
}

function lightmode(){
    root.setProperty("--lm-bg", "#F6F8FF");
    root.setProperty("--lm-bg-content", "#FEFEFE");
    root.setProperty("--lm-text", "#4B6A9B");
    root.setProperty("--lm-text-alt", "#2B3442");
    root.setProperty("--lm-shadow-xl", "rgba(70, 88, 109, 0.25)");
    light.style.scale=0;
    dark.style.scale=1;
    localStorage.setItem("dark-mode",false);
}


// check user preference for dark mode
const prefersDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
// Check if there is a value for "dark-mode" in the user's localStorage
if (localStorage.getItem("dark-mode") === null) {
    // If there is no value for "dark-mode" in localStorage, check the device preference
    if (prefersDarkMode) {
        // If the device preference is for dark mode, apply dark mode properties
        darkmode();
    } else {
        // If the device preference is not for dark mode, apply light mode properties
        lightmode();
    }
} else {
    // If there is a value for "dark-mode" in localStorage, use that value instead of device preference
    if (localStorage.getItem("dark-mode") === "true") {
        // If the value is "true", apply dark mode properties
        darkmode();
    } else {
        // If the value is not "true", apply light mode properties
        lightmode();
    }
}


getUserData(url + "priyansh70");