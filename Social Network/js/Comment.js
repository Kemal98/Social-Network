class Comment {
      post_id  = "";
      user_id = "";
      content = "";
      firstName = "";
      lastName = "";
      api_url = "https://62cd63d5066bd2b69924c7ad.mockapi.io";
    
         
    create() {
        let data = {
            post_id:this.post_id,
            user_id:this.user_id,
            frstName:this.firstName,
            lastName:this.lastName,
            content:this.content
        }

        data = JSON.stringify(data)
       fetch(this.api_url + '/comments', {
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:data 
       })
       .then(response => response.json())
       .then(data => {
        console.log(data)
        // let session = new Session();
        // session.user_id = data.id;
        // session.startSession();
       })
    }
   async get(post_id) {
        let response = await fetch(this.api_url + '/comments');
        let data = await response.json();

        let post_comments = [];
        let i = 0;
        data.forEach(item => {
            if(item.post_id === post_id){
                post_comments[i] = item;
                i++
            }
        });
        return post_comments
     }

     delete(post_id) {
          
            fetch(this.api_url + '/posts/' + post_id, {
                method: "DELETE" 
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                // let idData = data.id
            })
     }

     like(post_id, likes) {
        let data = {
            likes:likes,
        }

        data = JSON.stringify(data)
        fetch(this.api_url + '/posts/' + post_id, {
            method: "PUT",
            headers:{ 
            "Content-Type": "application/json" 
         },
         body:data
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            // let idData = data.id
        })
     }
}