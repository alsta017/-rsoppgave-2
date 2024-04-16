let files_resultEl = document.getElementById("files_result")

const cookieString = ('; '+document.cookie).split(`; files=`).pop().split(';')[0];

// Decode the URL-encoded string
const decodedCookie = decodeURIComponent(cookieString);

// Parse the JSON string into an array
const filesArray = JSON.parse(decodedCookie);

// Output the array of filenames

let filesDiv = document.createElement("div");
filesDiv.className = "filesDiv";

for (i = 0; i < filesArray.length; i++) {
    
    let fileDiv = document.createElement("div");
    fileDiv.className = "fileDiv";
    
    let fileDivp = document.createElement("p");
    fileDivp.textContent = filesArray[i];

    let fileDivButtons = document.createElement("div");
    fileDivButtons.className = "fileDivButtons";

    let fileDivButton = document.createElement("button");
    fileDivButton.className = "fileDivButton";
    
    let fileDivButtoni = document.createElement("i");
    fileDivButtoni.className = "fa-solid fa-download green";
    
    let fileDivButtonShare = document.createElement("button");
    fileDivButtonShare.className = "fileDivButton";

    let fileDivButtonSharei = document.createElement("i");
    fileDivButtonSharei.className = "fa-solid fa-share blue";

    let fileDivButtonDelete = document.createElement("button");
    fileDivButtonDelete.className = "fileDivButton";

    let fileDivButtonDeletei = document.createElement("i");
    fileDivButtonDeletei.className = "fa-solid fa-trash-can red";

    fileDivButton.appendChild(fileDivButtoni);
    fileDivButton.setAttribute("id", i);
    fileDivButton.setAttribute("onclick", "downloadfile(this.id)");
    
    fileDiv.appendChild(fileDivp);
    fileDivButtons.appendChild(fileDivButton);

    fileDivButtonShare.setAttribute("onclick", "copytoclipboard(this.id)");
    fileDivButtonShare.setAttribute("id", i);  // Ensure the id is set correctly to each share button

    fileDivButtonShare.appendChild(fileDivButtonSharei);
    fileDivButtons.appendChild(fileDivButtonShare);

    fileDivButtonDelete.id = i;  // Set the ID to index
    fileDivButtonDelete.setAttribute("onclick", "deletefile(this.id)")  // Use arrow function for context

    fileDivButtonDelete.appendChild(fileDivButtonDeletei);
    fileDivButtons.appendChild(fileDivButtonDelete);

    fileDiv.appendChild(fileDivButtons);
    
    filesDiv.appendChild(fileDiv);
}
files_resultEl.appendChild(filesDiv);

function downloadfile(id) {
    for (b = 0; b < filesArray.length; b++) {
        if (b == id) {
            window.location.href = "/download/" + filesArray[b];
        }
    }
}

function copytoclipboard(id) {
    const fileName = filesArray[id];
    const downloadLink = window.location.origin + "/download/" + fileName;

    navigator.clipboard.writeText(downloadLink).then(() => {
        alert("Link kopiert til utklippstavlen");
    }, (err)=> {
        alert("Kunne ikke kopiere link til utklippstavlen", err);
    })
}

function deletefile(id) {
    const fileName = filesArray[id];

    // Confirmation dialog
    if (confirm('Are you sure you want to delete this file?')) {
        fetch("/delete/" + fileName, { method: 'DELETE' })
            .then(response => response.json()) // Parse JSON response
            .then(data => {
                if (!data.ok) {
                    throw new Error(data.message || "An error occurred");
                }
                location.reload(); // Reload only on success
            })
            .catch(error => {
                console.error(error);
                alert('Failed to delete file: ' + error.message);
            });
    }
}