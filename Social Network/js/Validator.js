// class Validator {
//     constructor (config) {
//         this.element_Config = config;
//         this.error = {};

//         this.generateErrors();
//     }

//     generateErrors() {
//      for(let field in this.element_Config) {
//         this.error[field] =[];
//      }
//     }
//     inputlisener() {
//         let inputSelector = this.element_Config

//         for(let field in inputSelector) {
//             let el = document.querySelector(`input[name="${field}"]`);

//             el.addEventListener('input', this.validate.bind(this))
//         }
//     }
//     validate(e) {
//         let elField = this.element_Config;


//         let field = e.target;
//         let fieldName = field.getAttribute('name');

//         let fieldValue = field.value;

//         this.error[fieldName] = [];

//         if(elField[fieldName].required) {
//             if(fieldValue === '') {
//                 this.error[fieldName].push('Field is empty')
//             }
//         }

//         if(elField[fieldName].email) {
//             if(!this.validateEmail(fieldValue)) {
//                 this.error[fieldName].push('Invalid email address !')
//                 return true
//             }
//         }

//         if(fieldValue.length < elField[fieldName].minlength || fieldValue.length > elField[fieldName].maxlength) {
//           this.error[fieldName].push(`The field must have a minimum ${elField[fieldName].minlength} and a maximum ${elField[fieldName].maxlength} of characters`)
//         }


//         this.populateErrors(this.error)
//     }

//     populateErrors(error) {
//         for(const elem of document.querySelectorAll('ul')) {
//             elem.remove();
//         }
//         for(let key of Object.keys(error)) {
//             let parentElement = document.querySelector(`input[name="${key}"]`).parentElement
//             let errorsElement = document.createElement('ul')
//             parentElement.appendChild(errorsElement);

//             error[key].forEach(error => {
//                 let li = document.createElement('li');
//                 li.innerText = error

//                 errorsElement.appendChild(li)
//             });
//         }
//     }



//     validateEmail(email) {
//          if(/^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/.test(email)) {
//             return true
//          }
//          return false
//     }

// }



