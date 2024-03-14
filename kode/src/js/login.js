let uploadboxEl = document.getElementById("box");

let responseEl = ('; '+document.cookie).split(`; responsecode=`).pop().split(';')[0];

if (responseEl) {
    let responseDiv = document.createElement("div");
    responseDiv.className = "responseDiv";
    if (responseEl == "RS") {
        responseDiv.textContent = "Account created";
    } else if (responseEl == "RF_2") {
        responseDiv.textContent = "Du må skrive inn brukernavn og passord"
    } else if (responseEl == "LF1") {
        responseDiv.textContent = "Feil brukernavn eller passord";
    } else if (responseEl == "LF2") {
        responseDiv.textContent = "Feil brukernavn eller passord";
    } else if (responseEl == "LF3") {
        responseDiv.textContent = "Du må skrive inn brukernavn og passord";
    } else if (responseEl == "U_R") {
        responseDiv.textContent = "Du må logge inn for å laste opp filer";
    } else if (responseEl == "U_S") {
        responseDiv.textContent = "Du må logge inn for å se filer";
    }
    uploadboxEl.appendChild(responseDiv);
    document.cookie = "responsecode" +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};