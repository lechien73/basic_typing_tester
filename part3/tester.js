document.addEventListener('DOMContentLoaded', function() {
    const difficulties = {
        easy: [
            "A simple sentence.",
            "The quick brown fox.",
            "Sunny days are nice.",
            "Apples are sweet.",
            "I like to read."
        ],
        medium: [
            "The quick brown fox jumps over the lazy dog.",
            "Complexity adds flavor to life.",
            "Programming challenges are fun.",
            "Always look on the bright side of life.",
            "Persistence guarantees that results are inevitable."
        ],
        difficult: [
            "Pseudopseudohypoparathyroidism is a condition.",
            "The vixen jumped quickly on her foe barking with zeal.",
            "The job requires extra pluck and zeal from every young wage earner.",
            "A quick movement of the enemy will jeopardize six gunboats.",
            "All questions asked by five watched experts amaze the judge."
        ]
    };
    const sampleTextDiv = document.getElementById('sample-text');
    const typingInput = document.getElementById('typing-input');
    const difficultySelect = document.getElementById('difficulty-select');
    let selectedDifficulty = 'easy'; // Default difficulty
    let sampleText = "";
    let startTime;
    let endTime;

    // Function to start the timer
    function startTimer() {
        if (!startTime) { // Start the timer only if it hasn't started yet
            startTime = new Date();
        }
    }

    // Function to end the timer and calculate the elapsed time in minutes
    function endTimer() {
        endTime = new Date();
        const elapsedTime = (endTime - startTime) / 60000; // Convert milliseconds to minutes
        return elapsedTime;
    }

    // Function to select a random sentence based on difficulty
    function selectRandomSentence(difficulty) {
        const sentences = difficulties[difficulty];
        const randomIndex = Math.floor(Math.random() * sentences.length);
        return sentences[randomIndex];
    }

    // Function to update the sample text based on selected difficulty
    function updateSampleText() {
        sampleText = selectRandomSentence(selectedDifficulty);
        sampleTextDiv.innerHTML = sampleText.split('').map(char => `<span>${char}</span>`).join('');
    }

function calculateAccuracy(inputText, sampleText) {
    const inputChars = inputText.split('');
    const sampleChars = sampleText.split('');
    let correctChars = 0;
    inputChars.forEach((char, index) => {
        if (char === sampleChars[index]) {
            correctChars++;
        }
    });
    return Math.round((correctChars / sampleChars.length) * 100);
}


// Modify the checkTypingCompletion function to store results
function checkTypingCompletion() {
    const inputText = typingInput.value;
    if (inputText === sampleText && inputText.length === sampleText.length) {
        typingInput.disabled = true; // Disable further typing
        const elapsedTime = endTimer();
        const totalTime = Math.round(elapsedTime * 60); // Convert to seconds
        const wordCount = sampleText.split(' ').length;
        const wpm = Math.round(wordCount / elapsedTime);
        const accuracy = calculateAccuracy(inputText, sampleText);
                
        // Display the results
        document.getElementById('time-result').textContent = `${totalTime}s`;
        document.getElementById('wpm-result').textContent = wpm;
        document.getElementById('accuracy-result').textContent = `${accuracy}%`;
    }
}

    // Initial sample text update
    updateSampleText();

    // Event listener for difficulty selection change
    difficultySelect.addEventListener('change', function() {
        selectedDifficulty = difficultySelect.value;
        updateSampleText();
        typingInput.value = ''; // Reset the input field for a new test
        startTime = undefined; // Reset the start time
        typingInput.disabled = false; // Enable the input field for a new test
    });

    // Event listener for input to color the typed text
    typingInput.addEventListener('input', function(event) {
        startTimer();
        const inputText = typingInput.value;
        const sampleTextSpans = sampleTextDiv.querySelectorAll('span');
        const inputWords = inputText.trim().split(/\s+/);
        const sampleWords = sampleText.split(' ');
    
        sampleTextSpans.forEach((charSpan, index) => {
            if (inputText[index] == null) {
                charSpan.classList.remove('correct', 'incorrect'); // No input yet
            } else if (inputText[index] === charSpan.innerText) {
                charSpan.classList.add('correct');
                charSpan.classList.remove('incorrect');
            } else {
                charSpan.classList.add('incorrect');
                charSpan.classList.remove('correct');
            }
        });
    
        if (event.inputType === 'insertText' && event.data === ' ') {
            const currentWordIndex = inputWords.length - 1;
            if (inputWords[currentWordIndex] === sampleWords[currentWordIndex]) {
                // Move to the next word
                // typingInput.value += ' ';
            } else {
                // Highlight the incorrect word
                sampleTextSpans.forEach((charSpan, index) => {
                    if (index >= inputText.length - inputWords[currentWordIndex].length && index < inputText.length) {
                        charSpan.classList.add('incorrect');
                        charSpan.classList.remove('correct');
                    }
                });
            }
        }
    
        checkTypingCompletion();
    });
});
