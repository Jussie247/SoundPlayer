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
 * Adds a play button and a remove button.
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

    // Create a remove button
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => {
        removeAudio(fileName);
        fileItem.remove();
    });

    // Append elements to the file item
    fileItem.appendChild(fileNameElement);
    fileItem.appendChild(playButton);
    fileItem.appendChild(removeButton);

    audioList.appendChild(fileItem);
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
 * Removes an audio file from localStorage by name.
 * @param fileName The name of the audio file to remove.
 */
function removeAudio(fileName: string): void {
    const audioFiles = loadFromLocalStorage();
    const updatedFiles = audioFiles.filter((file) => file.name !== fileName);
    saveToLocalStorage(updatedFiles);
}

/**
 * Handles adding a new file by reading and storing it.
 * @param file The audio file to add.
 */
function handleNewFile(file: File): void {
    const fileReader = new FileReader();

    fileReader.onload = (e) => {
        const dataUrl = e.target?.result as string;

        const audioFiles = loadFromLocalStorage();

        // Check if storage limit is exceeded
        const totalSize = new Blob(audioFiles.map((file) => file.dataUrl)).size;
        if (totalSize + dataUrl.length > 5 * 1024 * 1024) { // 5MB limit
            alert('Storage limit exceeded! Remove some songs to add more.');
            return;
        }

        // Add the file to localStorage
        audioFiles.push({ name: file.name, dataUrl });
        saveToLocalStorage(audioFiles);

        // Create and append the audio file item
        createAudioFileItemFromStorage(file.name, dataUrl);
    };

    fileReader.readAsDataURL(file); // Read file as data URL
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
