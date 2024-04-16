let loggedinEl = ('; '+document.cookie).split(`; loggedin=`).pop().split(';')[0];
let usernameEl = ('; '+document.cookie).split(`; username=`).pop().split(';')[0];
let loginbuttonEl = document.getElementById("loginbutton");

if (loggedinEl === "true") {

    let loginbuttonline1El = document.createElement("div");
    loginbuttonline1El.className = "loginbuttonline1";

    loginbuttonEl.setAttribute("href", "/account");
    let ielement = document.createElement("i");

    ielement.className = "fa-solid fa-user";
    loginbuttonline1El.appendChild(ielement)

    let divelement = document.createElement("div");
    divelement.setAttribute("id", "accounttext")
    divelement.textContent = "Bruker"
    loginbuttonline1El.appendChild(divelement)

    loginbuttonEl.appendChild(loginbuttonline1El);
} else {

    loginbuttonEl.setAttribute("href", "/login");

    let ielement = document.createElement("i");
    ielement.className = "fa-solid fa-right-to-bracket";
    loginbuttonEl.appendChild(ielement)

    let divelement = document.createElement("div");
    divelement.setAttribute("id", "logintext")
    divelement.textContent = "Login"
    loginbuttonEl.appendChild(divelement)

}