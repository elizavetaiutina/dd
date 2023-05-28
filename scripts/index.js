import {
  arrayCard,
  popup,
  fotoPopup,
  namePopup,
  formPopup,
  arrowUp,
  page,
  header,
  cards,
  footer,
  sectionsTitle,
  popupContainer,
  links,
} from "./constants.js";

// ----------------- POPUP покупки -------------------
// На каждую карту вешаем слушатель открытия попапа по кнопке купить
arrayCard.forEach((card) => {
  const imageCard = card.querySelector(".card__img");
  const titleCard = card.querySelector(".card__name");
  const link = imageCard.src;
  const name = titleCard.textContent;
  const buttonBuy = card.querySelector(".card__button");

  buttonBuy.addEventListener("click", () => {
    openPopup(link, name);
  });
});

// Функция открытия поп-апа
function openPopup(link, name) {
  console.log("открыть");
  fotoPopup.src = link;
  fotoPopup.alt = name;
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

// ----------------- Смена темы ----------
const buttonThemeChange = document.querySelector(".theme");
console.log(sectionsTitle);
buttonThemeChange.addEventListener("click", () => {
  console.log("dddd");
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
