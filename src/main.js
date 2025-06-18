import "./style.css";

// État du jeu
let flippedCards = [];
let matchedPairs = 0;
let canFlip = true;

// Images des cartes (vraies images)
const cardImages = [
  "src/Jeu Memory/animals/cat.jpeg",
  "src/Jeu Memory/animals/dog.jpeg",
  "src/Jeu Memory/animals/fox.jpeg",
  "src/Jeu Memory/animals/panda.jpeg",
  "src/Jeu Memory/animals/penguin.jpeg",
  "src/Jeu Memory/animals/tiger.jpeg",
  "src/Jeu Memory/animals/koala.jpeg",
  "src/Jeu Memory/animals/owl.jpeg",
];

// Éléments DOM
const welcomeScreen = document.getElementById("welcome-screen");
const gameScreen = document.getElementById("game-screen");
const winScreen = document.getElementById("win-screen");
const startButton = document.getElementById("start-button");
const restartButton = document.getElementById("restart-button");
const cardsGrid = document.getElementById("cards-grid");

// Gestionnaires d'événements pour les boutons
startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", startGame);

// Fonction pour démarrer le jeu
function startGame() {
  // Réinitialiser l'état du jeu
  flippedCards = [];
  matchedPairs = 0;
  canFlip = true;

  // Afficher l'écran de jeu
  welcomeScreen.classList.add("hidden");
  winScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");

  // Créer et mélanger les cartes
  const cards = [...cardImages, ...cardImages];
  shuffleArray(cards);

  // Vider et remplir la grille
  cardsGrid.innerHTML = "";
  cards.forEach((image, index) => {
    const card = createCard(image, index);
    cardsGrid.appendChild(card);
  });
}

// Fonction pour créer une carte
function createCard(image, index) {
  const card = document.createElement("div");
  card.className = "card";
  card.dataset.index = index;
  card.dataset.image = image;

  // Face avant (image)
  const front = document.createElement("div");
  front.className = "card-front";
  const img = document.createElement("img");
  img.src = image;
  img.alt = "Card";
  front.appendChild(img);

  // Face arrière
  const back = document.createElement("div");
  back.className = "card-back";
  back.innerHTML = "?";

  card.appendChild(front);
  card.appendChild(back);

  // Gestionnaire de clic
  card.addEventListener("click", () => flipCard(card));

  return card;
}

// Fonction pour retourner une carte
function flipCard(card) {
  if (
    !canFlip ||
    flippedCards.includes(card) ||
    card.classList.contains("matched")
  ) {
    return;
  }

  // Retourner la carte
  card.classList.add("flipped");
  flippedCards.push(card);

  // Vérifier si deux cartes sont retournées
  if (flippedCards.length === 2) {
    canFlip = false;
    checkMatch();
  }
}

// Fonction pour vérifier si les cartes correspondent
function checkMatch() {
  const [card1, card2] = flippedCards;
  const match = card1.dataset.image === card2.dataset.image;

  if (match) {
    // Les cartes correspondent - elles restent retournées
    card1.classList.add("matched");
    card2.classList.add("matched");
    matchedPairs++;

    // Vérifier si le jeu est terminé
    if (matchedPairs === cardImages.length) {
      setTimeout(showWinScreen, 1000);
    } else {
      // Réactiver les clics après un délai
      setTimeout(() => {
        flippedCards = [];
        canFlip = true;
      }, 500);
    }
  } else {
    // Les cartes ne correspondent pas - les retourner après un délai
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      flippedCards = [];
      canFlip = true;
    }, 1500);
  }
}

// Fonction pour afficher l'écran de victoire
function showWinScreen() {
  gameScreen.classList.add("hidden");
  winScreen.classList.remove("hidden");
}

// Fonction utilitaire pour mélanger un tableau
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Démarrer sur l'écran d'accueil
welcomeScreen.classList.remove("hidden");
