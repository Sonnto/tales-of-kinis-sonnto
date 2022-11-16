// CONSTANT VARIABLES
const storyTextElement = document.getElementById("story-text"); //game story text
const choiceButtonsElement = document.getElementById("choice-buttons"); //game choices("choice-buttons")
const storyEnviroElement = document.getElementById("enviro-image"); //game environment image

// State of the story/character;
let storyState = {};

//FUNCTIONS
//Story-Starting Function
function startStory() {
  storyState = {}; //State of the story, object
  loadStoryDetails(0); //Start game on intro storyDetails
}

//Gets the story details to be displayed
function loadStoryDetails(storyDetailIndex) {
  //loads next text associated with the choice made/part of story
  const scene = storyDetails.find((scene) => scene.pathID === storyDetailIndex);
  //show the specific story that matches the pathID, which are structured as objects within the array
  storyTextElement.innerText = scene.text; //replace previous text with text based off pathID
  // console.log(scene);
  storyEnviroElement.src = `/images/${scene.environment}`; //gets environment associated with pathID.

  //remove other choices after it has been selected
  while (choiceButtonsElement.firstChild) {
    choiceButtonsElement.removeChild(choiceButtonsElement.firstChild);
  }
  //loads the choices associated with the previous choice made and next story
  scene.choices.forEach((choice) => {
    if (showChoice(choice)) {
      //check to see if can see choices, if so execute
      const button = document.createElement("button");
      button.innerText = choice.text;
      button.classList.add("button");
      button.addEventListener("click", () => selectChoice(choice));
      choiceButtonsElement.appendChild(button); //overwrites the choices available at select stages of story
    }
  });
  //loads next environment associated with the choice made/part of story
  // const storyEnviro = storyDetails.find(
  //   (storyEnviro) => storyEnviro.pathID === storyDetailIndex
  // );
  // console.log("this: " + storyEnviroElement);
  // storyEnviroElement.innerHTML = storyEnviro.environment;
  // console.log("now this: " + storyEnviroElement);
  /* ABOVE PART OF FUNCTION REQUIRES WORK
   * Current issue: when entering into the storyDetails object > pathID > environment, the source that is the most "bottom" will be placed onto the .enviro-image ID.
   * Not sure as to why this is the case*/
}

//function to show the choices depending on the storyState properties
function showChoice(choice) {
  return (
    choice.requiredStoryState == null || choice.requiredStoryState(storyState)
  );
}

//Choice-Selecting Function, to know which choice player chooses
function selectChoice(choice) {
  const nextStoryDetailId = choice.nextText;
  if (nextStoryDetailId <= 0) {
    return startStory();
  }
  storyState = Object.assign(storyState, choice.setStoryState); //takes whatever choice may have been made, if there is a state to set or item to give to character, the player will receive this by adding it to the storyState object to show choices available depending on potential previous choices;
  loadStoryDetails(nextStoryDetailId);
}

//Array of objects with nested arrays and objects which represent the different stories/pathways and choices

//beginning with 0 = intro & deaths
//beginning with 1xx = first path (canonical light/best path)
//beginning with 2xx = second path (dark path)
//beginning with 3xx = slight alternate paths
const storyDetails = [
  // INTRO/MAIN SCREEN
  {
    pathID: 0,
    environment: "jedi-temple.webp",
    text: "Kinis Sonnto was a Jedi Master of the Jedi Order. He has trained three apprentices in his lifetime. One successfully become a Jedi knight, one unfortunately passed away during a mission, and the first one he ever taught had turned to the dark side. There are many tales surrounding this human Jedi. This is one such tale, back when the Jedi Master was but a Jedi knight...",
    choices: [
      {
        text: ">>[experience this tale through the eyes of Jedi Knight, Kinis Sonnto]<<",
        nextText: 100,
      },
    ],
  },
  // STORY DEATHS 01-
  {
    pathID: 01,
    text: "The ship's burning interior overheats the engine and the ship exlodes with you inside. You are now one with the Force.",
    choices: [
      {
        text: "For better or worse, this was not the choice Kinis Sonnto made. Reload the experience.",
        nextText: -1,
      },
    ],
  },
  {
    pathID: 02,
    text: "Against all odds, you try your best to subdue the dark sided beast. Unfortunately, the rancour overpowers you and your strike team. As you continue to battle, you begin to feel the fatigue set in. It roars in confidence as it swings its large, clenched fists at you. The rancour emerges victorious as you and your team are swept away by its final offensive attack. You have become one with the Force.",
    choices: [
      {
        text: "For better or worse, this was not the choice Kinis Sonnto made. Reload the experience.",
        nextText: -1,
      },
    ],
  },
  {
    pathID: 03,
    text: "Despite your best efforts, without the combined strength of your team, you were unable to overcome the dark beast. The rancour wipes out your strike team. The rancour clenches both fist and brings it down upon you. You muster what energy you have left to hold off the attack via the Force. Fatigue sets in as the beast slowly brings both its fists down on you. You have become one with the Force.",
    choices: [
      {
        text: "For better or worse, this was not the choice Kinis Sonnto made. Reload the experience.",
        nextText: -1,
      },
    ],
  },
  {
    pathID: 04,
    text: 'The Force Lightning strikes you straight on. In this moment, you feel an instant shock throughout your entire body. Try as you might, you attempt to stay focused and determined in pushing forward against the Force attack. You slowly feel your body succumb, as you feel paralyzed. The darksider follows up with a swift strike to your torso. You feel a quick searing pain in your chest. Your vision begins to fade. "You fool. You are no match for the dark side." The last words you hear, before your vision fades. You become one with the Force.',
    choices: [
      {
        text: "For better or worse, this was not the choice Kinis Sonnto made. Reload the experience.",
        nextText: -1,
      },
    ],
  },
  // STORY PATH 100
  {
    pathID: 100,
    environment: "downed-ship.jpg",
    text: 'You wake up in a strange location. You feel the cold, lifeless metal floor. There is a burning smell in the air and the lights are flickering - you deduce that you are within a downed ship. Your hand instantly move towards your utility belt in search of your weapon - it\'s gone.\n\n"This lightsabre is your life" - the words of your old master echoes in your mind as you scour the area in search of it. You finally come across the hilt sitting beside a collapsed pillar.',
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
    environment: "datapad.webp",
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
    environment: "republic-troops.webp",
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
        setStoryState: { blasters: false, strikeTeam: true, teamUnarmed: true },
        nextText: 103,
      },
    ],
  },
  // STORY PATH 103
  {
    pathID: 103,
    environment: "rancour.webp",
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
        nextText: 03,
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
        nextText: 300,
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
    environment: "female-darksider.webp",
    text: 'Your team\'s completely sychronized attacks bring down the formiddable beast. You have felled the rancour. You and your strike team move deeper into the cavern as you reach the end. A woman in dark robes suddenly appears out of nowhere - that is the darksider you have been searching for. She turns to face your strike team.\n\n"You must be the one they sent to kill me. It is pitiful that the Jedi Council would send you to do their dirty work. You do realize you are but a pawn in their little quest to stay in power, do you not?"',
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
  {
    pathID: 300,
    text: 'As you fight valiantly against the rancour, your strike team is immobilized by fear and unfortunately succumbs to the rancour. Despite your best efforts, you were unable to save them. Upon defeating the beast, you move deeper into the cavern. You slowly approach a robed figure who exudes darkness. She turns towards you.\n\nShe laughs, "You were the Jedi that they sent? You will share the fate of those who accompanied you. Only death awaits you, Jedi!',
    choices: [
      {
        text: '"Cast aside your weapon, darksider!"',
        nextText: 301,
      },
      {
        text: "[silently and confidently ready yourself for battle]",
        nextText: 301,
      },
      {
        text: '"You are to be brought before the Jedi Council for questioning. I suggest you co-operate or we will be required to use force."',
        nextText: 301,
      },
      {
        text: "[without a word, you summon the Force against the darksider]",
        nextText: 301,
      },
    ],
  },
  // STORY PATH 105 + 301 + 302
  {
    pathID: 105,
    text: 'You muster up the Force and send the energy towards the darksider. She abruptly dissipates your attack and launches towards you and your team. The darksider sends your strike team to the ground with the Force. Before she can finish them off, your intercept her lightsabre strike with your own. The two of you lock blades. As your strike team recovers, they open fire on the dark side Force user. You break off with the darksider as she is forced to defelct the incoming blaster fire. Catching her off guard, you disarm her. Defeated, she kneels before your blade.\n\n"End my life. Kill me. I do not wish to be tortured and interrogated at the pleasure of your pathetic council."',
    choices: [
      {
        text: '[you arrest the darksider, ordering your strike team to place stun cuffs on her] - "We will quickly uncover the truth to all of this. First, with your arrest. You will be brought before the Council for questioning."',
        nextText: 106,
      },
      {
        text: "[execute the darksider] - Evil does not deserve to live.",
        nextText: 200,
      },
    ],
  },
  {
    pathID: 301,
    text: 'You muster up the Force and send the energy towards the darksider. She abruptly dissipates your attack and launches towards you. You bring up your blade just in time to block her attack. Your blue lightsabre blade crackles and hums as it meets her red blade. Thanks to your master\'s training, your skills surpass that of hers, even if only slightly.\n\n"Jedi are weak. Let me show you the power of the dark side!" The darksider sends a wave of Force eneriges towards you, catching you off guard and pushing you back. She then skilfully follows-up by manipulating the Force to manifest in a lightning current.',
    choices: [
      {
        text: "[bring your lightsabre blade up in a defensive manoeuvre to block the incoming Force attack]",
        nextText: 302,
      },
      {
        text: "[take on the full force of the lightning attack]",
        nextText: 04,
      },
    ],
  },
  {
    pathID: 302,
    text: "You successfully block the attack. You push towards the attacker and deflect the lightning towards the side of the cavern. The lightning strikes the wall and dust flies into the air, obscuring your vision. As the dust settles, you see the red blade come into view, you deactivate your lightsabre and use the Force to leap towards the attacker. You grab their lightsabre hand and twist it. With your lightsabre hand, you ignite your blade and cut off their weapon hand. She falls to her knees in defeat as you bring your blade to her neck.",
    choices: [
      {
        text: '"You are under arrest, ma\'am. You will go before the Council to explain yourself."',
        nextText: 303,
      },
      {
        text: "[execute the darksider] - Evil does not deserve to live.",
        nextText: 201,
      },
    ],
  },
  // STORY PATH 106 + 200 + 303 - END FOR NOW FOR DARK PATH AND MERGE OF ALT PATH WITH LIGHT PATH
  {
    pathID: 106, //canonical light ending - continue when possible
    text: "You and your strike team escort the now-subdued darksider to an open area. You make contact with the Jedi High Council back on Coruscant and signal for a transport ship to be sent to your location for evacuation. As you patiently wait for the arrival of the new transport, you cannot help but wonder as to how your original ship crashed...\n\nTO BE CONTINUED...",
    choices: [
      {
        text: "Reload the experience.",
        nextText: -1,
      },
    ],
  },
  {
    pathID: 200, //dark ending - continue when possible
    text: 'You behead the darksider. The team winces at your action. They look up at you in confusion. There is no turning back now. In a swift follow-up strike, you cut down your strike team before they can fire upon you, leaving no witnesses.\n\n"Once you start down the dark path, forever will it dominate your destiny, consume you it will..." TO BE CONTINUED...',
    choices: [
      {
        text: "Reload the experience.",
        nextText: -1,
      },
    ],
  },
  {
    pathID: 303, //alt light ending - continue with other light ending
    text: "You escort the now-subdued darksider to an open area. You make contact with the Jedi High Council back on Coruscant and signal for a transport ship to be sent to your location for evacuation. As you patiently wait for the arrival of the new transport, you cannot help but wonder as to how your original ship crashed...\n\nTO BE CONTINUED...",
    choices: [
      {
        text: "Reload the experience.",
        nextText: -1,
      },
    ],
  },
  {
    pathID: 201, //dark ending 2 - continue with other dark ending
    text: 'You behead the darksider. You justify it in your head - she caused the death of your team, others, and potentialyl more if you do not end her carnage here. There is no turning back now.\n\n"Once you start down the dark path, forever will it dominate your destiny, consume you it will..." TO BE CONTINUED...',
    choices: [
      {
        text: "Reload the experience.",
        nextText: -1,
      },
    ],
  },
  // CONTINUE HERE FOR LATER
];

// console.log(`This is the state of the story: ${storyState}`),
//Starts Story Game
startStory();

/*IMAGE CITATIONS
 * jedi-order-emblem.svg = https://static.wikia.nocookie.net/starwars/images/9/9d/Jedi_symbol.svg/revision/latest?cb=20080329163323
 * jedi-temple.webp = https://static.wikia.nocookie.net/starwars/images/f/f0/JediTemple-Deceived.jpg/revision/latest?cb=20220312224740
 * downed-ship.jpg = https://i.pinimg.com/564x/7d/ce/d9/7dced9750710e39237d41e4997529eea.jpg
 * datapad.webp = https://static.wikia.nocookie.net/starwars/images/1/17/Coronet_cargo_manifest.png/revision/latest/scale-to-width-down/1000?cb=20120906220411
 * republic-troops.webp = https://static.wikia.nocookie.net/starwars/images/4/4e/MandalorianWarsRepublicTrooper.jpg/revision/latest?cb=20100806215611
 * rancour.webp = https://natureaccordingtosam.files.wordpress.com/2022/03/rancor-3d-model-stl.jpg?w=1200
 *  female-darksider.webp = https://lumiere-a.akamaihd.net/v1/images/image_9bbcbd86.jpeg?height=354&region=0%2C0%2C1920%2C1080&width=630
 *
 *
 *
 *
 */
