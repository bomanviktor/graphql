import {Auth} from "./auth.js"

export const sidebarController = () => {
  document.getElementById("logout").addEventListener("click", () => {
    document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
    localStorage.setItem('queried', false)
    Auth(false)
  })
}