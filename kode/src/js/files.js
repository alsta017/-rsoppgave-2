const files_resultEl = document.getElementById("files_result");
const cookieString = ('; ' + document.cookie).split('; files=').pop().split(';')[0];
const decodedCookie = decodeURIComponent(cookieString);
const filesArray = JSON.parse(decodedCookie);
const filesDiv = document.createElement("div");
filesDiv.className = "filesDiv";

filesArray.forEach((fileName, i) => {
    const fileExtension = fileName.split('.').pop();
    const fileIconClass = getIconForExtension(fileExtension);

    const fileDiv = document.createElement("div");
    fileDiv.className = "fileDiv";

    const fileDivp = document.createElement("p");
    fileDivp.textContent = fileName;

    const fileIcon = document.createElement("i");
    fileIcon.className = "fileicon fa-solid " + fileIconClass;
    fileDivp.prepend(fileIcon); // Prepend the icon to the paragraph

    const fileDivButtons = document.createElement("div");
    fileDivButtons.className = "fileDivButtons";

    const downloadButton = createButton(i, "fa-download green", downloadfile);
    const shareButton = createButton(i, "fa-share blue", copytoclipboard);
    const deleteButton = createButton(i, "fa-trash-can red", deletefile);
    [downloadButton, shareButton, deleteButton].forEach(button => fileDivButtons.appendChild(button));

    fileDiv.appendChild(fileDivp);
    fileDiv.appendChild(fileDivButtons);

    if (['mp4', 'mov', 'avi'].includes(fileExtension)) {
        const playButton = createMediaButton(i, fileName, 'video');
        fileDiv.appendChild(playButton);
    }

    if (['jpg', 'png', 'gif'].includes(fileExtension)) {
        const viewButton = createMediaButton(i, fileName, 'image');
        fileDiv.appendChild(viewButton);
    }

    filesDiv.appendChild(fileDiv);
});

files_resultEl.appendChild(filesDiv);

function createButton(id, iconClass, handler) {
    const button = document.createElement("button");
    button.className = "fileDivButton";
    const icon = document.createElement("i");
    icon.className = `fa-solid ${iconClass}`;
    button.appendChild(icon);
    button.addEventListener('click', handler.bind(null, id));
    return button;
}

function downloadfile(id) {
    window.location.href = "/download/" + filesArray[id];
}

function copytoclipboard(id) {
    const fileName = filesArray[id];

    fetch(`/sharelink/${encodeURIComponent(fileName)}`)
        .then(response => response.json())
        .then(data => {
            if (data.link) {
                if (navigator.clipboard) {
                    // Try to use the clipboard API
                    navigator.clipboard.writeText(data.link).then(() => {
                        alert("Link copied to clipboard");
                    }).catch(err => {
                        // Fallback if clipboard API fails
                        fallbackCopyTextToClipboard(data.link);
                    });
                } else {
                    // Fallback if navigator.clipboard is not available
                    fallbackCopyTextToClipboard(data.link);
                }
            } else {
                throw new Error('No link provided by server');
            }
        })
        .catch(err => {
            alert("Failed to retrieve link: " + err.message);
        });
}

function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.width = "2em";
    textArea.style.height = "2em";
    textArea.style.padding = "0";
    textArea.style.border = "none";
    textArea.style.outline = "none";
    textArea.style.boxShadow = "none";
    textArea.style.background = "transparent";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        document.execCommand('copy');
        alert("Link copied to clipboard");
    } catch (err) {
        alert("Failed to copy link: " + err);
    }
    document.body.removeChild(textArea);
}


function deletefile(id) {
    if (confirm('Are you sure you want to delete this file?')) {
        fetch("/delete/" + filesArray[id], { method: 'DELETE' })
            .then(response => response.json())
            .then(data => {
                if (!data.ok) throw new Error(data.message || "An error occurred");
                location.reload();
            })
            .catch(error => {
                console.error(error);
                alert('Failed to delete file: ' + error.message);
            });
    }
}

function createMediaButton(id, fileName, type) {
    const button = document.createElement("button");
    button.className = "fileDivButton";

    // Create icon inside the button
    const icon = document.createElement("i");
    icon.className = `fa-solid ${type === 'video' ? 'fa-play' : 'fa-image'}`; // 'fa-play' for video, 'fa-image' for images
    button.appendChild(icon);

    // Setting the onclick event to show the media overlay
    button.addEventListener('click', () => showMediaOverlay(fileName, type));

    return button;
}

function showMediaOverlay(fileName, fileType) {
    const mediaOverlay = document.getElementById('mediaOverlay');
    const videoPlayer = document.getElementById('videoPlayer');
    const imageViewer = document.getElementById('imageViewer');

    // Hide both media views initially
    videoPlayer.style.display = 'none';
    imageViewer.style.display = 'none';

    if (fileType === 'video') {
        videoPlayer.src = "/download/" + fileName; // Set the source for the video
        videoPlayer.style.display = 'block'; // Show the video player
    } else if (fileType === 'image') {
        imageViewer.src = "/download/" + fileName; // Set the source for the image
        imageViewer.style.display = 'block'; // Show the image viewer
    }

    // Display the overlay
    mediaOverlay.style.display = 'flex';

    // Function to close the overlay by clicking on it
    mediaOverlay.onclick = function(event) {
        if (event.target === this) { // Ensures we are not closing when clicking on the video/image itself
            mediaOverlay.style.display = 'none'; // Hide the overlay
            videoPlayer.src = ''; // Stop video playback and unload the video
            imageViewer.src = ''; // Clear the image source
        }
    };
}

const closeBtn = document.getElementById('closeOverlay');
const mediaOverlay = document.getElementById('mediaOverlay');
const videoPlayer = document.getElementById('videoPlayer');
const imageViewer = document.getElementById('imageViewer');

closeBtn.addEventListener('click', function() {
    mediaOverlay.style.display = 'none'; // Hide the overlay
    videoPlayer.style.display = 'none'; // Hide and stop the video player
    imageViewer.style.display = 'none'; // Hide the image viewer
    videoPlayer.src = ''; // Clear the video source to stop the video
    imageViewer.src = ''; // Clear the image source
});

function getIconForExtension(extension) {
    const icons = {
        'pdf': 'fa-file-pdf',
        'docx': 'fa-file-word',
        'xlsx': 'fa-file-excel',
        'jpg': 'fa-file-image',
        'png': 'fa-file-image',
        'txt': 'fa-file-alt',
        'mp4': 'fa-video',
        // add other file types as needed
    };
    return icons[extension.toLowerCase()] || 'fa-file'; // default to a generic file icon if no match
}