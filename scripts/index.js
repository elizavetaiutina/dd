import {
  popup,
  imgPopup,
  namePopup,
  formPopup,
  arrowUp,
  page,
  header,
  footer,
  sectionsTitle,
  popupContainer,
  links,
  daysWeek,
  months,
} from "./constants.js";
import {
  arrayCardTshirt,
  arrayCardSweatshirt,
  arrayCardCap,
  arrayCardSneakers,
} from "./arrayCard.js";

// ----------------- СОЗДАНИЕ КАРТОЧКИ (template) -------------------
//Шаблон template для карт
const cardTemplate = document.querySelector(".card-template").content;
const cardContainerTshirt = document.querySelector(".section__list_tshirt");
const cardContainerSweatshirt = document.querySelector(".section__list_sweatshirt");
const cardContainerCap = document.querySelector(".section__list_cap");
const cardContainerSneakers = document.querySelector(".section__list_sneakers");

function generateCard(item) {
  const newCard = cardTemplate.cloneNode(true);

  const nameCard = newCard.querySelector(".card__name");
  nameCard.textContent = item.name;

  const cardDate = newCard.querySelector(".card__date");
  cardDate.textContent = getDayInfo(item.date);

  const imageCard = newCard.querySelector(".card__img");
  imageCard.src = item.link;
  imageCard.alt = item.name;

  // На каждую карту вешаем слушатель открытия попапа по кнопке купить
  const buttonBuy = newCard.querySelector(".card__button");

  buttonBuy.addEventListener("click", () => {
    openPopup(item.link, item.name);
  });

  return newCard;
}

// Проходим по массиву и создаем для каждого элемента добавление карточки
function renderCard(item, containerCards) {
  containerCards.prepend(generateCard(item));
}
arrayCardTshirt.forEach((array) => renderCard(array, cardContainerTshirt));
arrayCardSweatshirt.forEach((array) => renderCard(array, cardContainerSweatshirt));
arrayCardCap.forEach((array) => renderCard(array, cardContainerCap));
arrayCardSneakers.forEach((array) => renderCard(array, cardContainerSneakers));

// дата добавления товара
function getDayInfo(date) {
  const arrayDate = date.split(".");
  const dateFull = new Date(arrayDate[2], arrayDate[1] - 1, arrayDate[0]);
  /*console.log(dateFull);*/
  const day = dateFull.getDate();
  const dayWeek = daysWeek[dateFull.getDay()];
  const month = months[dateFull.getMonth()];
  const year = dateFull.getFullYear();
  const numberWeek = Math.ceil((day + 6 - dateFull.getDay()) / 7);

  return `${dayWeek}, ${numberWeek} неделя ${month} ${year} года`;
}

// ----------------- POPUP покупки -------------------
// Функция открытия поп-апа
function openPopup(link, name) {
  console.log("открыть");
  imgPopup.src = link;
  imgPopup.alt = name;
  namePopup.textContent = name;
  popup.classList.add("pop-up_opened");
  popup.addEventListener("click", handleClosePopup);
  document.addEventListener("keydown", handleClosePopupEscape);
}

// Функция закрытия поп-апа
function closePopup(popup) {
  console.log("закрыть");
  popup.classList.remove("pop-up_opened");
  document.removeEventListener("keydown", handleClosePopupEscape);
  popup.removeEventListener("click", handleClosePopup);
}

// Функция обработчик закрытия поп-апа по клавише ESC
function handleClosePopupEscape(event) {
  if (event.key === "Escape") {
    const popup = document.querySelector(".pop-up_opened");
    closePopup(popup);
  }
}

// Функция обрабочтик закрытия попапа по клику на крестик и оверлэй
function handleClosePopup(event) {
  const isOverlay = event.target.classList.contains("pop-up_opened");
  const isClose = event.target.classList.contains("pop-up__exit");
  if (isOverlay || isClose) {
    closePopup(event.currentTarget);
  }
}

// Обработчик «отправки» формы поп-апа , хотя пока она никуда отправляться не будет
const handleSubmitFormBuy = (form) => {
  form.preventDefault();

  closePopup(popup);
  alert("Спасибо за покупку!");
};

// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formPopup.addEventListener("submit", handleSubmitFormBuy);

// ----------------- Кнопка для возврата наверх страницы ----------
window.addEventListener("scroll", () => {
  window.scrollY > 400 ? showArrow() : hideArrow();
});

// При клике пролистать наверх
arrowUp.addEventListener("click", () => {
  window.scrollTo({ p: 0, left: 0, behavior: "smooth" });
});

function showArrow(event) {
  arrowUp.classList.add("arrow_show");
}

function hideArrow(event) {
  arrowUp.classList.remove("arrow_show");
}

const cards = document.querySelectorAll(".card");

// ----------------- СМЕНА ТЕМЫ ----------
const buttonThemeChange = document.querySelector(".theme");
buttonThemeChange.addEventListener("click", () => {
  page.classList.toggle("theme_dark");
  header.classList.toggle("theme_dark");
  cards.forEach((card) => card.classList.toggle("theme_dark"));
  footer.classList.toggle("theme_dark");
  sectionsTitle.forEach((i) => i.classList.toggle("theme_dark"));
  popupContainer.classList.toggle("theme_dark");
  for (let link of links) {
    link.classList.toggle("theme_dark");
  }
});
