/**
 * Example store structure
 */
const store = {
  // 5 or more questions are required
  questions: [
    {
      question: 'In the 1936 Olympics how many gold medals did Jesse Owens win?',
      answers: [
        '4',
        '2',
        '3',
        '5'
      ],
      correctAnswer: '4'
    },
    {
      question: 'In 1960 Abebe Bikila won the marathon at the Olympics.  What brand of shoes was he wearing?',
      answers: [
        'Nike',
        'Adidas',
        'Brooks',
        'He was Barefoot'
      ],
      correctAnswer: 'He was Barefoot'
    },
    {
      question: 'At the 1996 Olympics what two events did Michael Johnson win?',
      answers: [
        '100m/200m',
        '100m/400m',
        '200m/400m',
        '200m/Long Jump'
      ],
      correctAnswer: '200m/400m'
    },
    {
      question: 'Steve Prefontaine is noted as one of the greatest American distance runners of all time.  What place did he finish in the 1972 Olympic 5,000m race?',
      answers: [
        '1st',
        '2nd',
        '3rd',
        '4th'
      ],
      correctAnswer: '4th'
    },
    {
      question: 'Usin Bolt won gold in the 100m and 200m races in how many Olympics?',
      answers: [
        '3',
        '1',
        '4',
        '2'
      ],
      correctAnswer: '3'
    },
    {
      question: 'What event did Carl Lewis win in four straight Olympics?',
      answers: [
        '100m',
        '200m',
        'Long Jump',
        '400m'
      ],
      correctAnswer: 'Long Jump'
    },
    {
      question: 'At which Olympics did Florence Griffith Joyner (Flo-Jo) win 3 gold medals.',
      answers: [
        '1992',
        '1988',
        '1992',
        '1984'
      ],
      correctAnswer: '1988'
    },
    {
      question: 'Allyson Felix has been a part of how many 4x400m gold medal Olympic teams?',
      answers: [
        '0',
        '1',
        '2',
        '3'
      ],
      correctAnswer: '3'
    }
  ],
  questionNumber: 0,
  totalCorrect: 0,
  startQuiz: false,
  userAnswers: []
};

/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material and access support for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

function welcomeString(){
  return `
  <img src="olympic-rings.png" alt="olympic rings">
  <form id="start-quiz">  
    <p>Please click the "Submit" button to start the quiz.</p>
    <button type="submit" id="start-quiz">Start Quiz</button>
  </form>
  `;
}

function quizQuestionTemplate(){
  const currentQuestionData = store.questions[store.questionNumber];
  const currentQuestion = currentQuestionData.question;
  return `
  <img src="olympic-rings.png" alt="olympic rings">
  <p>Question ${store.questionNumber + 1} of ${store.questions.length}</p>
  <form class="quiz-question" id="quiz-question">
  <p>${currentQuestion}</p>
     <ol type="A">
      ${currentQuestionData.answers.map((answer, i) => `<li>
      <div>
        <input type="radio", name="q${store.questionNumber}", value="${answer}" unchecked>
        <label class="option-${i}">${answer}</label>
      </div>
    </li>`).join('')}
    </ol>
    <button type="submit" id="submit-answer">Submit</button>
</form>
<p>Total Correct: ${store.totalCorrect}</p>
  `;
}

function answerPageTemplate(){
  const currentQuestionData = store.questions[store.questionNumber];
  const currentCorrectAnswer = currentQuestionData.correctAnswer;
  const userAnswer = store.userAnswers[store.questionNumber];
  if(userAnswer === currentCorrectAnswer){
    return `
    <img src="olympic-rings.png" alt="olympic rings">
    <form>
    <p>You answered the question correctly. It was "${currentCorrectAnswer}"</p>
    <p>You've currently answered ${store.totalCorrect} out of ${store.questionNumber + 1} correct.</p> 
    <p>Please click the "Continue" button to continue the quiz.</p>
    <button type="submit" id="continue-quiz">Continue</button>
    </form>
    `;
  } else {
    return `
    <img src="olympic-rings.png" alt="olympic rings">
    <form>
    <p>You answered the question incorrectly.</p>
    <p>The correct answer was "${currentCorrectAnswer}".</p>
    <p>You've currently answered ${store.totalCorrect} out of ${store.questionNumber + 1} correct.</p>
    <p>Please click the "Continue" button to continue the quiz.</p>
    <button type="submit" id="continue-quiz">Continue</button>
    </form>
    `;
  }
}

function endOfQuizTemplate(){
  return `
  <img src="olympic-rings.png" alt="olympic rings">
  <p>You answered ${store.totalCorrect} out of ${store.questions.length} correctly.<p>
  <form class="restart-quiz">
  <p>Please click the "Restart" button to restart the quiz.</p>
  <button type="submit" id="restart-quiz">Restart Quiz</button>
  </form>
  `
}


// These functions return HTML templates

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store
function renderStartPage(){
  if(!store.startQuiz){
    $('main').html(welcomeString());
  }
}

function renderQuestionPage(){
  $('main').html(quizQuestionTemplate());
}

function renderAnswerPage(){
  $('main').html(answerPageTemplate());
}

function renderEndofQuizPage(){
  $('main').html(endOfQuizTemplate());
}

/********** EVENT HANDLER FUNCTIONS **********/

function handleQuizStart(){
  $('#start-quiz').submit(e => {
    e.preventDefault();
    console.log('quiz start button clicked');
    renderQuestionPage();
  })
}

function handleAnswerResult(){
  $('main').on('click', '#submit-answer', e => {
    e.preventDefault();
    console.log(`question ${store.questionNumber + 1} answered.`);
    const userAnswer = $('input[type="radio"]:checked').val();
    const currentCorrectAnswer = store.questions[store.questionNumber].correctAnswer
    store.userAnswers.push(userAnswer);
    if(userAnswer === currentCorrectAnswer){
      store.totalCorrect++;
    }
    // console.log(store.totalCorrect);
    renderAnswerPage();
  })
}

  function handleContinueQuiz(){
  $('main').on('click', '#continue-quiz', e => {
    e.preventDefault();
    console.log(`question ${store.questionNumber + 1} complete.`);
    if(store.questionNumber < (store.questions.length - 1)){
    store.questionNumber++;
    console.log(store.questionNumber);
    console.log(store.questions.length)
    renderQuestionPage();
    } else renderEndofQuizPage();
  })
}
  

  function handleEndOfQuiz(){
    $('main').on('click', '#restart-quiz', e => {
      e.preventDefault();
      store.questionNumber = 0;
      store.totalCorrect = 0;
      store.startQuiz = false;
      store.userAnswers = [];
      renderQuestionPage();
    })
  }

// These functions handle events (submit, click, etc)
function handleQuiz(){
  renderStartPage();
  handleQuizStart();
  handleAnswerResult();
  handleContinueQuiz();
  handleEndOfQuiz();
}

$(handleQuiz);