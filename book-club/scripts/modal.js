// Function to open a modal
function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
}

// Function to close a modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

// Close the modal when user clicks outside
window.onclick = function (event) {
    const modals = document.getElementsByClassName("modal");
    for (let i = 0; i < modals.length; i++) {
        if (event.target == modals[i]) {
            modals[i].style.display = "none";
        }
    }
}
