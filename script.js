
const topics = {
    sports: [
        { question: "What is the national sport of Canada?", options: ["Hockey", "Soccer", "Basketball", "Lacrosse"], answer: "Lacrosse" },
        { question: "Which country won the 2018 FIFA World Cup?", options: ["France", "Croatia", "Brazil", "Germany"], answer: "France" },
        { question: "Who holds the record for the most goals scored in a single World Cup?", options: ["Pele", "Miroslav Klose", "Diego Maradona", "Just Fontaine"], answer: "Just Fontaine" },
        { question: "In which sport would you perform a slam dunk?", options: ["Basketball", "Volleyball", "Football", "Baseball"], answer: "Basketball" },
        { question: "What is the length of a marathon race?", options: ["42.195 kilometers", "26.2 miles", "21 kilometers", "50 kilometers"], answer: "42.195 kilometers" }
    ],
    nature: [
        { question: "What is the largest mammal in the world?", options: ["Elephant", "Blue Whale", "Giraffe", "Shark"], answer: "Blue Whale" },
        { question: "Which is the longest river in the world?", options: ["Amazon", "Nile", "Yangtze", "Mississippi"], answer: "Nile" },
        { question: "What type of tree do acorns come from?", options: ["Oak", "Pine", "Maple", "Birch"], answer: "Oak" },
        { question: "Which planet is known as the Red Planet?", options: ["Mars", "Venus", "Jupiter", "Saturn"], answer: "Mars" },
        { question: "What is the process by which plants make their own food?", options: ["Photosynthesis", "Respiration", "Transpiration", "Fermentation"], answer: "Photosynthesis" }
    ],
    general: [
        { question: "Who wrote 'To Kill a Mockingbird'?", options: ["Harper Lee", "Mark Twain", "Ernest Hemingway", "F. Scott Fitzgerald"], answer: "Harper Lee" },
        { question: "What is the capital of Japan?", options: ["Tokyo", "Seoul", "Beijing", "Bangkok"], answer: "Tokyo" },
        { question: "What element does 'O' represent on the periodic table?", options: ["Oxygen", "Gold", "Osmium", "Oganesson"], answer: "Oxygen" },
        { question: "Who was the first person to walk on the moon?", options: ["Neil Armstrong", "Buzz Aldrin", "Yuri Gagarin", "Michael Collins"], answer: "Neil Armstrong" },
        { question: "What is the smallest country in the world?", options: ["Vatican City", "Monaco", "San Marino", "Liechtenstein"], answer: "Vatican City" }
    ],
    states: [
        { question: "Which is the largest state in the USA by area?", options: ["Texas", "California", "Alaska", "Florida"], answer: "Alaska" },
        { question: "Which state is known as the 'Sunshine State'?", options: ["California", "Texas", "Florida", "Arizona"], answer: "Florida" },
        { question: "Which state is known as the 'Empire State'?", options: ["New York", "New Jersey", "California", "Nevada"], answer: "New York" },
        { question: "Which state is the only one to have a coastline on both the Atlantic and Pacific Oceans?", options: ["California", "Florida", "Alaska", "Washington"], answer: "Alaska" },
        { question: "What is the capital of Texas?", options: ["Austin", "Houston", "Dallas", "San Antonio"], answer: "Austin" }
    ],
    religion: [
        { question: "Which religion follows the teachings of Buddha?", options: ["Hinduism", "Buddhism", "Christianity", "Islam"], answer: "Buddhism" },
        { question: "What is the holy book of Islam?", options: ["Bible", "Quran", "Vedas", "Torah"], answer: "Quran" },
        { question: "Which religion is associated with the practice of yoga?", options: ["Hinduism", "Buddhism", "Jainism", "Sikhism"], answer: "Hinduism" },
        { question: "In Christianity, who is considered the 'Son of God'?", options: ["Jesus Christ", "Moses", "Muhammad", "Abraham"], answer: "Jesus Christ" },
        { question: "What is the central text of Judaism?", options: ["Torah", "Quran", "Bible", "Vedas"], answer: "Torah" }
    ],
    study: [
        { question: "What is the chemical symbol for Gold?", options: ["Au", "Ag", "Pb", "Fe"], answer: "Au" },
        { question: "What is the hardest natural substance on Earth?", options: ["Gold", "Iron", "Diamond", "Platinum"], answer: "Diamond" },
        { question: "What planet is known as the 'Red Planet'?", options: ["Mars", "Earth", "Jupiter", "Saturn"], answer: "Mars" },
        { question: "What is the largest organ in the human body?", options: ["Liver", "Heart", "Skin", "Lung"], answer: "Skin" },
        { question: "Who is known as the father of modern physics?", options: ["Isaac Newton", "Albert Einstein", "Niels Bohr", "Galileo Galilei"], answer: "Albert Einstein" }
    ]
};

function validateUserInfo() {
    const userName = document.getElementById('user-name').value.trim();
    const userEmail = document.getElementById('user-email').value.trim();

    if (userName === "" || userEmail === "") {
        alert("Please enter your name and email to start the quiz.");
        return false;
    }
    return true;
}


function showTopicSelection() {
    if (!validateUserInfo()) {
        return; 
    }

    document.getElementById('welcome-page').style.display = 'none';
    document.getElementById('topic-selection-page').style.display = 'block';
}


function startQuiz(topic) {
    if (!validateUserInfo()) {
        return; 
    }

    currentTopic = topics[topic];
    currentQuestionIndex = 0;
    correctAnswers = 0;
    wrongAnswers = 0;
    totalAttempts = 0;
    incorrectQuestions = [];

    document.getElementById('topic-selection-page').style.display = 'none';
    document.getElementById('quiz-page').style.display = 'block';
    showQuestion();
}


function showQuestion() {
    if (currentQuestionIndex < currentTopic.length) {
        const question = currentTopic[currentQuestionIndex];
        document.getElementById('question').innerText = question.question;

        const optionsContainer = document.getElementById('options-container');
        optionsContainer.innerHTML = '';

        question.options.forEach(option => {
            const optionButton = document.createElement('button');
            optionButton.innerText = option;
            optionButton.onclick = () => checkAnswer(option, optionButton);
            optionsContainer.appendChild(optionButton);
        });
    } else {
        showResults();
    }
}


function checkAnswer(selectedOption, selectedButton) {
    const question = currentTopic[currentQuestionIndex];
    totalAttempts++;

    const buttons = document.querySelectorAll('#options-container button');
    buttons.forEach(button => button.disabled = true);

    if (selectedOption === question.answer) {
        correctAnswers++;
        selectedButton.classList.add('correct');
    } else {
        wrongAnswers++;
        selectedButton.classList.add('incorrect');
        incorrectQuestions.push({
            question: question.question,
            correctAnswer: question.answer,
            yourAnswer: selectedOption
        });

        buttons.forEach(button => {
            if (button.innerText === question.answer) {
                button.classList.add('correct');
            }
        });
    }

    setTimeout(() => {
        currentQuestionIndex++;
        showQuestion();
    }, 1000);
}


function showResults() {
    document.getElementById('quiz-page').style.display = 'none';
    document.getElementById('results-page').style.display = 'block';

    const totalQuestions = currentTopic.length;
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
    const score = correctAnswers * 10;

    document.getElementById('final-name').innerText = `Name: ${document.getElementById('user-name').value}`;
    document.getElementById('final-email').innerText = `Email: ${document.getElementById('user-email').value}`;
    document.getElementById('total-questions').innerText = totalQuestions;
    document.getElementById('total-attempts').innerText = totalAttempts;
    document.getElementById('correct-answers').innerText = correctAnswers;
    document.getElementById('wrong-answers').innerText = wrongAnswers;
    document.getElementById('percentage').innerText = percentage;
    document.getElementById('score').innerText = score;
    document.getElementById('incorrect-questions').innerText = incorrectQuestions.map(iq => 
        `Q: ${iq.question} | Correct: ${iq.correctAnswer} | Your Answer: ${iq.yourAnswer}`
    ).join('\n');

    
    if (correctAnswers === totalQuestions) {
        startCelebration();
    }
}


function startCelebration() {
    const fireworksContainer = document.getElementById('fireworks-container');
    fireworksContainer.style.display = 'block';
    
    document.getElementById('celebration-sound').play();
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}


function restartQuiz() {
    document.getElementById('results-page').style.display = 'none';
    document.getElementById('welcome-page').style.display = 'block';
}


function backToWelcome() {
    document.getElementById('topic-selection-page').style.display = 'none';
    document.getElementById('welcome-page').style.display = 'block';
}


window.onload = function() {
    document.getElementById('welcome-page').style.display = 'block';
    document.getElementById('topic-selection-page').style.display = 'none';
    document.getElementById('quiz-page').style.display = 'none';
    document.getElementById('results-page').style.display = 'none';
};































// const topics = {
//     sports: [
//         { question: "What is the national sport of Canada?", options: ["Hockey", "Soccer", "Basketball", "Lacrosse"], answer: "Lacrosse" },
//         { question: "Which country won the 2018 FIFA World Cup?", options: ["France", "Croatia", "Brazil", "Germany"], answer: "France" },
//         { question: "Who holds the record for the most goals scored in a single World Cup?", options: ["Pele", "Miroslav Klose", "Diego Maradona", "Just Fontaine"], answer: "Just Fontaine" },
//         { question: "In which sport would you perform a slam dunk?", options: ["Basketball", "Volleyball", "Football", "Baseball"], answer: "Basketball" },
//         { question: "What is the length of a marathon race?", options: ["42.195 kilometers", "26.2 miles", "21 kilometers", "50 kilometers"], answer: "42.195 kilometers" }
//     ],
//     nature: [
//         { question: "What is the largest mammal in the world?", options: ["Elephant", "Blue Whale", "Giraffe", "Shark"], answer: "Blue Whale" },
//         { question: "Which is the longest river in the world?", options: ["Amazon", "Nile", "Yangtze", "Mississippi"], answer: "Nile" },
//         { question: "What type of tree do acorns come from?", options: ["Oak", "Pine", "Maple", "Birch"], answer: "Oak" },
//         { question: "Which planet is known as the Red Planet?", options: ["Mars", "Venus", "Jupiter", "Saturn"], answer: "Mars" },
//         { question: "What is the process by which plants make their own food?", options: ["Photosynthesis", "Respiration", "Transpiration", "Fermentation"], answer: "Photosynthesis" }
//     ],
//     general: [
//         { question: "Who wrote 'To Kill a Mockingbird'?", options: ["Harper Lee", "Mark Twain", "Ernest Hemingway", "F. Scott Fitzgerald"], answer: "Harper Lee" },
//         { question: "What is the capital of Japan?", options: ["Tokyo", "Seoul", "Beijing", "Bangkok"], answer: "Tokyo" },
//         { question: "What element does 'O' represent on the periodic table?", options: ["Oxygen", "Gold", "Osmium", "Oganesson"], answer: "Oxygen" },
//         { question: "Who was the first person to walk on the moon?", options: ["Neil Armstrong", "Buzz Aldrin", "Yuri Gagarin", "Michael Collins"], answer: "Neil Armstrong" },
//         { question: "What is the smallest country in the world?", options: ["Vatican City", "Monaco", "San Marino", "Liechtenstein"], answer: "Vatican City" }
//     ],
//     states: [
//         { question: "Which is the largest state in the USA by area?", options: ["Texas", "California", "Alaska", "Florida"], answer: "Alaska" },
//         { question: "Which state is known as the 'Sunshine State'?", options: ["California", "Texas", "Florida", "Arizona"], answer: "Florida" },
//         { question: "Which state is known as the 'Empire State'?", options: ["New York", "New Jersey", "California", "Nevada"], answer: "New York" },
//         { question: "Which state is the only one to have a coastline on both the Atlantic and Pacific Oceans?", options: ["California", "Florida", "Alaska", "Washington"], answer: "Alaska" },
//         { question: "What is the capital of Texas?", options: ["Austin", "Houston", "Dallas", "San Antonio"], answer: "Austin" }
//     ],
//     religion: [
//         { question: "Which religion follows the teachings of Buddha?", options: ["Hinduism", "Buddhism", "Christianity", "Islam"], answer: "Buddhism" },
//         { question: "What is the holy book of Islam?", options: ["Bible", "Quran", "Vedas", "Torah"], answer: "Quran" },
//         { question: "Which religion is associated with the practice of yoga?", options: ["Hinduism", "Buddhism", "Jainism", "Sikhism"], answer: "Hinduism" },
//         { question: "In Christianity, who is considered the 'Son of God'?", options: ["Jesus Christ", "Moses", "Muhammad", "Abraham"], answer: "Jesus Christ" },
//         { question: "What is the central text of Judaism?", options: ["Torah", "Quran", "Bible", "Vedas"], answer: "Torah" }
//     ],
//     study: [
//         { question: "What is the chemical symbol for Gold?", options: ["Au", "Ag", "Pb", "Fe"], answer: "Au" },
//         { question: "What is the hardest natural substance on Earth?", options: ["Gold", "Iron", "Diamond", "Platinum"], answer: "Diamond" },
//         { question: "What planet is known as the 'Red Planet'?", options: ["Mars", "Earth", "Jupiter", "Saturn"], answer: "Mars" },
//         { question: "What is the largest organ in the human body?", options: ["Liver", "Heart", "Skin", "Lung"], answer: "Skin" },
//         { question: "Who is known as the father of modern physics?", options: ["Isaac Newton", "Albert Einstein", "Niels Bohr", "Galileo Galilei"], answer: "Albert Einstein" }
//     ]
// };



// let currentTopic = null;
// let currentQuestionIndex = 0;
// let correctAnswers = 0;
// let wrongAnswers = 0;
// let totalAttempts = 0;
// let incorrectQuestions = [];

// function showTopicSelection() {
//     document.getElementById('welcome-page').style.display = 'none';
//     document.getElementById('topic-selection-page').style.display = 'block';
// }

// function startQuiz(topic) {
//     currentTopic = topics[topic];
//     currentQuestionIndex = 0;
//     correctAnswers = 0;
//     wrongAnswers = 0;
//     totalAttempts = 0;
//     incorrectQuestions = [];

//     document.getElementById('topic-selection-page').style.display = 'none';
//     document.getElementById('quiz-page').style.display = 'block';
//     showQuestion();
// }

// function showQuestion() {
//     if (currentQuestionIndex < currentTopic.length) {
//         const question = currentTopic[currentQuestionIndex];
//         document.getElementById('question').innerText = question.question;

//         const optionsContainer = document.getElementById('options-container');
//         optionsContainer.innerHTML = '';

//         question.options.forEach(option => {
//             const optionButton = document.createElement('button');
//             optionButton.innerText = option;
//             optionButton.onclick = () => checkAnswer(option);
//             optionsContainer.appendChild(optionButton);
//         });
//     } else {
//         showResults();
//     }
// }

// function checkAnswer(selectedOption) {
//     const question = currentTopic[currentQuestionIndex];
//     totalAttempts++;

//     if (selectedOption === question.answer) {
//         correctAnswers++;
//     } else {
//         wrongAnswers++;
//         incorrectQuestions.push({
//             question: question.question,
//             correctAnswer: question.answer,
//             yourAnswer: selectedOption
//         });
//     }

//     currentQuestionIndex++;
//     showQuestion();
// }

// function showResults() {
//     document.getElementById('quiz-page').style.display = 'none';
//     document.getElementById('results-page').style.display = 'block';

//     const totalQuestions = currentTopic.length;
//     const percentage = Math.round((correctAnswers / totalQuestions) * 100);
//     const score = correctAnswers * 10;

//     document.getElementById('final-name').innerText = `Name: ${document.getElementById('user-name').value}`;
//     document.getElementById('final-email').innerText = `Email: ${document.getElementById('user-email').value}`;
//     document.getElementById('total-questions').innerText = totalQuestions;
//     document.getElementById('total-attempts').innerText = totalAttempts;
//     document.getElementById('correct-answers').innerText = correctAnswers;
//     document.getElementById('wrong-answers').innerText = wrongAnswers;
//     document.getElementById('percentage').innerText = percentage;
//     document.getElementById('score').innerText = score;
//     document.getElementById('incorrect-questions').innerText = incorrectQuestions.map(iq => 
//         `Q: ${iq.question} | Correct: ${iq.correctAnswer} | Your Answer: ${iq.yourAnswer}`
//     ).join('\n');

//     // Trigger fireworks if all questions are answered correctly
//     if (correctAnswers === totalQuestions) {
//         startCelebration();
//     }
// }

// function startCelebration() {
//     const fireworksContainer = document.getElementById('fireworks-container');
//     fireworksContainer.style.display = 'block';
//     // Play celebration sound and show confetti/fireworks
//     document.getElementById('celebration-sound').play();
//     confetti({
//         particleCount: 100,
//         spread: 70,
//         origin: { y: 0.6 }
//     });
// }

// function restartQuiz() {
//     document.getElementById('results-page').style.display = 'none';
//     document.getElementById('welcome-page').style.display = 'block';
// }

// function backToWelcome() {
//     document.getElementById('topic-selection-page').style.display = 'none';
//     document.getElementById('welcome-page').style.display = 'block';
// }

// // Code to initialize the quiz and handle page transitions
// window.onload = function() {
//     document.getElementById('welcome-page').style.display = 'block';
//     document.getElementById('topic-selection-page').style.display = 'none';
//     document.getElementById('quiz-page').style.display = 'none';
//     document.getElementById('results-page').style.display = 'none';
// };
























































// let currentQuestionIndex = 0;
// let correctCount = 0;
// let totalAttemptsCount = 0;
// let currentTopic = '';
// let userName = '';
// let userEmail = '';
// let userImage = ''; // Initialize userImage variable if used
// let incorrectQuestions = [];

// // Show topic selection page
// const startQuizButton = document.getElementById("start-quiz-button");
// if (startQuizButton) {
//     startQuizButton.addEventListener("click", showTopicSelection);
// }

// function showTopicSelection() {
//     userName = document.getElementById('user-name').value;
//     userEmail = document.getElementById('user-email').value;

//     if (userName && userEmail) {
//         document.getElementById('welcome-page').style.display = 'none';
//         document.getElementById('topic-selection-page').style.display = 'block';
//     } else {
//         alert('Please enter your name and email.');
//     }
// }

// // Start quiz for selected topic
// function startQuiz(topic) {
//     currentTopic = topic;
//     currentQuestionIndex = 0;
//     correctCount = 0;
//     totalAttemptsCount = 0;
//     incorrectQuestions = [];

//     document.getElementById('topic-selection-page').style.display = 'none';
//     document.getElementById('quiz-page').style.display = 'block';
//     document.getElementById('background-music').play();

//     showQuestion();
// }

// // Go back to the welcome page
// function backToWelcome() {
//     document.getElementById('topic-selection-page').style.display = 'none';
//     document.getElementById('welcome-page').style.display = 'block';
// }

// // Show next question
// function nextQuestion() {
//     if (currentQuestionIndex < topics[currentTopic].length) {
//         showQuestion();
//     } else {
//         showResults();
//     }
// }

// // Display a question
// function showQuestion() {
//     const question = topics[currentTopic][currentQuestionIndex];
//     document.getElementById('question').textContent = question.question;

//     const optionsContainer = document.getElementById('options-container');
//     optionsContainer.innerHTML = '';

//     question.options.forEach(option => {
//         const button = document.createElement('button');
//         button.textContent = option;
//         button.onclick = () => checkAnswer(option);
//         optionsContainer.appendChild(button);
//     });

//     const progressBar = document.getElementById('progress-bar').firstElementChild;
//     const progress = ((currentQuestionIndex + 1) / topics[currentTopic].length) * 100;
//     progressBar.style.width = `${progress}%`;
// }

// // Check if the answer is correct
// function checkAnswer(selectedOption) {
//     const question = topics[currentTopic][currentQuestionIndex];
//     totalAttemptsCount++;

//     if (selectedOption === question.answer) {
//         correctCount++;
//         document.querySelectorAll('#options-container button').forEach(button => {
//             if (button.textContent === question.answer) {
//                 button.classList.add('correct');
//             }
//         });
//     } else {
//         incorrectQuestions.push(question.question);
//         document.querySelectorAll('#options-container button').forEach(button => {
//             if (button.textContent === selectedOption) {
//                 button.classList.add('incorrect');
//             }
//             if (button.textContent === question.answer) {
//                 button.classList.add('correct');
//             }
//         });
//     }

//     currentQuestionIndex++;
//     setTimeout(nextQuestion, 1000); // Wait 1 second before showing the next question
// }
// function showResults() {
//     document.getElementById('quiz-page').style.display = 'none';
//     document.getElementById('results-page').style.display = 'block';
//     document.getElementById('background-music').pause();
//     document.getElementById('celebration-sound').play();
//     createFireworks();

//     // Update text content with correct values
//     document.getElementById('final-name').textContent = `Name: ${userName}`;
//     document.getElementById('final-email').textContent = `Email: ${userEmail}`;
    
//     // Handle user image display
//     const finalImage = document.getElementById('final-image');
//     if (userImage) {
//         finalImage.innerHTML = `<img src="${userImage}" alt="Profile Picture">`;
//     } else {
//         finalImage.innerHTML = ''; // Clear content if no image
//     }

// //     // Ensure correct values are set
//     document.getElementById('total-questions').textContent = topics[currentTopic].length || '5';
//     document.getElementById('total-attempts').textContent = totalAttemptsCount || '0';
//     document.getElementById('correct-answers').textContent = correctCount || '0';
//     document.getElementById('wrong-answers').textContent = (totalAttemptsCount - correctCount) || '0';
//     document.getElementById('percentage').textContent = totalAttemptsCount > 0 ? ((correctCount / totalAttemptsCount) * 100).toFixed(2) + '%' : '0%';
//     document.getElementById('score').textContent = correctCount || '0';
//     document.getElementById('incorrect-questions').textContent = incorrectQuestions.length ? incorrectQuestions.join(', ') : 'None';
// }


// // Restart the quiz
// function restartQuiz() {
//     document.getElementById('results-page').style.display = 'none';
//     document.getElementById('welcome-page').style.display = 'block';
//     document.getElementById('background-music').pause();
// }






    
// // Create fireworks effect
// function createFireworks() {
//     const fireworkContainer = document.getElementById('fireworks-container');
//     fireworkContainer.style.display = 'block';
//     confetti({
//         particleCount: 100,
//         spread: 70,
//         origin: { y: 0.6 }
//     });
//     setTimeout(() => fireworkContainer.style.display = 'none', 5000); // Hide fireworks after 5 seconds
// }
//  // Hide fireworks after 5 seconds


