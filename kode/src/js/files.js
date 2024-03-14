let files_resultEl = document.getElementById("files_result")

const cookieString = ('; '+document.cookie).split(`; files=`).pop().split(';')[0];

// Decode the URL-encoded string
const decodedCookie = decodeURIComponent(cookieString);

// Parse the JSON string into an array
const filesArray = JSON.parse(decodedCookie);

// Output the array of filenames
console.log(filesArray);

let filesDiv = document.createElement("div");
filesDiv.className = "filesDiv";

for (i = 0; i < filesArray.length; i++) {
    
    let fileDiv = document.createElement("div");
    fileDiv.className = "fileDiv";
    
    let fileDivp = document.createElement("p");
    fileDivp.textContent = filesArray[i];

    let fileDivButton = document.createElement("button");
    fileDivButton.className = "fileDivButton";
    
    let fileDivButtoni = document.createElement("i");
    fileDivButtoni.className = "fa-solid fa-download";
    
    fileDivButton.appendChild(fileDivButtoni);
    fileDivButton.setAttribute("id", i);
    fileDivButton.setAttribute("onclick", "downloadfile(this.id)");

    fileDiv.appendChild(fileDivp);
    fileDiv.appendChild(fileDivButton);
    filesDiv.appendChild(fileDiv);

    console.log(filesArray[i]);
}
files_resultEl.appendChild(filesDiv);

function downloadfile(id) {
    for (b = 0; b < filesArray.length; b++) {
        if (b == id) {
            window.location.href = "/download/" + filesArray[b];
        }
    }
}