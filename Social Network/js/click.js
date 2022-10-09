   


function myBeastFriends() {
    let element = document.querySelector("#myFriends")
    element.classList.remove("sidebarright");
    document.querySelector("#myFriends").style.display = "grid";; 
    document.querySelector(".mainnotfixed").style.display = "none";
    document.querySelector(".leftfixed").style.display = "none"

}



document.querySelector("#myProfile").addEventListener("click", myProfil) 
function myProfil() {
    document.querySelector(".mainnotfixed").style.display = "none";
            document.querySelector("#myFriends").style.display = "none";
            document.querySelector(".leftfixed").style.display = "block"
}

function homePage() {
    document.querySelector(".mainnotfixed").style.display = "block";
    document.querySelector("#myFriends").style.display = "none";
    document.querySelector(".leftfixed").style.display = "none" 

}


setInterval(function(){
    let width = window.innerWidth;
    if(width  > 649 && width < 655) { 
        window.location.reload();
    }
}, 100); 


setInterval(function(){
    let width = window.innerWidth;
    if(width  > 649 && width < 655) { 
        window.location.reload();
    }
    if(width  > 780 && width < 785) { 
        window.location.reload(); 
    }
}, 100); 




    // if(width  > 930 && width < 650) { 
    //     document.querySelector(".mainnotfixed").style.display = "block";
    //     document.querySelector(".leftfixed").style.display = "none"  
    // }
    // // if(width  > 780 && width < 650) { 
    //     document.querySelector(".mainnotfixed").style.display = "block";
    //     document.querySelector(".leftfixed").style.display = "none"  
    // }
// var h = window.innerHeight;

