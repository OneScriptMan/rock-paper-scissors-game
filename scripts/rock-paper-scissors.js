let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties:0
  };

  let humanMove = JSON.parse(localStorage.getItem('humanMove')) || 'Первая игра';

  let computerMove = JSON.parse(localStorage.getItem('computerMove')) || 'Первая игра';

  document.querySelector ('.js-move').innerHTML = `Вы выбрали 
  <img src="${humanMove}-emoji.png">  - Компьютер выбрал <img src="${computerMove}-emoji.png"> `;

  let result = JSON.parse(localStorage.getItem('result')) || 'Первая игра';
  
  document.querySelector ('.js-result').innerHTML = `${result}`;

  document.querySelector('.js-reset-button').addEventListener('click', () => {
    resetFunction();
  });
 
    let isAutoPlaying = false;
    let intervalId;

    document.querySelector('.js-func-button').addEventListener('click', () => {
      autoPlay();
    });


    function autoPlay(){
      if (!isAutoPlaying){
        intervalId = setInterval(() => {
        let autoHumanMove = pickComputerMove();
        playGame(autoHumanMove);
        }, 1000);
        isAutoPlaying = true;
        document.querySelector('.js-func-button').innerHTML =
        `<button class="stop-button" >Стоп</button>`;
      }
      else {
        clearInterval(intervalId);
        isAutoPlaying = false;
        document.querySelector('.js-func-button').innerHTML =
        `<button class="func-button js-func-button" onclick="
        autoPlay();
        ">
          Автоигра
        </button>`;
      }
   }

   document.querySelector('.js-rock-button').addEventListener('click', () => {
     playGame('Rock');
   });

   document.querySelector('.js-paper-button').addEventListener('click', () => {
    playGame('Paper')
   })

   document.querySelector('.js-scissors-button').addEventListener('click', () => {
    playGame('Scissors')
   } )

  function updateScoreElement()
  {document.querySelector('.js-score')
  .innerHTML = `Победы: ${score.wins}, Проигрыши: ${score.losses}, Ничьи: ${score.ties}`;}

  updateScoreElement();

  // Владимир: добавляем возможность играть кнопками к, н, б, а. Backspace - сброс
   document.body.addEventListener('keydown', (event) => {
    if (event.key === 'к'){
      playGame('Rock');
    }
   })

   document.body.addEventListener('keydown', (event) => {
    if (event.key === 'б'){
      playGame('Paper');
    }
   })

  document.body.addEventListener('keydown', (event) => {
    if (event.key === 'н'){
      playGame('Scissors');
    }
  } )

  document.body.addEventListener('keydown', (event) => {
    if (event.key === 'а'){
      autoPlay();
    }
  });

  document.body.addEventListener('keydown', (event) => {
    if (event.key === 'Backspace') {
      resetFunction();
    }
  } )
  ///////////////

  function playGame(humanMove){
  let randomNumber = '';
  let result = '';
  let computerMove = pickComputerMove();

  /*pickComputerMove();*/

  if (humanMove === 'Scissors')
    {if (humanMove === computerMove)
    {result = 'У Вас ничья';}
    else if (computerMove === 'Rock')
    {result = 'Вы проиграли';}
    else {result = 'Вы выиграли';}
  }
  else if (humanMove === 'Paper')
    {if (humanMove === computerMove)
    {result = 'У Вас ничья';}
    else if(computerMove === 'Rock')
    {result = 'Вы выиграли';}
    else {result = 'Вы проиграли';}
  }
  else if (humanMove === 'Rock')
    {if (humanMove === computerMove)
    {result = 'У Вас ничья';}
    else if (computerMove === 'Paper'){result = 'Вы проиграли';}
    else {result = 'Вы выиграли';}
    
  }

  document.querySelector ('.js-result').innerHTML = `${result}`;

  localStorage.setItem('result', JSON.stringify(result));

  document.querySelector ('.js-move').innerHTML = `Вы выбрали 
  <img src="${humanMove}-emoji.png">  - Компьютер выбрал <img src="${computerMove}-emoji.png"> `;


  if (result === 'Вы выиграли')
  {score.wins = score.wins + 1;}
  else if (result === 'Вы проиграли')
  {score.losses = score.losses + 1;}
  else if (result === 'У Вас ничья') 
  {score.ties = score.ties + 1;}

  localStorage.setItem(
    'score', JSON.stringify(score)
  );

 
  localStorage.setItem('computerMove', JSON.stringify(computerMove));
  localStorage.setItem('humanMove', JSON.stringify(humanMove));

  console.log (score);

  updateScoreElement();

  }
  
  function pickComputerMove(){
    let computerMove = '';
    randomNumber = Math.random();
    if(randomNumber >=0 && randomNumber < 1/3)
    {computerMove = 'Rock';}
    else if (randomNumber >= 1/3 && randomNumber < 2/3)
    {computerMove = 'Paper';}
    else {computerMove = 'Scissors';}
    console.log(computerMove);

    return computerMove;
  }

  //Владимир: добавляем запрос на подтверждение сброса счета (reset)
  resetFunction = () => {
    document.querySelector('.js-reset-confirmation').innerHTML = 
    `<p class="reset-confirmation-message">
    Вы уверены, что хотите сбросить результаты?
    </p>
    <button class="reset-confirmation-button js-reset-button-yes">
      Да
    </button>
    <button class="reset-confirmation-button js-reset-button-no">
      Нет
    </button>`;
    document.querySelector('.js-reset-button-yes').addEventListener('click', () => {
      score.wins=0;
      score.losses=0;
      score.ties=0;
      localStorage.removeItem('score');
      updateScoreElement();
      document.querySelector('.js-reset-confirmation').innerHTML = '';
    });
  
    document.querySelector('.js-reset-button-no').addEventListener('click', () => {
      document.querySelector('.js-reset-confirmation').innerHTML = '';
    });
  };

 