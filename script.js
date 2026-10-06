// Our default is that no category is selected.
let categoryID = null;
// For now, we'll include one hard-coded question in our question bank.
let questionBank = [
  {
    question: 'State whose license plate reads "Land of 10,000 Lakes".',
    answer: "Minnesota"
  }
];
let questionIndex = 0;

// ----------- MILESTONE 3: SHOW/HIDE ANSWER + POPULATE QUESTION FROM JS -------------

function toggleShowAnswer(e) {
  // TODO: This function is our event listener for the "show/hide answer" button.
  //
  // Complete this function so that it checks if the answer is hidden, and if so,
  // display the answer. If it is already showing, hide the answer.
  // Then, for a better user experience, also change the text inside the button
  // so that it reads "Show answer" when the answer is hidden, or "Hide answer" if the
  // answer is already showing.
  //
  // After you complete this function, remember, you'll have to add it into your HTML
  // as an onClick listener on the appropriate button.
  //
  // Write your code below
  const answerButton = document.querySelector(".btn-ans");
  const answer = document.querySelector(".answer");

  //If the answer is hidden, make the button as "Show Answer"
  if (answer.style.display === "none") {//This will display the answer when clicked
    answer.style.display = "block";
    //ANswer button text will be changed to hide answer when it "Hide answer"
    answerButton.innerText = "Hide Answer";
  } else {//If the answer is hidden, make the button "Show Answer"
    answer.style.display = "none";
    answerButton.innerText = "Show Answer";
  }
}



function populateQuestion() {
  // TODO: This function will populate the question and answer text.
  //
  // Complete this function so that it uses the question and answer
  // text from a question in the questionBank to fill in the text content
  // of the corresponding HTML elements.
  //
  // When we first implement this (before we use the API), there will only
  // be one question hard-coded in our question bank. But to build good
  // practices (and to prepare for a world where we have many questions!)
  // use the `questionIndex` variable to represent the index.
  //
  // Write your code below

  const question = questionBank[questionIndex];

  //This will pull the question from the question bank
  document.querySelector(".questionBank").textContent = question.question;
  
  //This will pull the answer text from the answer index
  document.querySelector(".answer").textContent = question.correct_answer;
}

// --------------- MILESTONE 4: POPULATE WITH RANDOM QUESTION ---------------------

function storeNewQuestions(data) {
  // TODO: This will store questions from the API into our local questionBank.
  //
  // Complete this function by assigning the data provided to us from the API
  // to our questionBank. Remember, our question bank is intended to be an array
  // of objects, with each object representing a question-answer pair. Make sure
  // we maintain that same data structure after implementing this function.
  //
  // Write your code below

  //This will store the data in the questionBank
   questionBank = data;
  //This will start from index 0
   questionIndex = 0;
}


async function getQuestionRandom() {
  // TODO: This will get a new random question from the API to display on our page.
  //
  // Complete this function so that it makes an API call to the /random endpoint.
  // Then await the json response, store it in our questionBank object using the
  // storeNewQuestions function above, and finally populate the page with the new
  // question using the populateQuestion function above.
  //
  // Write your code below

  //This will fetch the questions from the API database
  const response = await fetch("https://opentdb.com/api.php?amount=1");
  //The data fetch amy slow and told to wait for respond
  const data = await response.json();

  //This will store the questions in the data as result when fetched from API
  storeNewQuestions(data.results);
  //Pass the argument in the function
  populateQuestion();
}

 
  // TODO: This will be the event listener for our Next Question button.
  //
  // Complete this function so that it calls getQuestionRandom (defined above).
  // We should probably also hide the answer first (if it isn't already hidden)
  // So that we don't give away the answer for our new question before the user
  // gets to make a guess. :) Remember we can use the existing toggleShowAnswer
  // to do that.
  //
  // After you complete this function, remember, you'll have to add it into your
  // HTML as an onClick listener on the next question button.
  //
  // Write your code below
  

// TODO: Once you implement the above, you can uncomment out the line below.
   getQuestionRandom();

//I deleted the milestone 4  getQuestionRandom() instead of commenting out.

// --------------------- MILESTONE 5: POPULATE CATEGORIES FROM API ---------------------

function appendCategory(categoryObject, categoriesDiv) {
  // TODO: Append a new category to the categories div.
  //
  // Complete this function so that it takes a new category object returned from
  // the API, and append a new button to the categories div in your HTML correponding
  // to that category. The new button needs to include the category name as text
  // inside the element, and should also save the category id.
  // When first implemented, this new button won't be clickable, but we'll come
  // back and add that later!
  //
  // Write your code below
  
  //Create buttons for the elements from categories from the API
    const button = document.createElement("button");
  
  //This will make the button by category
    button.textContent = categoryObject.name;
  
    button.id = categoryObject.id;
  //This will place the button inside the categories
    categoriesDiv.appendChild(button);
  
  //Create event listener to pull the categories
     button.addEventListener("click", handleCategoryClick);

}

function appendAllCategoriesToHTML(categories) {
  // TODO: Given a list of category objects, iterate through and append each.
  //
  // Complete this function so that it takes a list of category objects
  // from the API, iterates through the list, and calls the appendCategory
  // function defined above for each category. You'll need to grab the
  // appropriate HTML element corresponding to the categories div to pass
  // to the appendCategory function.
  //
  // Write your code below
    const categoriesDiv = document.querySelector(".categories");
  
// Loop through each category and add it to the categories div and do once for each catogery
  categories.forEach(category => {
      appendCategory(category, categoriesDiv);
    });
}


async function getCategories() {
  // TODO: This will get a list of categories from the API to display on our page.
  //
  // Complete this function so that it makes an API call to the /categories endpoint.
  // Then await the json response and appendAllCategoriesToHTML using the function
  // defined above.
  //
  // Write your code below
  
  //This will grab all catogeries from the database
    const response = await fetch(
        "https://opentdb.com/api_category.php"
    );

    const data = await response.json();
  //Grab only 4 catogeries from the database by adding slice
    appendAllCategoriesToHTML(data.trivia_categories.slice(0,4));
  }

// TODO: Once you implement the above, you can uncomment out the line below.
// You will also want to remove the hardcoded categories written into your HTML,
// now that we're getting them dynamically.
getCategories();

// ------------------- MILESTONE 6: POPULATE QUESTIONS BY CATEGORY -------------------

async function getQuestionsByCategory(categoryID) {
  // TODO: This will get questions of a certain category from the API to display on our page.
  //
  // Complete this function so that it makes an API call to the /category endpoint.
  // We'll need to provide this endpoint a query parameter, id, so that it knows which
  // category we care about. Then await the json response, store it in our questionBank
  // object using the storeNewQuestions function we defined earlier. Finally, now that
  // our questionBank has questions from the desired category, call populateQuestion
  // to give our user a question from their selected category.
  //
  // Write your code below
  //This will fetch 10 questions from the catogery ID to the result
  const response = await fetch(
        `https://opentdb.com/api.php?amount=10&category=${categoryID}`
    );

    const data = await response.json();
  //This will store the questions in the result
    storeNewQuestions(data.results);

    populateQuestion();
}

// Create a function that highlights the category button that was selected
function highlightCategoryButton(categoryID) {
  // TODO: Change the color of a category button when it's selected.
  //
  // Complete this function so that it changes the styling of the button
  // with id of the categoryID. This could mean changing its background color,
  // underlining the text, or really anything visual that helps the user
  // easily recognize which category they currently have selected.
  //
  // You'll also want to make sure you make any prior selected buttons go
  // back to their original styling, so it doesn't look like two are selected!
  //
  // Write your code below
  
  // Find all <button> elements inside the element with the class "categories"
  const categoryButtons = document.querySelectorAll(".categories button");
  
  // Go through each category button one at a time
    categoryButtons.forEach(button => {// Remove the "category-selected" class from the button
        button.classList.remove("category-selected");
    });
    // Find the specific button whose id matches the categoryID
    const selectedButton = document.getElementById(categoryID);
    
  // Add the "category-selected" class to the selected button
    selectedButton.classList.add("category-selected");
}
    
//// Create a function that runs when a category button is clicked
function handleCategoryClick(e) {
  // TODO: This will be the event listener for our category buttons.
  //
  // Complete this function so that it triggers a change in category.
  // First, you'll need to get the id from the button element that was
  // targeted in the click event. Then, you can use this id to
  // getQuestionsByCategory.
  //
  // Don't forget to store the categoryID in our variable defined at the top
  // of this file (we'll use that soon in our refacted getNextQuestion function).
  // Also make sure that the button that was clicked appears selected using the
  // highlightCategoryButton function above.
  //
  // Write your code below
    // Get the ID of the element that was clicked and convert it from a string to a number
    categoryID = Number(e.target.id);
    // Highlight the category button that was clicked
    highlightCategoryButton(categoryID);
    //Get the question belongs to the catogery
    getQuestionsByCategory(categoryID);
}

// Refactored version of our getNext func to continue getting from category selected
function getNextQuestion() {
  // TODO: Refactor getNextQuestion to handle iterating through our questionBank
  //
  // You can either refactor the getNextQuestion function we wrote earlier, or complete
  // this one (and remove the old one.) It's up to you!
  //
  // To complete this function, we need to be able to differentiate whether we have a
  // category selected or not. If we don't, we can call the getQuestionRandom function
  // that we've defined earlier (and that our prior version of getNextQuestion
  // automatically called). If we do have a category selected, we can increment
  // our questionIndex each time we grab a question from our questionBank.
  //
  // There's also an edge case that we should handle in this function, what do we do
  // if we get to the end of our list of questions of a specific category? We could
  // start back at the beginning. Or perhaps, tell the user that we're out of questions
  // and they should select a new category. We'll leave that to you for how you'd like
  // to handle it.
  //
  // Write your code below.

  // Create a variable called "answer" that finds the HTML element with the class name "answer".
    const answer = document.querySelector(".answer");
  
  // Create a variable called "answerButton" that finds the HTML element with the class name "btn-ans".
    const answerButton = document.querySelector(".btn-ans");

  // Hide the answer element by changing its CSS display property to "none".
    answer.style.display = "none";
  
  // Change the text on the answer button back to "Show Answer".
    answerButton.innerText = "Show Answer";
  // Check if categoryID is null, meaning no specific category was selected.
    if (categoryID === null) {// If no category is selected, get a random question.
        getQuestionRandom();
    } else { // If a category is selected, increase questionIndex so we move to the next question.
        questionIndex++;
        // Check if questionIndex has reached the end of questionBank.
        if (questionIndex >= questionBank.length) {// so we start again from the first question.
            questionIndex = 0;
        }
    // Display the question at the current questionIndex.
        populateQuestion();
    }
}
//Score starts at 0 and create the variable score
let score = 0;

// To track how many questions answered, assign the variable start from 0
let questionAnswered = 0;

// Update the number of questions answered on the page
function updateQuestionsAnswered() {
    document.getElementById("questionsAnswered").innerText = questionsAnswered;
 
}
//Call the function after updating the number
updateQuestionAnswered()

//This function is to make submit answer to work with the score
let submitAnswerbtn = document.querySelector(".submitAnswer");

submitAnswerbtn.addEventListener("click",()=> {
    let userAnswer = document.getElementById("userAnswer").value;
    let correctAnswer = questionBank[questionIndex].correct_answer;

  checkAnswer(userAnswer,correctAnswer)

  //Update the question answered
  questionsAnswered++;
  //Call the function after updating
  updateQuestionsAnswered();
  });

//Create the function for score as updateScore
function updateScore() {
  document.getElementById("score").innerText = score;
  console.log("score= ",score)
}

//Now check the answer and add one point for each correct answer
function checkAnswer(userAnswer, correctAnswer) {

    if (userAnswer === correctAnswer) {
        score++;   
        updateScore(); 
        alert("Correct!");
    } else {
        alert("Wrong answer!");
    }
}



//To reset the score when done
function resetScore() {
    score = 0; updateScore();
}
resetScore(10);
