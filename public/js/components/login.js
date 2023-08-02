import { Auth, JWToken } from "./auth.js"



class Login {
  form
  constructor(form) {
    this.form = form
    this.form.addEventListener("submit", this.onSubmit.bind(this))
  }
  onSubmit(event) {
    event.preventDefault()

    const username = this.form.querySelector("#username"),
          password = this.form.querySelector("#password")

    if (username && password) {

      const formData = {
        login: username.value,
        password: password.value,
      }

      let headersLogin = new Headers()
      headersLogin.set('Authorization', 'Basic ' + btoa(formData.login + ":" + formData.password));

      fetch(`https://01.gritlab.ax/api/auth/signin`, {
        method: "POST",
        headers: headersLogin,
      })
        .then((response) => response.json())
        .then((data) => {
          JWToken.value = data
          console.log("JWToken after parsed:", JWToken.value)
          document.cookie = `token=${data}`;
          console.log(document.cookie)
          return Auth(true)
        })
        .catch((err) => {
          console.error(err)
          return Auth(false)
        })
    }
    
    
  }
}


export const loginController = () => {
  const loginForm = document.getElementById("login-form")
  if (loginForm) {
    new Login(loginForm)
  }
}

// function parseJwt (token) {
//     var base64Url = token.split('.')[1];
//     var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
//         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//     }).join(''));

//     return JSON.parse(jsonPayload);
// }
