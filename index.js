"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Get references to the DOM elements
const addSoundButton = document.getElementById('addSoundButton');
const audioFileInput = document.getElementById('audioFileInput');
const audioList = document.getElementById('audioList');
const audioPlayer = document.getElementById('audioPlayer');
// Key used for storing audio file data in localStorage
const LOCAL_STORAGE_KEY = 'audioFiles';
/**
 * Stores the file list in localStorage.
 * @param files An array of file objects to store.
 */
function saveToLocalStorage(files) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(files));
}
/**
 * Loads the audio files from localStorage.
 * @returns An array of file objects stored in localStorage.
 */
function loadFromLocalStorage() {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : [];
}
/**
 * Creates an audio file list item with a play button.
 * @param fileName The name of the audio file.
 * @param fileDataUrl The data URL of the audio file.
 */
function createAudioFileItemFromStorage(fileName, fileDataUrl) {
    const fileItem = document.createElement('div');
    fileItem.classList.add('audio-file-item');
    // Display the file name
    const fileNameElement = document.createElement('span');
    fileNameElement.textContent = fileName;
    // Create a play button
    const playButton = document.createElement('button');
    playButton.textContent = 'Play';
    playButton.addEventListener('click', () => {
        playAudio(fileDataUrl);
    });
    // Append elements to the file item
    fileItem.appendChild(fileNameElement);
    fileItem.appendChild(playButton);
    audioList.appendChild(fileItem);
}
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
        const audioUrl = URL.createObjectURL(file);
        playAudio(audioUrl);
    });
    // Append elements to the file item
    fileItem.appendChild(fileName);
    fileItem.appendChild(playButton);
    return fileItem;
}
/**
 * Plays the selected audio file in the audio player.
 * @param audioUrl The data URL or object URL of the audio file.
 */
function playAudio(audioUrl) {
    audioPlayer.src = audioUrl; // Set the source of the audio player
    audioPlayer.play(); // Play the audio
}
/**
 * Event listener for "Add Sound" button click.
 */
addSoundButton.addEventListener('click', () => {
    audioFileInput.click(); // Simulate a click on the hidden file input
});
/**
 * Event listener for file input change.
 */
audioFileInput.addEventListener('change', (event) => __awaiter(void 0, void 0, void 0, function* () {
    const target = event.target;
    const files = target.files;
    if (files) {
        const audioFiles = loadFromLocalStorage(); // Load existing files from localStorage
        Array.from(files).forEach((file) => __awaiter(void 0, void 0, void 0, function* () {
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                var _a;
                const dataUrl = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
                // Add the file to localStorage
                audioFiles.push({ name: file.name, dataUrl });
                saveToLocalStorage(audioFiles);
                // Create and append the audio file item
                createAudioFileItemFromStorage(file.name, dataUrl);
            };
            fileReader.readAsDataURL(file); // Read file as data URL
        }));
    }
}));
/**
 * Initialize the app by loading and displaying stored files.
 */
function initialize() {
    const storedFiles = loadFromLocalStorage();
    // Recreate audio file items from localStorage
    storedFiles.forEach((file) => {
        createAudioFileItemFromStorage(file.name, file.dataUrl);
    });
}
initialize();
