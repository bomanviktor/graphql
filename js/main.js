import { Auth } from "./components/auth.js"
if (document.cookie){
  Auth(true)
} else {
  Auth(false)
}
