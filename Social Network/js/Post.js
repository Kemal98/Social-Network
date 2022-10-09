class Post {
    post_id = "";
    post_content = "";
    user_id = "";
    likes = "";
    image_url = "";
    api_url = "https://62cd63d5066bd2b69924c7ad.mockapi.io";


    async create() {
        let session = new Session();
        session_id = session.getSession();
        
        let data = {
        user_id: session_id,
        content: this.post_content,
        photo: this.image_url,
        likes: 0   
        }

        data = JSON.stringify(data);
        console.log(data)
        let response = await fetch(this.api_url + "/posts", {
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body:data
        });
        data = await response.json()
        console.log(data)
        return data;
    }

    async getAllPost() {
        let response = await fetch(this.api_url + '/posts');
        let data = await response.json();
        return data;
    }
}