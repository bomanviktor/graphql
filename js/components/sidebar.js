import {Auth} from "./auth.js"

export const sidebarController = () => {
  document.getElementById("logout").addEventListener("click", () => {
    Auth(false)
  })
}