// CONSTANT VARIABLES
const storyTextElement = document.getElementById("story-text"); //game story text
const choiceButtonsElement = document.getElementById("choice-buttons"); //game choices("choice-buttons");

//Sonnto (Character) state, items, etc;
let sonnto = {};

//FUNCTIONS
//Game-Starting Function
function startGame() {
  sonnto = {}; //Character, Kinis Sonnto, object
  showStoryText(1); //Start game on first storyText
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

  storyText.choices.forEach((choice) => {
    if (showChoice(choice)) {
      //check to see if can see choices, if so execute
      const button = document.createElement("button");
      button.innerText = choice.text;
      button.classList.add("button");
      button.addEventListener("click", () => selectChoice(choice));
      choiceButtonsElement.appendChild(button); //overwrites the choices available at select stages
    }
  });
}

function showChoice(choice) {
  return choice.requiredSonnto == null || choice.requiredSonnto(sonnto);
}

//Choice-Selecting Function, to know which choice player chooses
function selectChoice(choice) {
  const nextStoryTextId = choice.nextText;
  sonnto = Object.assign(sonnto, choice.setState); //takes whatever choice may have been made, if there is a state to set or item to give to character, the player (Sonnto) will receive this by adding it to the Sonnto (character) object;
  showStoryText(nextStoryTextId);
}

//Array of objects which represent the different stories/pathways and choices
const storyTexts = [
  // STORY DEATHS
  {
    pathID: 100,
    text: "The ship's burning interior overheats the engine and the ship exlodes with you inside. You have died.",
  },
  {
    pathID: 100,
    text: "Death scene 2",
  },
  // 1 STORY CARD
  {
    pathID: 1,
    text: 'You wake up in a strange location. You feel the cold, lifeless metal floor. There is a burning smell in the air and the lights are flickering - you deduce that you are within a downed ship. Your hands instantly move towards your utility belt in search of your weapon - it\'s gone.\n\n"This lightsabre is your life" - the words of your old master echoes in your mind as you scour the area in search of it. You finally come across the hilt sitting beside a collapsed pillar.',
    choices: [
      {
        text: "[take lightsabre hilt]",
        setSonnto: { lightsabre: true },
        nextText: 2,
      },
      {
        text: "[leave lightsabre hilt]",
        nextText: 2,
      },
    ],
  }, // 2 STORY CARD
  {
    pathID: 2,
    text: "You scan your surrounding. You spot a datapad with the Jedi Order's insignia on the back. You pick it up. It reads the following:\n\n| >Name: Kinis Sonnto \n| >Rank: Jedi Knight \n| >Mission: Seek out and neutralize reported dark sider on Nar Shaddaa. \n| >Support: Strike Team: 3 Republic Soldiers.}\n\nYou place the datapad on your belt as you notice the blaster burns on the walls and the fire starting to spread towards the engine bay. Your Jedi senses allow you to notice three blaster rifles on the ground by the cockpit of the ship.",
    choices: [
      {
        text: "[force pull the three blasters to you and leave the ship immediately]",
        setSonnto: { blasters: true },
        nextText: 3,
      },
      {
        text: "[leave the blasters where they are and leave the ship immediately]",
        nextText: 3,
      },
      {
        text: "[stay inside the downed ship]",
        nextText: 100,
      },
      {
        text: "[move towards the cockpit and investigate]",
        nextText: 100,
      },
    ],
  },
  {
    pathID: 3,
    text: "You conjure the Force and pull the blasters to you as you exit the ship. Your haste in leaving turns out for the better, as the ship exlodes behind you. You notice the three Republic soldiers coming to and getting up. You approach them.",
    choices: [
      {
        text: "[Give the three blasters to each soldier.",
        requiredSonnto: (currentSonnto) => currentSonnto.blasters,
        setSonnto: { blasters: false, soldiersArmed: true },
        nextText: 4,
      },
    ],
  },
];

//Starts Game
startGame();

console.log(sonnto);
