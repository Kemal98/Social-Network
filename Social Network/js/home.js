
let session = new Session();
session_id = session.getSession();

if(session_id !== "") {
    let user = new User();
    user.get(session_id)
}
else {
    window.location.href  = "/"
}






document.querySelector("#logout").addEventListener("click", e => {
    e.preventDefault();
    document.cookie = "user_id" + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    window.location.href = "/";
})




document.querySelector("#viewall").addEventListener("click", () => {
    document.querySelector(".custom-modal").style.display = "block"
})    

document.querySelector("#closeModal").addEventListener("click", () =>  {
    document.querySelector(".custom-modal").style.display = "none"
})    



// document.querySelector("#friends_list").addEventListener("click", () => {
//     document.querySelector(".container").style.display = "none"
// })    

// document.querySelector("#home_page").addEventListener("click", () =>  {
//     document.querySelector(".container").style.display = "block"
// })    







document.querySelector("#editProfile").addEventListener("click", (e) => {
   e.preventDefault(); 
   
   let user = new User()
   user.firstName = document.querySelector("#_first_name").value
   user.lastName = document.querySelector("#_lastName").value
   user.country = document.querySelector("#_country").value
   user.email = document.querySelector("#_email").value
   user.password = document.querySelector("#_password").value
   user.edit();
})   


// Photo 
document.querySelector("#myFileInput").addEventListener("change", async function () {

    console.log(this.files);
    const reader = new FileReader();
    reader.addEventListener('load', async () => {
    localStorage.setItem("recent-image", reader.result);
     let photoLoad = localStorage.getItem("recent-image")
     let postLoadPhoto = document.querySelector("#postLoadPhoto");
     postLoadPhoto.innerHTML = `
        <img id="load2" class="postimg" src="${photoLoad}"/>
    `
    })
     reader.readAsDataURL(this.files[0]);
 })

 
// Photo
 document.querySelector("#photo_profile").addEventListener("change", async function () {


    const reader = new FileReader();
    reader.addEventListener('load', async () => {
    localStorage.setItem("photo-profile", reader.result);
    
    })

     reader.readAsDataURL(this.files[0]);
 })


   


 document.querySelector(".photo_add_profile").addEventListener("click", () => {

  let photo_profile = localStorage.getItem("photo-profile");

  document.querySelector("#img_profile").setAttribute("src", photo_profile);
  document.querySelector("#user_img").setAttribute("src", photo_profile);
  document.querySelector(".comments_img").setAttribute("src", photo_profile);
  




  let namePost = document.querySelector("#namePost").innerText
  let name  = document.querySelector("#nameValue").innerText



 if(namePost == name) {
    document.querySelector(".userimgSrc").setAttribute("src", photo_profile);
 }

 let userPhotoAll = document.querySelectorAll(".userimgSrc")
console.log(userPhotoAll)
  
 })




document.querySelector("#deleteProfile").addEventListener("click", (e) => {
    e.preventDefault(); 

    if(confirm("Are you sure you want to delete your profile?") === true) {
        let user = new User(session_id)
        user.delete()
    }
}) 

let deletePostHtml = "";





   document.querySelector("#postmypost").addEventListener("click", e => {
    e.preventDefault();

    let postLoadPhoto = document.querySelector("#postLoadPhoto");
    postLoadPhoto.innerHTML = "";

    async function createPost() {
        let content = document.querySelector("#mypara").value;
        document.querySelector("#mypara").value = "";
        // photo add post
        let photoLink = localStorage.getItem("recent-image")
        //    
        let photo_profile = localStorage.getItem("photo-profile")
     
           
        let post = new Post();
        post.post_content = content;
        post = await post.create();

     
        let current_user = new User();
        current_user = await current_user.user_add(session_id);
        console.log(current_user)

        let deletePostHtml = "";
      
         
        let html = document.querySelector(".allpost").innerHTML;
        
        if(session_id === post.user_id) {
          deletePostHtml = `<a class = "remove-btn" onclick = "removeMyPost(this)"><span class="fa fa-trash-o" aria-hidden="true"></span>Remove<a>`
    
        }

       document.querySelector(".allpost").innerHTML =`
         
    <div class="mainpost" data-post-id="${post.id}" >
     <div class="userimg"><img class="userimgSrc" src="${photo_profile}"/>
       </div>
       <div class="username">	
       <p id="nameVal" class="name">${current_user.firstName +" "+ current_user.lastName}</p>
       </div>
       <p class="time">2min ago</p>
        <p class="quotes">
           ${post.content}
       </p>
       <div class="post">
           <img class="postimg" src="${photoLink}"/>
       </div>

         <div class="likedislike">
         <span class="fa fa-thumbs-up"> ${post.likes}</span>
        </div>         
        <div class="post-action">
              <div>
              <a onclick="likePost(this)" class="likePostJs like-btn">Like<span class="faa fa-thumbs-up">${post.likes}</span></a>
              <a class="comment-btn"  src="${photo_profile}" onclick="commentPost(this)">Comment<span class="faa fa-commenting" aria-hidden="true"></span></a>
              ${deletePostHtml}
         </div>
       </div>


      <div class="post-comments">
        <form>
          <img class="comments_img" src="../profile/upload1.png"/>
          <input type="text" placeholder="comment">
          <button onclick="commentPostAd(event)">Comment</button>
        </form>

     </div>
   </div>
  `
       +html;
    }  
    createPost();
})



async function getAllPost () {
    let all_post = new Post() 
    all_post = await all_post.getAllPost();  
   
    all_post.forEach(post => {
    
        async function getPostUser () {

        let user = new User();
        user = await user.user_add(post.user_id)
        

        let comment = new Comment();
        comment = await comment.get(post.id);


        let comment_html = "";
        if(comment.length > 0){
            comment.forEach(comment => {
               comment_html += 
              `<div class="single-comment">
               <img class="comments_img" src="../profile/upload1.png"/>
               <div>
               <p>${comment.frstName +" "+ comment.lastName}</p>
               <span>${comment.content}</span>
               </div>
               </div>
                `
            })
        }

        let deletePostHtml = "";

        if(session_id === post.user_id) {
          deletePostHtml = `<a class = "remove-btn" onclick = "removeMyPost(this)"><span id ="fa" class="fa fa-trash-o" aria-hidden="true"></span>Remove<a>`
        }

        let html = document.querySelector(".allpost").innerHTML;
        document.querySelector(".allpost").innerHTML = `  
        <div class="mainpost" data-post-id="${post.id}">
        <div class="userimg"><img  class="userimgSrc" src="../profile/upload1.png"/>
        </div>
        <div class="username">	
        <p id="nameValue" class="name">${user.firstName + ' ' + user.lastName}</p>
        </div>
        <p class="time">2min ago</p>
        <p class="quotes">
            ${post.content}
        </p>
        <div class="post">
            <img class="postimg" src="../login/network society.jpg"/>
        </div>
 
        <div class="likedislike">
            <p class="like">
          <span class="fa fa-thumbs-up">${post.likes}</span>
            </p>
        </div>         
         <div class="post-action">
               <div>
               <a onclick="likePost(this)" class="likePostJs like-btn">Like<span class="faa fa-thumbs-up">${post.likes}</span></a>
               <a class="comment-btn" onclick="commentPost(this)">Comment<span class="faa fa-commenting" aria-hidden="true"></span></a>             
               ${deletePostHtml}
          </div>
        </div>
 
 
       <div class="post-comments">
       <form>
           <img class="comments_img" src="../profile/upload1.png"/>
           <input type="text" placeholder="Add comment!">
           <button onclick="commentPostAd(event)">Comment</button>
           </form>
           ${comment_html}
           </div>
   </div>
   `
   +html
       };
       getPostUser();
    });

}

getAllPost();

 
async function commentPostAd (e){
    e.preventDefault()

    let btn = e.target;
    btn.setAttribute('disabled','true');

    let main_post_El = btn.closest('.mainpost');
    let post_id =  main_post_El.getAttribute('data-post-id');

    let commentValue = main_post_El.querySelector("input").value;
    
    // let user = new User();
    // user.get(session_id)

    let user = new User();
    user = await user.user_add(session_id)
   
    let firstName = user.firstName;
    let lastName = user.lastName; 

    let comment = new Comment();
    comment.user_id = session_id;
    comment.content = commentValue;
    comment.post_id = post_id;
    comment.firstName = firstName
    comment.lastName = lastName
    comment.create();

    
    let photo_profile = localStorage.getItem("photo-profile")


    main_post_El.querySelector("input").value = "";
    main_post_El.querySelector('.post-comments').innerHTML += ` 
    <div class = "single-comment">
    <img class="comments_img" src="${photo_profile}"/>
    <div>
    <p>${comment.firstName +" "+ comment.lastName}</p>
    <span>${comment.content}</span>
    </div>
    </div>
    `;
    
}

const commentPost = btn => {
    let main_post_El = btn.closest('.mainpost');
    let post_id = main_post_El.getAttribute('data-post-id')
    main_post_El.querySelector(".post-comments form").style.display = "flex";
    // main_post_El.querySelector(".comment-btn").style.display = "none";
}



const removeMyPost = btn => {
    if(confirm("Are you sure you want to delete this post?") === true) {
        let post_id = btn.closest('.mainpost').getAttribute("data-post-id");
        btn.closest(".mainpost").remove();
        let post = new Comment();
        post.delete(post_id);
    }
}




const likePost = btn => {
    let main_post_El = btn.closest('.mainpost')
    let post_id =  btn.closest('.mainpost').getAttribute("data-post-id");
    let number_of_like = btn.querySelector('span').innerText;

    let number_post_lik = parseInt(number_of_like)
    console.log(number_of_like)
    btn.querySelector('span').innerText = number_post_lik + 1
    
    btn.setAttribute('disabled','true')

    let post = new Comment()
    post.like(post_id, number_post_lik +1 )
}



async function getAll () {
     
    let user = new User();
    user = await user.getUserAll()
 
    user.forEach((post) => { 
        let firstName = post.firstName;
        let lastName = post.lastName;
 
        let sideBar = document.querySelector(".sidebarright");
        let myFriend = document.querySelector("#myFriends");
        console.log(firstName + " " +  lastName)
        sideBar.innerHTML += ` 
      <div class="rightcontent">
        <img src="../profile/other_profile.png"/>
        <p class="name">${firstName + " " + lastName}</p>
      </div>
        `
    
        myFriend.innerHTML += ` 
      <div class="rightcontent">
        <img src="../profile/other_profile.png"/>
        <p class="name">${firstName + " " + lastName}</p>
      </div>
        `
    })

}

getAll();



// Friends List all


