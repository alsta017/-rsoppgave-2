// let loggedinEl = ('; '+document.cookie).split(`; loggedin=`).pop().split(';')[0];
// let usernameEl = ('; '+document.cookie).split(`; username=`).pop().split(';')[0];
// let usernamedisplayEl = document.getElementById("user_username")

// if (loggedinEl) {
//     usernamedisplayEl.textContent = "Brukernavn: " + usernameEl;
// }

document.addEventListener("DOMContentLoaded", function() {
    fetch('/check-login')
    .then(response => response.json())
    .then(data => {
        if (data.isLoggedIn) {
            document.getElementById("user_username").textContent = "Brukernavn: " + data.username;
        } else {
            document.getElementById("user_username").textContent = "Du er ikke innlogget";
            document.getElementById("user_username").style.color = "red";
            document.getElementById("changepassword").style.display = "none";
            document.getElementById("logout").style.display = "none";
            document.getElementById("delete").style.display = "none"
        }
    })
})