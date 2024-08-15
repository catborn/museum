const setupClevelandSearch = () => {
  const btn_museum2 = document.getElementById("__menu_tab-btn-3");

  // Создание и добавление нового контейнера, если его нет
  let museum__two = document.getElementById("museum__two");
  let existingContainer = museum__two.querySelector("#museum__container");

  if (!existingContainer) {
    let div_museum2 = document.createElement("div");
    div_museum2.classList.add("container");
    div_museum2.id = "museum__container";
    div_museum2.innerHTML = `
        <form id="museum__search_two">
          <div class="museum__container">
            <h3 class="museum__title"><a href="https://www.clevelandart.org/" target="_blank">The Cleveland Museum of Art</a></h3>
            <div class="museum__about">
            <span class="museum__about_title">About the Museum</span>
            <p>The Cleveland Museum of Art is renowned for the quality 
            and breadth of its collection, which includes more than 
            63,000 artworks and spans 6,000 years of achievement in the arts. 
            The museum is a significant international forum for exhibitions, 
            scholarship, and performing arts and is a leader in digital innovations. 
            </br>One of the top comprehensive art museums in the nation, recognized for its award-winning 
            Open Access program and free of charge to all, the Cleveland Museum of Art is 
            located in the University Circle neighborhood.</p>
            </div>
            <div id="museum__search_two_input-button">
              <input id="museum__search_two-input" name="search-input" type="text" value="" autocomplete="off">
              <button type="submit" id="museum__search_two-button"></button>
              <p class="museum__search-hint">
                * If you want to search by keyword, enter it
              </p>
            </div>
          </div>
          <div class="museum__search_two-result">
            <!-- Результаты поиска будут добавлены сюда -->
          </div>
        </form>
      `;
    museum__two.append(div_museum2);
  }

  // Обработчик клика на кнопку
  btn_museum2.addEventListener("click", async function () {
    // Инициализация поиска
    if (document.getElementById("museum__search_two")) {
      document
        .getElementById("museum__search_two")
        .addEventListener("submit", async (event) => {
          event.preventDefault();
          await searchClevelandRecords();
          // Очистка значения инпута после отправки формы
          document.getElementById("museum__search_two-input").value = "";
        });
    }
  });

  const searchClevelandRecords = async () => {
    const searchQuery = document.getElementById(
      "museum__search_two-input"
    ).value;
    // URL для второго запроса
    const finalUrl = new URL(
      "https://openaccess-api.clevelandart.org/api/artworks/?"
    );
    finalUrl.search = new URLSearchParams({
      skip: 2,
      q: searchQuery,
      limit: 100,
    }).toString();

    try {
      // Второй запрос с использованием случайного номера страницы
      const finalResponse = await fetch(finalUrl);
      if (!finalResponse.ok) {
        throw new Error("Ошибка при получении данных.");
      }
      const finalJson = await finalResponse.json();

      // Обновляем результаты поиска
      displayResult(finalJson);
    } catch (error) {
      console.error("Произошла ошибка:", error);
    }
  };
  const getRandomItems = (array, numItems) => {
    const shuffled = array.slice(0);
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, numItems);
  };

  const displayResult = (finalJson) => {
    // Отображаем результаты поиска
    const resultContainer = museum__two.querySelector(
      ".museum__search_two-result"
    );
    resultContainer.innerHTML = ""; // Очистка предыдущих результатов

    if (finalJson.data && finalJson.data.length > 0) {
      const randomRecords = getRandomItems(finalJson.data, 3);
      randomRecords.forEach((record) => {
        if (record.images && record.images.web && record.images.web.url) {
          const divForImgLabel = document.createElement("div");
          divForImgLabel.classList.add("museum__container_picture");
          const img = document.createElement("img");
          img.classList.add("museum__picture");
          img.src = record.images.web.url;
          img.alt = record.title;
          const label_img = document.createElement("label");
          label_img.textContent = record.title || "No Title";
          divForImgLabel.appendChild(img);
          divForImgLabel.appendChild(label_img);
          resultContainer.appendChild(divForImgLabel);
        }
      });
    } else {
      resultContainer.innerHTML = "<p>Нет результатов для вашего запроса.</p>";
    }
  };
};
