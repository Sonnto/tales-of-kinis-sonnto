// CONSTANT VARIABLES
const storyTextElement = document.getElementById("story-text"); //game story text
const choiceButtonsElement = document.getElementById; //game choices("choice-buttons");

//Sonnto (Character) state, items, etc;
let sonnto = {};

//FUNCTIONS
//Game-Starting Function
function startGame() {
  sonnto = {}; //Character, Kinis Sonnto, object
  showStoryText(1);
}

//Gets the story text to be displayed
function showStoryText(storyTextIndex) {
  const storyText = storyTexts.find(
    (storyText) => storyText.pathID === storyTextIndex
  );
  //arrow function to show the specific story that matches the pathID, which are structured as objects within the array
  storyTextElement.innerText = storyText.text;
  //remove other choices after it has been selected
  while (choiceButtonsElement.firstChild) {
    choiceButtonsElement.removeChild(choiceButtonsElement.firstChild);
  }

  storyText.choices.forEach(choice => {
    if (showChoice(choice)) //check to see if can see choices, if so execute
      const button = document.createElement('button');
  })
}

function showChoice(choice) {
  return true;
}

//Choice-Selecting Function, to know which choice player chooses
function selectChoice(choice) {}

//Array of objects which represent the different stories/pathways and choices
const storyTexts = [
  {
    pathID: 1,
    text: "You wake up in a strange location. You feel the cold, lifeless metal floor. There is a burning smell in the air and the lights are flickering - you deduce that you are within a downed ship. Your hands instantly move towards your belt in search of your weapon - it's gone. 'This lightsabre is your life' - the words of your old master echoes in your head as you scour the area in search of it. You finally come across the hilt sitting beside a collapsed pillar.",
    choices: [
      {
        text: "[take lightsabre]",
        setSonnto: { lightsabre: true },
        nextText: 2,
      },
      {
        text: "[leave lightsabre]",
        nextText: 2,
      },
    ],
  },
  {
    pathID: 2,
    text: "Next story text.",
    choices: [],
  },
];

//Starts Game
startGame();
