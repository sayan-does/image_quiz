document.addEventListener("DOMContentLoaded", function () {
    const fruits = [
        // { name: 'APPLE', image: '\assets\apple.png' },
        // { name: 'BANANA', image: 'assets\banana.png' },
        // { name: 'CHERRY', image: 'assets\cherry.png' },
        // { name: 'GRAPE', image: 'assets\grape.png' },
        // { name: 'ORANGE', image: 'assets\orange.png' }

        { name: 'APPLE', image: 'apple.png' },
        { name: 'BANANA', image: 'banana.png' },
        { name: 'CHERRY', image: 'cherry.png' },
        { name: 'GRAPE', image: 'grape.png' },
        { name: 'ORANGE', image: 'orange.png' }
    ];

    let currentFruitIndex = 0;

    function loadFruit() {
        if (currentFruitIndex >= fruits.length) {
            document.getElementById('quizContainer').style.display = 'none';
            document.getElementById('completionMessage').style.display = 'block';
            return;
        }

        const selectedFruit = fruits[currentFruitIndex];
        const correctAnswer = selectedFruit.name;
        const fruitImage = document.getElementById('fruitImage');
        fruitImage.src = selectedFruit.image;

        const lettersContainer = document.getElementById('letters');
        lettersContainer.innerHTML = '';

        for (let i = 0; i < correctAnswer.length; i++) {
            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'letter';
            input.maxLength = 1;
            input.setAttribute('data-letter', correctAnswer[i]);
            lettersContainer.appendChild(input);
        }

        const inputs = document.querySelectorAll('.letter');
        const message = document.getElementById('message');

        // Clear message text and class
        message.textContent = '';
        message.className = 'message';

        inputs.forEach((input, index) => {
            input.addEventListener('input', () => {
                if (input.value.length === 1 && index < inputs.length - 1) {
                    inputs[index + 1].focus();
                }
                checkAnswer();
            });
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Backspace' && input.value.length === 0 && index > 0) {
                    inputs[index - 1].focus();
                }
            });
        });



        // function checkAnswer() {
        //     let userAnswer = '';
        //     inputs.forEach(input => {
        //         userAnswer += input.value.toUpperCase();
        //     });

        //     if (userAnswer.length === correctAnswer.length) {
        //         if (userAnswer === correctAnswer) {
        //             message.textContent = 'Well done!';
        //             message.className = 'message correct';
        //             setTimeout(() => {
        //                 currentFruitIndex++;
        //                 loadFruit();
        //             }, 1000);
        //         } else {
        function checkAnswer() {
            let userAnswer = '';
            inputs.forEach(input => {
                userAnswer += input.value.toUpperCase();
            });

            if (userAnswer.length === correctAnswer.length) {
                if (userAnswer === correctAnswer) {
                    message.textContent = 'Well done!';
                    message.className = 'message correct';
                    setTimeout(() => {
                        currentFruitIndex++;
                        loadFruit();
                    }, 1000);
                } else {
                    message.textContent = 'Try again!';
                    message.className = 'message incorrect';
                    setTimeout(() => {
                        loadFruit();
                    }, 1000);
                }
            } else {
                message.textContent = '';
            }
        }
    }

    loadFruit();
});
