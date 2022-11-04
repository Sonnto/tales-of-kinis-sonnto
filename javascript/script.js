// CONSTANT VARIABLES
const storyTextElement = document.getElementById("story-text"); //game story text
const choiceButtonsElement = document.getElementById("choice-buttons"); //game choices("choice-buttons");

// State of the story/character;
let storyState = {};

//FUNCTIONS
//Game-Starting Function
function startGame() {
  storyState = {}; //State of the story, object
  showStoryText(0); //Start game on first storyText
}

//Gets the story text to be displayed
function showStoryText(storyTextIndex) {
  const storyText = storyTexts.find(
    (storyText) => storyText.pathID === storyTextIndex
  );
  //function to show the specific story that matches the pathID, which are structured as objects within the array
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
      choiceButtonsElement.appendChild(button); //overwrites the choices available at select stages of story
    }
  });
}

//function to show the choices depending on the storyState properties
function showChoice(choice) {
  return (
    choice.requiredStoryState == null || choice.requiredStoryState(storyState)
  );
}

//Choice-Selecting Function, to know which choice player chooses
function selectChoice(choice) {
  const nextStoryTextId = choice.nextText;
  storyState = Object.assign(storyState, choice.setStoryState); //takes whatever choice may have been made, if there is a state to set or item to give to character, the player (Sonnto) will receive this by adding it to the storyState object;
  showStoryText(nextStoryTextId);
}

//Array of objects which represent the different stories/pathways and choices

//beginning with 0 = intro & deaths
//beginning with 1xx = first path (canonical light/best path)
//beginnig with 2xx = second path (delayed death path)
//beginning with 3xx = third path (dark path)
const storyTexts = [
  // INTRO
  {
    pathID: 0,
    text: "Kinis Sonnto was a Jedi Master of the Jedi Order. He has trained three apprentices in his lifetime. One successfully become a Jedi knight, one unfortunately passed away during a mission, and the first one he ever taught had turned to the dark side. There are many tales surrounding this human Jedi. This is one such tale, back when the Jedi Master was but a Jedi knight...",
    choices: [
      {
        text: ">>[experience this tale through the eyes of Jedi Knight, Kinis Sonnto]<",
        nextText: 100,
      },
    ],
  },
  // STORY DEATHS 01-
  {
    pathID: 01,
    text: "The ship's burning interior overheats the engine and the ship exlodes with you inside. You are not one with the Force.",
  },
  {
    pathID: 02,
    text: "Against all odds, you try your best to subdue the dark sided beast. Unfortunately, the rancour overpowers you and your strike team. As you continue to battle, you begin to feel the fatigue set in. It roars in confidence as it swings its large, clenched fists at you. The rancour emerges victorious as you and your team are swept away by its final offensive attack. You have become one with the Force.",
  },
  // STORY PATH 100
  {
    pathID: 100,
    text: 'You wake up in a strange location. You feel the cold, lifeless metal floor. There is a burning smell in the air and the lights are flickering - you deduce that you are within a downed ship. Your hands instantly move towards your utility belt in search of your weapon - it\'s gone.\n\n"This lightsabre is your life" - the words of your old master echoes in your mind as you scour the area in search of it. You finally come across the hilt sitting beside a collapsed pillar.',
    choices: [
      {
        text: "[take lightsabre hilt]",
        setStoryState: { lightsabre: true },
        nextText: 101,
      },
      {
        text: "[leave lightsabre hilt]",
        setStoryState: { noLightsabre: true },
        nextText: 101,
      },
    ],
  }, // STORY PATH 101
  {
    pathID: 101,
    text: "You scan your surrounding. You spot a datapad with the Jedi Order's insignia on the back. You pick it up. It reads the following:\n\n| >Name: Kinis Sonnto \n| >Rank: Jedi Knight \n| >Mission: Seek out and bring back the reported darksider on Korriban for questioning. \n| >Support: Strike Team: 3 Republic Soldiers.}\n\nYou place the datapad on your belt as you notice the blaster burns on the walls and the fire starting to spread towards the engine bay. Your Jedi senses allow you to notice three blaster rifles on the ground by the cockpit of the ship.",
    choices: [
      {
        text: "[force pull the three blasters to you and leave the ship immediately]",
        setStoryState: { blasters: true },
        nextText: 102,
      },
      {
        text: "[leave the blasters where they are and leave the ship immediately]",
        nextText: 102,
      },
      {
        text: "[stay inside the downed ship]",
        nextText: 01,
      },
      {
        text: "[move towards the cockpit and investigate]",
        nextText: 01,
      },
    ],
  },
  // STORY PATH 102
  {
    pathID: 102,
    text: "You conjure the Force and pull the blasters to you as you exit the ship. Your haste in leaving turns out for the better, as the ship exlodes behind you. You notice the three Republic soldiers coming to and getting up. You approach them.",
    choices: [
      {
        text: "[arm the three soldiers and issue your orders]",
        requiredStoryState: (currentStoryState) => currentStoryState.blasters,
        setStoryState: { blasters: false, strikeTeam: true, teamArmed: true },
        nextText: 103,
      },
      {
        text: "[issue your orders]",
        setStoryState: { blasters: true, strikeTeam: true, teamUnarmed: true },
        nextText: 103,
      },
    ],
  },
  // STORY PATH 103
  {
    pathID: 103,
    text: "Your strike team leaves the wreckage and move inside a nearby cavern. You sense a dark side aura approaching, but it comes accompanied with roars and rumbling footsteps.\n\nIt's a rancour!",
    choices: [
      {
        text: "You ignite your lightsabre and fight the rancour. Your squad provides blaster support.",
        requiredStoryState: (currentStoryState) =>
          currentStoryState.lightsabre &&
          currentStoryState.strikeTeam &&
          currentStoryState.teamArmed,
        nextText: 104,
      },
      {
        text: "Without your lightsabre, you fight off the rancour with the Force. Your squad provides blaster support.",
        requiredStoryState: (currentStoryState) =>
          currentStoryState.noLightsabre &&
          currentStoryState.strikeTeam &&
          currentStoryState.teamArmed,
        setStoryState: {
          strikeTeam: false,
          teamArmed: false,
          noStrikeTeam: true,
        },
        nextText: 200,
      },
      {
        text: "You ignite your lightsabre and fight off the rancour as part of your unarmed strike team freezes up and others scramble to strategically join the fight.",
        requiredStoryState: (currentStoryState) =>
          currentStoryState.lightsabre &&
          currentStoryState.teamUnarmed &&
          currentStoryState.strikeTeam,
        setStoryState: {
          strikeTeam: false,
          teamArmed: false,
          noStrikeTeam: true,
        },
        nextText: 200,
      },
      {
        text: "You choose to fight off the rancour with the Force only.",
        nextText: 02,
      },
    ],
  },
  // STORY PATH 104 -- DIVERGES, ADD THE REST HERE.
  {
    pathID: 104,
    text: "Your team's completely sychronized attacks bring down the formiddable beast. You have felled the rancour. You and your strike team move deeper into the cavern as you reach the end. A woman in dark robes suddenly appears out of nowhere - that is the darksider you have been searching for. She turns to face your strike team.\n\n\"You must be the one they sent to kill me. It is pitiful that the Jedi Council would send you to do their dirty work. You do realize you are but a pawn in their little quest to stay in power, do you not?",
    choices: [
      {
        text: '"Cast aside your weapon, darksider!"',
        nextText: 105,
      },
      {
        text: "[silently and confidently ready yourself for battle]",
        nextText: 105,
      },
      {
        text: '"You are to be brought before the Jedi Council for questioning. I suggest you co-operate or we will be required to use force."',
        nextText: 105,
      },
      {
        text: "[without a word, you summon the Force against the darksider]",
        nextText: 105,
      },
    ],
  },
  // STORY PATH 105
  {
    pathID: 105,
    text: 'You muster up the Force send the energy towards the darksider. She abruptly dissipates your attack and launches towards you and your team. The darksider sends your strike team to the ground with the Force. Before she can finish them off, your intercept her lightsabre strike with your own. The two of you lock blades. As your strike team recovers, they open fire on the dark side Force user. You break off with the darksider as she is forced to defelct the incoming blaster fire. Catching her off guard, you disarm her. Defeated, she kneels before your blade.\n\n"End my life. Kill me. I do not wish to be tortured and interrogated at the pleasure of your pathetic council."',
    choices: [
      {
        text: '[you arrest the darksider, ordering your strike team to place stun cuffs on her] - "We will quickly uncover the truth to all of this. First, with your arrest. You will be brought before the Council for questioning."',
        nextText: 106,
      },
      {
        text: "[execute the darksider] - Evil does not deserve to live.",
        nextText: 300,
      },
    ],
  },
  // STORY PATH 106 - END FOR NOW - GOOD ENDING
  {
    pathID: 106,
    text: "You and your strike team escorts the now-subdued darksider to an open area. You make contact with the Jedi High Council back at Coruscant and signal for a transport ship to be sent to your location for evacuation. As you patiently wait, you cannot help but ponderr as to how your original ship crashed...\n\nTO BE CONTNUED...",
  },
  {
    pathID: 300,
    text: 'You behead the darksider in front of your strike team. The team winches at your action. They look up at you in confusion. There is no turning back now. You lunge forward and cut down your strike team before they can fire upon you. Leave no survivors.\n\n"Once you start down the dark path, forever will it dominate your destiny, consume you it will... TO BE CONTINUED..."',
  },
];

//Starts Game
startGame();

console.log(storyState);
