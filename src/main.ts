const COLOURS = {
  dark: "#444444",
  darker: "#101012",
  "dark-soft": "#8F8F8F",
  "dark-softer": "#B3B3B3",
  "dark-softest": "#D9D9D9",
  "dark-highlight": "#EEEEEE",
  "dark-superlight": "#F7F7F7",
  white: "#FDFDFD",
  red: "#FE2A22",
  "red-shadow": "#D30000",
  "red-soft": "#FF5B59",
  "red-softer": "#FFB9B8",
  "red-highlight": "#FEE8E8",
  orange: "#FF7F1A",
  "orange-shadow": "#D35000",
  "orange-soft": "#FF9B56",
  "orange-softer": "#FED4B7",
  "orange-highlight": "#FFF1E7",
  yellow: "#FED300",
  "yellow-shadow": "#A38000",
  "yellow-soft": "#FEDD50",
  "yellow-softer": "#FFF1B6",
  "yellow-highlight": "#FFF9E7",
  blue: "#239CFE",
  "blue-shadow": "#0055A4",
  "blue-soft": "#58B1FF",
  "blue-softer": "#B8DEFE",
  "blue-highlight": "#E8F4FF",
  purple: "#AD15FF",
  "purple-shadow": "#6300A5",
  "purple-soft": "#BF55FF",
  "purple-softer": "#E4B7FF",
  "purple-highlight": "#F5E7FF",
  pink: "#FE21B3",
  "pink-shadow": "#A40066",
  "pink-soft": "#FF58C4",
  "pink-softer": "#FFB8E6",
  "pink-highlight": "#FFE8F5",
  indigo: "#2A37FE",
  "indigo-shadow": "#0000A5",
  "indigo-soft": "#5B68FF",
  "indigo-softer": "#B9BFFE",
  "indigo-highlight": "#E8EAFE",
  transparent: "#FFFFFF00",
  green: "#34A853",
};
const BASE_COLOUR_LIST = [
  COLOURS.blue,
  COLOURS.purple,
  COLOURS.orange,
  COLOURS.red,
  COLOURS.pink,
];

const CLICK_WORDS = [
  "Click",
  "Click",
  "Click",
  "Click",
  "Click",
  "Click",
  "Click",
  "Click",
  "Click",
  "Click",
  "Clack",
  "LMB",
  "handleClick()",
  "console.log(“click”)",
  "clicked = true",
];
function clickAnimation(e: TouchEvent | MouseEvent) {
  // if mouseEvent
  if ("clientX" in e) {
    const pointerX = e.clientX;
    const pointerY = e.clientY;
    const animatedDiv = document.createElement("div");
    animatedDiv.style.setProperty("left", pointerX.toString() + "px");
    animatedDiv.style.setProperty("top", pointerY.toString() + "px");
    animatedDiv.style.setProperty("rotate", (Math.random() - 0.5) * 20 + "deg");
    animatedDiv.style.setProperty(
      "translate",
      (Math.random() - 0.5) * 80 +
        20 +
        "px " +
        (Math.random() - 0.5) * 80 +
        20 +
        "px",
    );
    animatedDiv.className = "click-animation";
    animatedDiv.innerHTML =
      CLICK_WORDS[Math.floor(Math.random() * CLICK_WORDS.length)];
    document.body.appendChild(animatedDiv);
    animatedDiv.addEventListener("animationend", () => animatedDiv.remove());
  }
}

window.addEventListener("click", clickAnimation);

function convertToWigglyText(id: string) {
  const el = document.getElementById(id);
  const text = el?.innerText;
  const letters = text?.split("");
  if (!el || !letters) return;
  el.innerHTML = "";
  el.classList.add("wiggle-container");
  el.addEventListener("mouseenter", () => {
    el.classList.add("hovered");
  });
  for (let i = 0; i < letters.length; i++) {
    const span = document.createElement("span");
    span.innerHTML = letters[i];
    span.style.setProperty("animation-delay", `${i * 0.08}s`);
    span.classList.add("wiggle-character");
    if (letters[i] !== " ") {
      span.style.setProperty("display", "inline-block");
    }
    el.appendChild(span);
    span.addEventListener("animationstart", () => {
      span.style.setProperty(
        "color",
        BASE_COLOUR_LIST[i % BASE_COLOUR_LIST.length],
      );
    });
    span.addEventListener("animationend", () => {
      span.style.removeProperty("color");
      if (i === letters.length - 1) {
        el.classList.remove("hovered");
      }
    });
  }
}

function convertToColourfulCharacters(id: string) {
  const el = document.getElementById(id);
  const text = el?.innerText;
  const letters = text?.split("");
  if (!el || !letters) return;
  el.innerHTML = "";
  for (let i = 0; i < letters.length; i++) {
    const span = document.createElement("span");
    span.innerHTML = letters[i];
    span.classList.add("colourful");
    span.addEventListener("mouseenter", () => {
      span.style.setProperty(
        "color",
        BASE_COLOUR_LIST[i % BASE_COLOUR_LIST.length],
      );
    });
    span.addEventListener("mouseleave", () => {
      span.style.removeProperty("color");
    });
    el.appendChild(span);
  }
}

function flipCardsForwards() {
  const cards = document.querySelectorAll(".card");
  const activeCard = document.querySelector(
    "[data-card-order='0']",
  ) as HTMLDivElement;
  if (!activeCard) return;
  activeCard.classList.add("animate-card-flip");

  setTimeout(() => {
    activeCard.style.setProperty("z-index", (-(cards.length - 1)).toString());
  }, 300);

  // Update order
  for (let i = 0; i < cards.length; i++) {
    const card = cards[i] as HTMLDivElement;
    const order = Number(card.getAttribute("data-card-order"));
    if (card.getAttribute("data-card-order") === "0") {
      card.setAttribute("data-card-order", (cards.length - 1).toString());
    } else {
      card.setAttribute("data-card-order", (order - 1).toString());
      setTimeout(() => {
        card.style.setProperty("z-index", (-(order - 1)).toString());
      }, 300);
    }
  }

  activeCard.addEventListener("animationend", () => {
    activeCard.classList.remove("animate-card-flip");
  });
}

function flipCardsBackwards() {
  const cards = document.querySelectorAll(".card");
  const lastCard = document.querySelector(
    `[data-card-order='${cards.length - 1}']`,
  ) as HTMLDivElement;
  if (!lastCard) return;
  lastCard.classList.add("animate-card-flip");

  setTimeout(() => {
    lastCard.style.setProperty("z-index", "0");
  }, 300);

  // Update order
  for (let i = 0; i < cards.length; i++) {
    const card = cards[i] as HTMLDivElement;
    const order = Number(card.getAttribute("data-card-order"));
    if (
      card.getAttribute("data-card-order") === (cards.length - 1).toString()
    ) {
      card.setAttribute("data-card-order", "0");
    } else {
      card.setAttribute("data-card-order", (order + 1).toString());
      card.style.setProperty("z-index", (-(order + 1)).toString());
    }
  }

  lastCard.addEventListener("animationend", () => {
    lastCard.classList.remove("animate-card-flip");
  });
}

function setupCards() {
  const cards = document.querySelectorAll(".card");
  for (let i = 0; i < cards.length; i++) {
    const card = cards[i] as HTMLDivElement;
    card.style.setProperty("z-index", (-i).toString());
    card.setAttribute("data-card-order", i.toString());
  }
  const forwardsButton = document.getElementById("card-forwards-button");
  const backwardsButton = document.getElementById("card-backwards-button");
  if (!forwardsButton || !backwardsButton) return;
  forwardsButton.onclick = flipCardsForwards;
  backwardsButton.onclick = flipCardsBackwards;
}

convertToWigglyText("name");
convertToColourfulCharacters("socials-header");
setupCards();
