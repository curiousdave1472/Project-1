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
  document.querySelector('.click').addEventListener('click', function() {
  const answerDiv = document.querySelector('.answer-text');
  
  if (answerDiv.style.display === 'none') {
    answerDiv.style.display = 'block';
    this.textContent = 'Hide answer';
  } else {
    answerDiv.style.display = 'none';
    this.textContent = 'Click here for answer';
  }
});
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
}

function getNextQuestion() {
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
}

// TODO: Once you implement the above, you can uncomment out the line below.
// getQuestionRandom();

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
}

async function getCategories() {
  // TODO: This will get a list of categories from the API to display on our page.
  //
  // Complete this function so that it makes an API call to the /categories endpoint.
  // Then await the json response and appendAllCategoriesToHTML using the function
  // defined above.
  //
  // Write your code below
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
}

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
}

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
}
