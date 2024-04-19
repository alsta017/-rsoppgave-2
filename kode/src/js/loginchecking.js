let loggedinEl = ('; '+document.cookie).split('; loggedin=').pop().split(';')[0];
let loginbuttonEl = document.getElementById("loginbutton");

if (loggedinEl === "true") {
    loginbuttonEl.setAttribute("href", "/account");
    loginbuttonEl.innerHTML = '<div class="loginbuttonline1"><i class="fa-solid fa-user"></i><div id="accounttext">Bruker</div></div>';
} else {
    loginbuttonEl.setAttribute("href", "/login");
    loginbuttonEl.innerHTML = '<div class="loginbuttonline1"><i class="fa-solid fa-right-to-bracket"></i><div id="logintext">Login</div></div>';
}