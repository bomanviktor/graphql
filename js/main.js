import { Auth } from "./components/auth.js"
// Auth(true)
console.log(document.cookie)
if (document.cookie){
  Auth(true)
} else {
  Auth(false)
}
