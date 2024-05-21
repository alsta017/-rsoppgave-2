document.addEventListener("DOMContentLoaded", function() {
    const userFilesContainer = document.getElementById("userFiles");
  
    function fetchUserFiles() {
        fetch('/api/admin/files')
        .then(response => {
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
        return response.json();
        })
        .then(userFiles => {
            userFilesContainer.innerHTML = ''; // Clear previous content
            const userMap = new Map();

            userFiles.forEach(userFile => {
                if (!userMap.has(userFile.username)) {
                    userMap.set(userFile.username, []);
                }
                userMap.get(userFile.username).push(userFile);
            });

        userMap.forEach((files, username) => {
            const userFilesDiv = document.createElement("div");
            userFilesDiv.classList.add("user-files");
            userFilesDiv.innerHTML = `<h3>User: ${username}</h3>`;

            files.forEach(file => {
                const fileDiv = document.createElement("div");
                fileDiv.classList.add("file");
                fileDiv.innerHTML = `
                <div class="filename">${file.filename}</div>
                <button class="deletebuttonadmin" onclick="deleteFile('${file.userId}', '${file.filename}')"><i class="fa-solid fa-trash-can"></i></button>
                `;
                userFilesDiv.appendChild(fileDiv);
            });

            userFilesContainer.appendChild(userFilesDiv);
            });
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            userFilesContainer.textContent = 'Failed to load user files.';
        });
    }

    window.deleteFile = function(userId, filename) {
        fetch(`/api/admin/files/${userId}/${filename}`, {
        method: 'DELETE'
        })
        .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
        })
        .then(data => {
        if (data.ok) {
            fetchUserFiles(); // Refresh the list of files after deletion
            location.reload();
        } else {
            console.error('Failed to delete file:', data.message);
        }
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}
    fetchUserFiles();
  });