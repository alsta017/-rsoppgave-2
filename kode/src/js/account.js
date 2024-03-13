let loggedinEl = ('; '+document.cookie).split(`; loggedin=`).pop().split(';')[0];
let usernameEl = ('; '+document.cookie).split(`; username=`).pop().split(';')[0];
let usernamedisplayEl = document.getElementById("user_username")

if (loggedinEl) {
    usernamedisplayEl.textContent = "Username: " + usernameEl;
}