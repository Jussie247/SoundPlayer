// Get references to the DOM elements
const addSoundButton = document.getElementById('addSoundButton') as HTMLButtonElement;
const audioFileInput = document.getElementById('audioFileInput') as HTMLInputElement;
const audioList = document.getElementById('audioList') as HTMLElement;
const audioPlayer = document.getElementById('audioPlayer') as HTMLAudioElement;

// Key used for storing audio file data in localStorage
const LOCAL_STORAGE_KEY = 'audioFiles';

/**
 * Audio file type for localStorage
 */
type StoredAudioFile = {
    name: string;
    dataUrl: string;
};

/**
 * Stores the file list in localStorage.
 * @param files An array of audio file objects to store.
 */
function saveToLocalStorage(files: StoredAudioFile[]): void {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(files));
}

/**
 * Loads the audio files from localStorage.
 * @returns An array of stored audio files.
 */
function loadFromLocalStorage(): StoredAudioFile[] {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : [];
}

/**
 * Creates and displays an audio file item from localStorage.
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
 * Creates a new audio file item and saves it to localStorage.
 * @param file The audio file to create the item for.
 */
function handleNewFile(file: File): void {
    const fileReader = new FileReader();

    fileReader.onload = (e) => {
        const dataUrl = e.target?.result as string;

        // Add the file to localStorage
        const audioFiles = loadFromLocalStorage();
        audioFiles.push({ name: file.name, dataUrl });
        saveToLocalStorage(audioFiles);

        // Create and append the audio file item
        createAudioFileItemFromStorage(file.name, dataUrl);
    };

    fileReader.readAsDataURL(file); // Read file as data URL
}

/**
 * Plays the selected audio file in the audio player.
 * @param audioUrl The data URL of the audio file.
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
audioFileInput.addEventListener('change', (event: Event) => {
    const target = event.target as HTMLInputElement;
    const files = target.files;

    if (files) {
        Array.from(files).forEach((file: File) => {
            handleNewFile(file);
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
