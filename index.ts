// app.ts

// Get references to the DOM elements
const audioFileInput = document.getElementById('audioFileInput') as HTMLInputElement;
const audioList = document.getElementById('audioList') as HTMLElement;
const audioPlayer = document.getElementById('audioPlayer') as HTMLAudioElement;

// Function to create an audio file list item
function createAudioFileItem(file: File) {
    const fileItem = document.createElement('div');
    fileItem.classList.add('audio-file-item');
    fileItem.textContent = file.name;

    fileItem.addEventListener('click', () => {
        playAudio(file);
    });

    return fileItem;
}

// Function to play the selected audio file
function playAudio(file: File) {
    const audioUrl = URL.createObjectURL(file);
    audioPlayer.src = audioUrl;
    audioPlayer.play();
}

// Event listener for file input change
audioFileInput.addEventListener('change', (event: Event) => {
    const files = (event.target as HTMLInputElement).files;

    if (files) {
        // Clear existing audio list
        audioList.innerHTML = '';

        // Display selected files in the list
        Array.from(files).forEach(file => {
            const fileItem = createAudioFileItem(file);
            audioList.appendChild(fileItem);
        });
    }
});
