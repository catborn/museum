document.addEventListener("DOMContentLoaded", () => {
  setupHarvardSearch(); // Инициализация Harvard поиска при загрузке страницы
  setupClevelandSearch(); // Инициализация Cleveland поиска при загрузке страницы

  const museumAll = document.getElementById("museum__all");
  const museumOne = document.getElementById("museum__one");
  const museumTwo = document.getElementById("museum__two");
  const museumThree = document.getElementById("museum__three");
  const museumFour = document.getElementById("museum__four");
  // Показываем контейнер "All" при загрузке страницы
  museumAll.classList.remove("hidden");
  museumOne.classList.add("hidden");
  museumTwo.classList.add("hidden");
  museumThree.classList.add("hidden");
  museumFour.classList.add("hidden");

  // Обработчики переключения вкладок
  const tabButtons = document.querySelectorAll('input[name="tab-btn"]');

  tabButtons.forEach((button) => {
    button.addEventListener("change", function () {
      switch (this.id) {
        case "__menu_tab-btn-1": // "All"
          museumAll.classList.remove("hidden");
          museumOne.classList.add("hidden");
          museumTwo.classList.add("hidden");
          museumThree.classList.add("hidden");
          museumFour.classList.add("hidden");
          break;
        case "__menu_tab-btn-2": // "Harvard"
          museumAll.classList.add("hidden");
          museumOne.classList.remove("hidden");
          museumTwo.classList.add("hidden");
          museumThree.classList.add("hidden");
          museumFour.classList.add("hidden");
          break;
        case "__menu_tab-btn-3": // "Cleveland"
          museumAll.classList.add("hidden");
          museumOne.classList.add("hidden");
          museumTwo.classList.remove("hidden");
          museumThree.classList.add("hidden");
          museumFour.classList.add("hidden");
          break;
        case "__menu_tab-btn-4": //Australia
          museumAll.classList.add("hidden");
          museumOne.classList.add("hidden");
          museumTwo.classList.add("hidden");
          museumThree.classList.remove("hidden");
          museumFour.classList.add("hidden");
          break;
        case "__menu_tab-btn-5": //Rijsk
          museumAll.classList.add("hidden");
          museumOne.classList.add("hidden");
          museumTwo.classList.add("hidden");
          museumThree.classList.add("hidden");
          museumFour.classList.remove("hidden");
        default:
          break;
      }
    });
  });
});
