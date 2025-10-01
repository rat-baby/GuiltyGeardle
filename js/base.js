let currentEntry = "";
let characters;
let inputBox = document.querySelector(".inputBox");
let selectorBox = document.querySelector(".selectorBox");
let submitButton = document.querySelector("#submit");
let answer;


window.onload = function () {
  //adds event listener for text input
  inputBox.addEventListener("input", entry);
  submitButton.addEventListener("click", submitted);

  //retrieving array of character objects from json file and saves it to global array
  $.getJSON("data.json", (json) => {
    characters = json.characters;
    //answer = characters[Math.floor(Math.random() * 33)];
    //retrieve the JSON file with the new info and set the answer = to the generated index
    $.getJSON("answer.json", (json) => {
      let answerIndex = json.character;
      answer = characters[answerIndex];
    });
  });

  
  

}

function entry(event) {
  let charList = [];

  //maintains an internal count of contexts of text box
  //maybe can just retrieve from HTML manually without global variable?
  if (event.data != null) {
    currentEntry = currentEntry += event.data;
  } else {
    currentEntry = currentEntry.substring(0, currentEntry.length - 1);
  }

  //shows autocomplete menu
  selectorBox.innerHTML = "";
  showAutocomplete();

  searchInput = currentEntry.toLowerCase();
  //finds character names that match input, push them to a local array of matching characters
  for (let i = 0; i < characters.length; i++) {
    searchName = characters[i].name.toLowerCase();
    if (searchName.includes(searchInput)) {
      charList.push(characters[i].name);
    }
  }

  charList.sort();

  //copies contents of matching character array to the html, adds event listners
  for (let i = 0; i < charList.length; i++) {
    selectorBox.innerHTML += (`<div class='autoOption'>${charList[i]}</div>`);
  }

  let autoOptions = document.querySelectorAll('.autoOption');
  for (let i = 0; i < autoOptions.length; i++) {
    autoOptions[i].addEventListener("click", autofill)
    addHover(autoOptions[i]);
  }
  
  //ensure that it removes the box if the textbox is empty
  if (currentEntry == "") {
    selectorBox.innerHTML = "";
    hideAutocomplete();
  }
} //end text entry event handler

function autofill() {
  inputBox.value = this.innerHTML
  hideAutocomplete();
}

//TODO: research persisting entries, maybe php session variables

function submitted() {
  let selectedName = inputBox.value;
  inputBox.value = "";
  currentEntry = "";
  let resultsTable = document.querySelector(".resultsTable");
  let selectedCharacter;

  //clears autocomplete if the name is typed in manually
  //probably a better way to do it
  if (currentEntry == "") {
    hideAutocomplete();
    selectorBox.innerHTML = "";
  }

  //find selected character in global array
  selectedCharacter = characters.find((ch) => ch.name === selectedName);

  //inserting new row at the current bottom of the table
  //might have to change this, not sure how it'll play with jQuery animation
  let newRow = resultsTable.insertRow();
  let character = newRow.insertCell(0);
  let archetype = newRow.insertCell(1);
  let easeOfUse = newRow.insertCell(2);
  let season = newRow.insertCell(3);

  try {
    character.innerHTML = selectedCharacter.name;
    archetype.innerHTML = selectedCharacter.archetype;
    easeOfUse.innerHTML = selectedCharacter.easeOfUse;
    season.innerHTML = selectedCharacter.seasonAdded;

    checkAnswer(character, archetype, easeOfUse, season);
  } catch {
    console.log("Character not found");
  }

} //end submit button event handler

function checkAnswer(character, archetype, easeOfUse, season) {
  let checkedCharacter = {name: character.innerHTML, archetype: archetype.innerHTML, easeOfUse:        easeOfUse.innerHTML, seasonAdded: season.innerHTML};
  let temp = 0;

  if (checkedCharacter.name == answer.name) {
    character.classList.add('correct');
    temp++;
  } else {
    character.classList.add('incorrect');
  }

  if (checkedCharacter.archetype == answer.archetype) {
    archetype.classList.add('correct');
    temp++;
  } else {
    archetype.classList.add('incorrect');
  }

  if (checkedCharacter.easeOfUse == answer.easeOfUse) {
    easeOfUse.classList.add('correct');
    temp++;
  } else {
    easeOfUse.classList.add('incorrect');
  }

  if (checkedCharacter.seasonAdded == answer.seasonAdded) {
    season.classList.add('correct');
    temp++;
  } else {
    season.classList.add('incorrect');
  }

  if (temp == 4) {
    console.log("win");
  }
}

