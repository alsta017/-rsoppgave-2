document.getElementById('loginform').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    fetch('/loginauth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        const responseDivEl = document.getElementById("responseDiv")
        if (data.error) {
            responseDivEl.textContent = data.error;
            responseDivEl.style.color = "red";
        } else {
            responseDivEl.textContent = data.message;
            responseDivEl.style.color = "green";
            setTimeout(function() {
                window.location.href = "/";
            }, 1000);
        }
    })
    .catch(error => {
        console.error(error);
    });
});