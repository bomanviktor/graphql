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
        .then((response) => {
          if (!response.ok) {
            throw new Error("Invalid credentials.")
          } else {
            return response.json()}
          })
        .then((data) => {
          JWToken.value = data
          return Auth(true)
        })
        .catch((err) => {
          alert(err)
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

