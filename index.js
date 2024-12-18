"use strict";
// Get references to the DOM elements
const addSoundButton = document.getElementById('addSoundButton');
const audioFileInput = document.getElementById('audioFileInput');
const audioList = document.getElementById('audioList');
const audioPlayer = document.getElementById('audioPlayer');
/**
 * Creates an audio file list item with a play button.
 * @param file The audio file to create the item for.
 * @returns The HTML element representing the audio file item.
 */
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
/**
 * Plays the selected audio file in the audio player.
 * @param file The audio file to play.
 */
function playAudio(file) {
    const audioUrl = URL.createObjectURL(file); // Generate a temporary URL for the file
    audioPlayer.src = audioUrl; // Set the source of the audio player
    audioPlayer.play(); // Play the audio
}
// Event listener for "Add Sound" button click
addSoundButton.addEventListener('click', () => {
    audioFileInput.click(); // Simulate a click on the hidden file input
});
// Event listener for file input change
audioFileInput.addEventListener('change', (event) => {
    const target = event.target;
    const files = target.files;
    if (files) {
        // Iterate through the selected files and create list items
        Array.from(files).forEach((file) => {
            const fileItem = createAudioFileItem(file);
            audioList.appendChild(fileItem);
        });
    }
});
