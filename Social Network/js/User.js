
class User {
    user_id = "";
    firstName = "";
    lastName = "";
    country = "";
    email = "";
    password = "";
    api_url = "https://62cd63d5066bd2b69924c7ad.mockapi.io";

 
    create() {
        let data = {
            firstName: this.firstName,
            lastName: this.lastName,
            country: this.country,
            email: this.email,
            password: this.password
        }

        data = JSON.stringify(data)

        fetch(this.api_url + '/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                let session = new Session();
                session.user_id = data.id;
                session.startSession();
                window.location.href = 'home.html'
            })
    }


    
    async get(user_id) {
        let api_url = this.api_url + '/users/' + user_id;
        let response = await fetch(api_url)
        let data = await response.json();
        return data;
    }


    get(user_id) {
        let api_url = this.api_url + '/users/' + user_id

        fetch(api_url)
            .then(response => response.json())
            .then(data => {
               let firstName =  document.querySelector("#sidename").innerText = data['firstName'];
                document.querySelector("#country").innerText = data['country'];
                let lastName  = document.querySelector("#lastName").innerText = data['lastName'];
                document.querySelector("#email_").innerText = data['email'];

                document.querySelector("#namePost").innerText = firstName + ' ' + lastName;
                // Edit User
                document.querySelector("#_first_name").value = data['firstName'];
                document.querySelector("#_lastName").value = data['lastName'];
                document.querySelector("#_country").value = data['country'];
                document.querySelector("#_email").value = data['email'];
                document.querySelector("#_password").value = data['password'];
            })
            
            
    }


    async getUserAll() {
        let api_url = this.api_url + '/users';
 
         let response = await fetch(api_url)
         let data = await response.json();
 
         return data;
    }


    async user_add(user_id) {
        let api_url = this.api_url + '/users/' + user_id;
        let response = await fetch(api_url)
        let data = await response.json();
          return data;
    }



    edit() {
        let data = {
            firstName: this.firstName,
            lastName: this.lastName,
            country: this.country,
            email: this.email,
            password: this.password
        }
        data = JSON.stringify(data);
        let session = new Session();
        session_id = session.getSession();

        fetch(this.api_url + '/users/' + session_id, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                window.location.href = "home.html"
            })
    }


    login() {
        fetch(this.api_url + '/users')
            .then(response => response.json())
            .then(data => {
                console.log(this.email);

                let login_successful = 0;

                data.forEach(user_db => {
                    if (user_db.email === this.email && user_db.password === this.password) {

                        let session = new Session()
                        session.user_id = user_db.id;
                        session.startSession();
                        login_successful = 1;
                        window.location.href = 'home.html';
                    }
               
                });
                if (login_successful === 0) {
                    alert("Vasi podaci nistu tacno uneseni!");
                }
            })
    }

    
    delete() {
        let session = new Session();
        session_id = session.getSession();

        fetch(this.api_url + '/users/' + session_id, {
            method: "DELETE"
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                // let idData = data.id
                document.cookie = "user_id" + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                window.location.href = "/";
            })
    }
}


