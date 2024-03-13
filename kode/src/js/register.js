let uploadboxEl = document.getElementById("box");

let responseEl = ('; '+document.cookie).split(`; responsecode=`).pop().split(';')[0];

if (responseEl) {
    let responseDiv = document.createElement("div");
    responseDiv.className = "responseDiv";
    if (responseEl == "RF_1") {
        responseDiv.textContent = "User already exists";
    } else if (responseEl == "RF_2") {
        responseDiv.textContent = "Invalid input";
    } else {
        responseDiv.textContent = "Error";
    }
    uploadboxEl.appendChild(responseDiv);
    document.cookie = "responsecode" +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};