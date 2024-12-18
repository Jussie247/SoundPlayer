// Get references to the DOM elements
const addSoundButton = document.getElementById('addSoundButton') as HTMLButtonElement;
const audioFileInput = document.getElementById('audioFileInput') as HTMLInputElement;
const audioList = document.getElementById('audioList') as HTMLElement;
const audioPlayer = document.getElementById('audioPlayer') as HTMLAudioElement;

// Key used for storing audio file data in localStorage
const LOCAL_STORAGE_KEY = 'audioFiles';

/**
 * Stores the file list in localStorage.
 * @param files An array of file objects to store.
 */
function saveToLocalStorage(files: { name: string; dataUrl: string }[]): void {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(files));
}

/**
 * Loads the audio files from localStorage.
 * @returns An array of file objects stored in localStorage.
 */
function loadFromLocalStorage(): { name: string; dataUrl: string }[] {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : [];
}

/**
 * Creates an audio file list item with a play button.
 * @param fileName The name of the audio file.
 * @param fileDataUrl The data URL of the audio file.
 */
function createAudioFileItemFromStorage(fileName: string, fileDataUrl: string): void {
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
function createAudioFileItem(file: File): HTMLElement {
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
function playAudio(audioUrl: string): void {
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
audioFileInput.addEventListener('change', async (event: Event) => {
    const target = event.target as HTMLInputElement;
    const files = target.files;

    if (files) {
        const audioFiles = loadFromLocalStorage(); // Load existing files from localStorage

        Array.from(files).forEach(async (file: File) => {
            const fileReader = new FileReader();

            fileReader.onload = (e) => {
                const dataUrl = e.target?.result as string;

                // Add the file to localStorage
                audioFiles.push({ name: file.name, dataUrl });
                saveToLocalStorage(audioFiles);

                // Create and append the audio file item
                createAudioFileItemFromStorage(file.name, dataUrl);
            };

            fileReader.readAsDataURL(file); // Read file as data URL
        });
    }
});

/**
 * Initialize the app by loading and displaying stored files.
 */
function initialize(): void {
    const storedFiles = loadFromLocalStorage();

    // Recreate audio file items from localStorage
    storedFiles.forEach((file) => {
        createAudioFileItemFromStorage(file.name, file.dataUrl);
    });
}

// Initialize the application
initialize();
