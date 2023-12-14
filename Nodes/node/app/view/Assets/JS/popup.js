// Function to inform user of the character limit on input and edit

const gameNameInput = document.getElementById('gameNameInput');
const reviewInput = document.getElementById('reviewInput');
const characterLimitPopup = document.getElementById('characterLimitPopup');

if (gameNameInput && reviewInput && characterLimitPopup) {
    gameNameInput.addEventListener('input', checkCharacterLimit);
    reviewInput.addEventListener('input', checkCharacterLimit);
} else {
    console.error("One or more elements not found.");
}

function checkCharacterLimit() {
    const trimmedGameName = gameNameInput.value.trim();
    const trimmedReview = reviewInput.value.trim();

    // Exit early if both input fields are empty
    if (trimmedGameName === '' && trimmedReview === '') {
        hidePopup(characterLimitPopup);
        return;
    }

    if (trimmedGameName.length > 29 || trimmedReview.length > 199) {
        displayPopup(characterLimitPopup);
    } else {
        hidePopup(characterLimitPopup);
    }
}

function displayPopup(popup) {
    popup.style.display = 'block';
    setTimeout(() => {
        hidePopup(popup);
    }, 3000); // Hide the popup after 3 seconds
}

function hidePopup(popup) {
    popup.style.display = 'none';
}
