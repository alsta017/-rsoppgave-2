let resultEl = document.getElementById("result")
const uploadstatusEl = ('; '+document.cookie).split(`; uploadstatus=`).pop().split(';')[0];

if (uploadstatusEl) {
    if (uploadstatusEl != "r") {
        resultEl.textContent = "Error!";
        document.cookie = "uploadstatus=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    } else {
        resultEl.textContent = "Filen er lastet opp! (Hvis du valgte en fil, da)";
        document.cookie = "uploadstatus=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
}