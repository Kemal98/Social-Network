



let formValid = true;

const form = document.getElementById('form')
let first_name = document.getElementById('first_name')
let lastName = document.getElementById('last_name')
let country = document.querySelector("#country")
let email = document.querySelector("#email")
let password = document.querySelector("#password")
// const username = document.getElementById('username');
// const email = document.getElementById('email');
// const password = document.getElementById('password');
// const password2 = document.getElementById('password2');

form.addEventListener('submit', e => {
    e.preventDefault();
    validateInputs();
    
    if(formValid == true) {
        user()
    }
   
    });

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validateInputs = () => {
    const firstNameValue = first_name.value.trim();
    const lastNameValue = lastName.value.trim();
    const countryValue = country.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();

    if(firstNameValue === '') {
        setError(first_name, 'Name is required');
        formValid = false
    } else {
        setSuccess(first_name);
        formValid = true
    }

    if(lastNameValue === '') {
        setError(lastName, 'Surname is required');
        formValid = false
    } else {
        setSuccess(lastName);
        formValid = true

    }
    
    
    if(countryValue === '') {
        setError(country, 'Country is required');
       
    } else { formValid = false
        setSuccess(country);
        formValid = true
    }

    if(emailValue === '') {
        setError(email, 'Email is required');
        formValid = false
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
        formValid = false
    } else {
        setSuccess(email);
        formValid = true
    }

    if(passwordValue === '') {
        setError(password, 'Password is required');
        formValid = false
    } else if (passwordValue.length < 8 ) {
        setError(password, 'Password must be at least 8 character.')
        formValid = false
    } else {
        setSuccess(password);
        formValid = true
    }
    

};




let session = new Session();
session = session.getSession();

if(session !== "") {
    window.location.href = "home.html"
} 



function user() {
    let user = new User() 
     user.firstName = document.querySelector("#first_name").value;
     user.lastName = document.querySelector("#last_name").value
     user.country = document.querySelector("#country").value
     user.email = document.querySelector("#email").value
     user.password = document.querySelector("#password").value
     user.create(); 
}



document.querySelector("#loginbutton").addEventListener("click", (e) => {
    e.preventDefault()
    
    let email = document.querySelector("#login_email").value 
    let password = document.querySelector("#login_password").value 
    
    let user = new User();
    user.email = email;
    user.password = password;
    user.login();
})





