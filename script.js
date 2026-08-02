const animationArea = document.getElementById("animationArea");
const rubBtn = document.getElementById("rubBtn");
const resetBtn = document.getElementById("resetBtn");

const leftName = document.getElementById("leftName");
const rightName = document.getElementById("rightName");
const leftEmoji = document.getElementById("leftEmoji");
const rightEmoji = document.getElementById("rightEmoji");
const leftCharge = document.getElementById("leftCharge");
const rightCharge = document.getElementById("rightCharge");
const leftLabel = document.getElementById("leftLabel");
const rightLabel = document.getElementById("rightLabel");
const electronCount = document.getElementById("electronCount");
const chargeMeter = document.getElementById("chargeMeter");
const insightBox = document.getElementById("insightBox");
const quizFeedback = document.getElementById("quizFeedback");
const quizOptions = document.querySelectorAll(".quiz-option");
const spark = document.getElementById("spark");
const leftCard = document.getElementById("leftCard");
const rightCard = document.getElementById("rightCard");
const stages = [document.getElementById("stage1"), document.getElementById("stage2"), document.getElementById("stage3")];
const funFact = document.getElementById("funFact");
const startBtn = document.getElementById("startBtn");
const backHomeBtn = document.getElementById("backHomeBtn");
const confirmSelectionBtn = document.getElementById("confirmSelectionBtn");
const changeSelectionBtn = document.getElementById("changeSelectionBtn");
const goHomeBtn = document.getElementById("goHomeBtn");
const homeView = document.getElementById("homeView");
const selectionView = document.getElementById("selectionView");
const simulationView = document.getElementById("simulationView");
const selectionSummary = document.getElementById("selectionSummary");
const selectedPairChip = document.getElementById("selectedPairChip");
const simulationTitle = document.getElementById("simulationTitle");
const simulationSubtitle = document.getElementById("simulationSubtitle");
const explanationText = document.getElementById("explanationText");
const pairCards = document.querySelectorAll(".pair-card");
let selectedPair = null;

const materialProfiles = {
  "balloon-wool": {
    left: "Wool",
    right: "Balloon",
    leftEmoji: "🧶",
    rightEmoji: "🎈",
    leftLabel: "Wool Charge:",
    rightLabel: "Balloon Charge:",
    leftChargeText: "Positive (+)",
    rightChargeText: "Negative (-)",
    insight: "Electrons move from the wool to the balloon, making the balloon negatively charged and the wool positively charged.",
    fact: "A rubbed balloon can stick to a wall because the wall polarizes and attracts the charged balloon."
  },
  "comb-hair": {
    left: "Hair",
    right: "Comb",
    leftEmoji: "💇",
    rightEmoji: "🪮",
    leftLabel: "Hair Charge:",
    rightLabel: "Comb Charge:",
    leftChargeText: "Positive (+)",
    rightChargeText: "Negative (-)",
    insight: "When a comb is rubbed through hair, electrons transfer to the comb and the hair becomes positively charged.",
    fact: "A plastic comb can make hair stand up because the charged comb pulls hair strands outward."
  },
  "glass-silk": {
    left: "Glass",
    right: "Silk",
    leftEmoji: "🧪",
    rightEmoji: "🧵",
    leftLabel: "Glass Charge:",
    rightLabel: "Silk Charge:",
    leftChargeText: "Positive (+)",
    rightChargeText: "Negative (-)",
    insight: "The glass rod loses electrons to the silk, leaving it positively charged and the silk negatively charged.",
    fact: "Glass and silk are classic materials used to show charge transfer in physics demonstrations."
  }
};

let electrons = 0;

function showView(view) {
  [homeView, selectionView, simulationView].forEach(function (item) {
    item.classList.toggle("active", item === view);
  });
}

function updateMaterialView() {
  const profile = materialProfiles[selectedPair || "balloon-wool"];
  leftName.textContent = profile.left;
  rightName.textContent = profile.right;
  leftEmoji.textContent = profile.leftEmoji;
  rightEmoji.textContent = profile.rightEmoji;
  leftLabel.textContent = profile.leftLabel;
  rightLabel.textContent = profile.rightLabel;
  selectedPairChip.textContent = `Selected pair: ${profile.left} & ${profile.right}`;
  simulationTitle.textContent = `${profile.left} & ${profile.right} Experiment`;
  simulationSubtitle.textContent = `Observe how friction creates static electricity between ${profile.left.toLowerCase()} and ${profile.right.toLowerCase()}.`;
  explanationText.textContent = `${profile.insight} This is a classic example of charge transfer through friction.`;
  insightBox.innerHTML = `<strong>${profile.left}</strong> and <strong>${profile.right}</strong> are now ready for a charge transfer simulation.<br>${profile.insight}`;
  funFact.textContent = profile.fact;
}

function updateStages() {
  stages.forEach(function (stage, index) {
    let active = false;
    if (index === 0 && electrons >= 0) active = true;
    if (index === 1 && electrons >= 3) active = true;
    if (index === 2 && electrons >= 7) active = true;
    stage.classList.toggle("active", active);
  });
}

function resetSimulation() {
  electrons = 0;
  electronCount.textContent = "0";
  chargeMeter.style.width = "0%";
  leftCharge.textContent = "Neutral";
  rightCharge.textContent = "Neutral";
  leftCharge.style.color = "#22324d";
  rightCharge.style.color = "#22324d";
  leftCard.classList.remove("charged");
  rightCard.classList.remove("charged");
  spark.classList.remove("active");
  insightBox.innerHTML = "Rub the objects to start the electron transfer.";
  updateStages();
}

rubBtn.addEventListener("click", function () {
  if (electrons < 10) {
    electrons++;
    electronCount.textContent = electrons;
    chargeMeter.style.width = (electrons / 10) * 100 + "%";
    updateStages();

    const electron = document.createElement("div");
    electron.classList.add("electron");
    animationArea.appendChild(electron);

    for (let i = 0; i < 3; i++) {
      const particle = document.createElement("div");
      particle.className = "electron";
      particle.style.width = "8px";
      particle.style.height = "8px";
      particle.style.background = i % 2 === 0 ? "#38bdf8" : "#f472b6";
      particle.style.top = 25 + i * 20 + "%";
      particle.style.left = "0";
      particle.style.animation = "moveElectron 0.9s linear forwards";
      animationArea.appendChild(particle);
      setTimeout(function () {
        particle.remove();
      }, 900);
    }

    spark.classList.remove("active");
    void spark.offsetWidth;
    spark.classList.add("active");

    setTimeout(function () {
      electron.remove();
    }, 1000);

    const profile = materialProfiles[materialSelect.value];
    leftCharge.textContent = profile.leftChargeText;
    rightCharge.textContent = profile.rightChargeText;
    leftCharge.style.color = "#dc2626";
    rightCharge.style.color = "#2563eb";
    leftCard.classList.add("charged");
    rightCard.classList.add("charged");
    insightBox.innerHTML = `<strong>${profile.left}</strong> becomes positively charged while <strong>${profile.right}</strong> becomes negatively charged.<br>${profile.insight}`;
  }
});

resetBtn.addEventListener("click", resetSimulation);
startBtn.addEventListener("click", function () {
  showView(selectionView);
});
backHomeBtn.addEventListener("click", function () {
  showView(homeView);
});
confirmSelectionBtn.addEventListener("click", function () {
  if (!selectedPair) {
    selectionSummary.textContent = "Please select a pair before continuing.";
    return;
  }
  updateMaterialView();
  resetSimulation();
  showView(simulationView);
});
changeSelectionBtn.addEventListener("click", function () {
  showView(selectionView);
});
goHomeBtn.addEventListener("click", function () {
  showView(homeView);
});
pairCards.forEach(function (card) {
  card.addEventListener("click", function () {
    selectedPair = card.dataset.pair;
    pairCards.forEach(function (item) {
      item.classList.toggle("selected", item === card);
    });
    const profile = materialProfiles[selectedPair];
    selectionSummary.innerHTML = `<strong>${profile.left}</strong> and <strong>${profile.right}</strong> were chosen. You can now continue to the simulation or change the selection.`;
  });
});
quizOptions.forEach(function (button) {
  button.addEventListener("click", function () {
    if (button.dataset.answer === "correct") {
      quizFeedback.textContent = "Correct! One object gains electrons while the other loses them.";
    } else {
      quizFeedback.textContent = "Not quite. Static electricity creates opposite charges on the two objects.";
    }
  });
});

updateMaterialView();
resetSimulation();
showView(homeView);
