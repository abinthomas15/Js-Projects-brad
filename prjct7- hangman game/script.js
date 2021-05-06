  const wordEL = document.getElementById('word');
  const wrongLettersEl = document.getElementById('wrong-letters');
  const playAgainBtn = document.getElementById('play-button');
  const popup = document.getElementById('popup-container');
  const notification = document.getElementById('notification-container');
  const finalMessage = document.getElementById('final-message');

  const figureParts = document.querySelectorAll('.figure-part');

  const words = ['application', 'programming', 'interface', 'wizard'];

  let selectWord = words[Math.floor(Math.random() * words.length)];

  const correctLetters = [];
  const wrongLetters = [];

  function displayWord() {
    wordEL.innerHTML = `
      ${selectWord
      .split('')
      .map(letter => `
        <span class="letter">
          ${correctLetters.includes(letter) ? letter : ''}
        </span>
      `).join('')
      }
    `;
    const innerWord = wordEL.innerText.replace(/\n/g, '')
    if(innerWord === selectWord){
      finalMessage.innerText = 'congratulations you won!'
      popup.style.display = flex;
    }
  }

  // Update the wrong letters
  function updateWrongLettersEl() {
    // Display the wrong letters
    wrongLettersEl.innerHTML = `
      ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
      ${wrongLetters  .map(letter => `<span>${letter}</span>`)}
    `;

    // Display the parts
    figureParts.forEach((part, index) => {
      const errors = wrongLetters.length

      if(index < errors) {
        part.style.display = 'block';
      } else {
        part.style.display = 'none'
      }
    });
    // Check if lost
    if(wrongLetters.length === figureParts.length) {
      finalMessage.innerText = 'Unfortunately you lost';
      popup.style.display = 'flex'
    }
  }

  // show notifications
  function showNotifications() {
    notification.classList.add('show');

    setTimeout( () => {
      notification.classList.remove('show');
    }, 1500)
  }

  // Key down letter press
  window.addEventListener('keydown', (e) => {
    // console.log(e.keyCode) 
    if(e.keyCode >= 65 && e.keyCode <=90) {
      const letter = e.key;
      
      if(selectWord.includes(letter)) {
        if(!correctLetters.includes(letter)){
          correctLetters.push(letter)

          displayWord();
        } else {
          showNotifications();
        }
      } else {
        if(!wrongLetters.includes(letter)){
          wrongLetters.push(letter);

          updateWrongLettersEl();
        } else {
          showNotifications();
        }
      }
    }
  });

  // Restart and play again
    playAgainBtn.addEventListener('click', () => {
    // Empty arrays
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectWord = words[Math.floor(Math.random() * words.length)];
    displayWord();

    updateWrongLettersEl();

    popup.style.display = 'none';
  })
  displayWord();