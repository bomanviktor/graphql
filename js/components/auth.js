import { loginController } from "./login.js"
import { LoginPage, Index } from "../pages.js"
import { sidebarController } from "./sidebar.js"
import { queryAllData } from "./queries.js"
const superDivision = document.getElementById("super-div")

export const JWToken = {
  value: "",
}




export const Auth = (session) => {
  if (session) {
    // Adding the HTML and changing style
    superDivision.innerHTML = Index()
    superDivision.classList.replace("login-style","index-style")
    sidebarController() // Adds event listeners to the top-navigation bar
    queryAllData()
    return
  }
  if (!session) {
    // Adding the HTML and changing style
    superDivision.innerHTML = LoginPage()
    superDivision.classList.replace("index-style", "login-style")
    loginController()
    return
  }
}

