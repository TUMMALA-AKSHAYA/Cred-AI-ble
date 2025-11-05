const openingPage = document.getElementById("openingPage");
const topicPage = document.getElementById("topicPage");
const gamePage = document.getElementById("gamePage");
const mapLevels = document.getElementById("mapLevels");
const completionScreen = document.getElementById("completionScreen");

const startBtn = document.getElementById("startBtn");
const topicButtons = topicPage.querySelectorAll("button");
const playMoreBtn = document.getElementById("playMoreBtn");

const popup = document.getElementById("popup");
const popupTitle = document.getElementById("popup-title");
const popupQuestion = document.getElementById("popup-question");
const answerButtons = document.getElementById("answer-buttons");
const coinCountEl = document.getElementById("coinCount");
const finalCoins = document.getElementById("finalCoins");

let currentLevel = null;
let coins = 0;
let currentTopic = null;
let levels = [];

const topicThemes = {
  "AI": { bg: "linear-gradient(135deg, #00C9FF, #92FE9D)", levelColor: "#1E90FF" },
  "Web Dev": { bg: "linear-gradient(135deg, #FF5F6D, #FFC371)", levelColor: "#FF4500" },
  "ML": { bg: "linear-gradient(135deg, #F7971E, #FFD200)", levelColor: "#FF8C00" },
  "Blockchain": { bg: "linear-gradient(135deg, #8E2DE2, #4A00E0)", levelColor: "#9400D3" }
};

const allQuestions = {
  "AI": {
    1:{q:"AI stands for?", options:["Artificial Intelligence","Automatic Input","Auto Internet"], correct:0},
    2:{q:"Which is a type of AI?", options:["Narrow AI","Wide AI","Both"], correct:0},
    3:{q:"AI is mainly used in?", options:["Robotics","Cooking","Sports"], correct:0},
    4:{q:"Machine learning is part of?", options:["AI","Web Dev","ML"], correct:0}
  },
  "Web Dev": {
    1:{q:"HTML is used for?", options:["Styling","Content Structure","Logic"], correct:1},
    2:{q:"CSS stands for?", options:["Cascading Style Sheets","Computer Style Sheets","Code Style Syntax"], correct:0},
    3:{q:"JS is used for?", options:["Behavior","Structure","Design"], correct:0},
    4:{q:"Bootstrap is a?", options:["Framework","Language","Database"], correct:0}
  },
  "ML": {
    1:{q:"ML stands for?", options:["Machine Learning","Modern Logic","Multi Layer"], correct:0},
    2:{q:"Supervised learning needs?", options:["Labeled data","Unlabeled data","No data"], correct:0},
    3:{q:"Which algorithm is ML?", options:["Linear Regression","HTML","CSS"], correct:0},
    4:{q:"ML is part of?", options:["AI","Web Dev","Blockchain"], correct:0}
  },
  "Blockchain": {
    1:{q:"Blockchain stores data in?", options:["Blocks","Files","Arrays"], correct:0},
    2:{q:"Bitcoin uses which?", options:["Blockchain","SQL","HTML"], correct:0},
    3:{q:"Blockchain is", options:["Decentralized","Centralized","Offline"], correct:0},
    4:{q:"Smart contracts run on?", options:["Blockchain","HTML","CSS"], correct:0}
  }
};

// Start Journey
startBtn.addEventListener("click", () => {
  openingPage.classList.add("hidden");
  topicPage.classList.remove("hidden");
});

// Topic Selection -> Game
topicButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    currentTopic = btn.getAttribute("data-topic");
    topicPage.classList.add("hidden");
    gamePage.classList.remove("hidden");

    // Apply theme
    document.body.style.background = topicThemes[currentTopic].bg;

    // Generate levels dynamically
    mapLevels.innerHTML = "";
    levels = [];
    for(let i=1;i<=4;i++){
      const level = document.createElement("div");
      level.classList.add("level");
      level.style.background = i===1 ? topicThemes[currentTopic].levelColor : "#ccc";
      level.style.color = i===1 ? "#fff" : "#000";
      if(i===1){ level.classList.add("unlocked"); level.setAttribute("data-status","Unlocked"); }
      else level.setAttribute("data-status","Locked");
      level.setAttribute("data-level",i);
      level.textContent = i;
      mapLevels.appendChild(level);
      levels.push(level);

      level.addEventListener("click", ()=>{
        if(level.classList.contains("unlocked")){
          currentLevel = level;
          loadQuestion(i);
          popup.style.display = "flex";
        }
      });
    }
  });
});

// Load question popup
function loadQuestion(lvlNum){
  const qObj = allQuestions[currentTopic][lvlNum];
  popupTitle.textContent = "Level " + lvlNum;
  popupQuestion.textContent = qObj.q;
  answerButtons.innerHTML = "";
  qObj.options.forEach((opt,index)=>{
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = ()=>checkAnswer(index,lvlNum);
    answerButtons.appendChild(btn);
  });
}

// Check answer
function checkAnswer(selected,lvlNum){
  const qObj = allQuestions[currentTopic][lvlNum];
  if(selected === qObj.correct){
    coins++;
    coinCountEl.textContent = coins;
    currentLevel.classList.remove("unlocked");
    currentLevel.classList.add("completed");
    currentLevel.setAttribute("data-status","Completed");
    currentLevel.style.background = "gold";

    const nextLevel = currentLevel.nextElementSibling;
    popup.style.display = "none";

    if(nextLevel){
      nextLevel.classList.add("unlocked");
      nextLevel.setAttribute("data-status","Unlocked");
      nextLevel.style.background = topicThemes[currentTopic].levelColor;
      nextLevel.style.color = "#fff";
    } else showCompletion();
  } else {
    alert("❌ Wrong Answer! Try again.");
    loadQuestion(lvlNum);
  }
}

// Show completion screen with confetti
function showCompletion(){
  finalCoins.textContent = `You collected ${coins} coins 🪙`;
  completionScreen.style.display = "flex";
  for(let i=0;i<100;i++){
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    confetti.style.left = Math.random()*window.innerWidth+"px";
    confetti.style.background = `hsl(${Math.random()*360},70%,60%)`;
    confetti.style.width = confetti.style.height = Math.random()*10+5+"px";
    confetti.style.animationDuration = 2 + Math.random()*3 +"s";
    document.body.appendChild(confetti);
    setTimeout(()=> confetti.remove(),5000);
  }
}

// Play More button resets game
playMoreBtn.addEventListener("click", ()=>{
  coins = 0;
  coinCountEl.textContent = coins;
  completionScreen.style.display = "none";
  topicPage.classList.remove("hidden");
  gamePage.classList.add("hidden");
  mapLevels.innerHTML = "";
  document.body.style.background = "linear-gradient(135deg, #89f7fe, #66a6ff)";
});

// Close popup
popup.addEventListener("click",(e)=>{ if(e.target===popup) popup.style.display="none"; });
