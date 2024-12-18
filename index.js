"use strict";
// app.ts
// Get references to the DOM elements
const addSoundButton = document.getElementById('addSoundButton');
const audioFileInput = document.getElementById('audioFileInput');
const audioList = document.getElementById('audioList');
const audioPlayer = document.getElementById('audioPlayer');
// Function to create an audio file list item
function createAudioFileItem(file) {
    const fileItem = document.createElement('div');
    fileItem.classList.add('audio-file-item');
    // Display the file name
    const fileName = document.createElement('span');
    fileName.textContent = file.name;
    // Create a play button
    const playButton = document.createElement('button');
    playButton.textContent = 'Play';
    playButton.addEventListener('click', () => {
        playAudio(file);
    });
    // Append elements to the file item
    fileItem.appendChild(fileName);
    fileItem.appendChild(playButton);
    return fileItem;
}
// Function to play the selected audio file
function playAudio(file) {
    const audioUrl = URL.createObjectURL(file);
    audioPlayer.src = audioUrl;
    audioPlayer.play();
}
// Event listener for "Add Sound" button click
addSoundButton.addEventListener('click', () => {
    audioFileInput.click(); // Simulate a click on the hidden file input
});
// Event listener for file input change
audioFileInput.addEventListener('change', (event) => {
    const files = event.target.files;
    if (files) {
        // Append selected files to the list
        Array.from(files).forEach(file => {
            const fileItem = createAudioFileItem(file);
            audioList.appendChild(fileItem);
        });
    }
});
