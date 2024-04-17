const params = new URLSearchParams(window.location.search);
        const userId = params.get('userId');
        const filename = params.get('filename');
        const filePath = `/download/${userId}/${filename}`;

        const mediaContainer = document.getElementById('mediaContainer');
        const fileExtension = filename.split('.').pop().toLowerCase();
        let mediaElement;

        if (['mp4', 'mov', 'avi'].includes(fileExtension)) {
            mediaElement = document.createElement('video');
            mediaElement.controls = true;
            mediaElement.src = filePath;
        } else if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
            mediaElement = document.createElement('img');
            mediaElement.src = filePath;
        } else {
            mediaElement = document.createElement('p');
            mediaElement.textContent = 'Unsupported file type';
        }

        mediaContainer.appendChild(mediaElement);

        const downloadLink = document.createElement('a');
        downloadLink.href = filePath;
        downloadLink.textContent = 'Download';
        downloadLink.download = filename; // Suggests the filename when downloading
        mediaContainer.appendChild(downloadLink);