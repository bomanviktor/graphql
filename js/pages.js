export const LoginPage = () => {
  return `
<section id="login-screen" class="center">
  <h1 id="title"">GraphQL</h1>
      <div id="login">
        <h3>Login:</h3>
        <form (submit)="onSubmit()" id="login-form">
          <input type="text" id="username" placeholder="Username/Email" required>
          <input type="password" id="password" placeholder="Password" required> 
          <input type="submit" id="submit" value="Login">
        </form>    
      </div>
  </section>
`
}

export const Index = () => {  
  return `



<main id="main">
<div id="sidebar" class="sidebar">
  <div id="user-data"> 
    <h3 id="first-name">Welcome,</h3>
    <h4 id="user-name">aka</h4>

    <h4 id="gender">gender</h4>
    <h4 id="age">age</h4>
    <img id="image" src="" width="150px" height="150px"></img>
    <hr>
    <h4>XP stats:</h4>
    <h4 id="total-xp"></h4>
    <h4 id="level"></h4>
    <hr>
    <h4>Audit stats:</h4>
    <h4 id="total-audit"</h4>
    <h4 id="audit-ratio"></h4>
    <hr>
  </div>


  <a id="logout">Log out <i class='bx bx-log-in-circle'></i></a>  
</div>

  <section id="graphs">
      <div id="graph-1" class="graph-section">
      </div>

      <div id="graph-2" class="graph-section">
      </div>

  </section>
</main>
`
}

