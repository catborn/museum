document.addEventListener("DOMContentLoaded", () => {
  const btn_museum1 = document.getElementById("__menu_tab-btn-2");

  btn_museum1.addEventListener("click", async function () {
    let gallery__section = document.getElementById("gallery");

    // Создание и добавление нового контейнера
    let div_museum1 = document.createElement("div");
    div_museum1.classList.add("container");
    div_museum1.id = "museum__container";
    div_museum1.innerHTML = `
      <form id="museum__search">
        <div class="museum__container">
          <h3 class="museum__title">Harvard Art Museum</h3>
          <div id="museum__search_input-button">
          <input id="museum__search-input" name="search-input" type="text" value="">
          <button type="submit" id="museum__search-button"></button>\n
          <p class="museum__search-hint">
            * Если хотите искать по classifications введите: Paintings/Sculpture/Photographs...
          </p>
          </div>
          
        </div>
      </form>
      <div class="museum__search-result">
        <!-- Результаты поиска будут добавлены сюда -->
      </div>`;
    gallery__section.appendChild(div_museum1);

    // Добавление обработчика для отправки формы
    document
      .getElementById("museum__search")
      .addEventListener("submit", async (event) => {
        event.preventDefault();
        await searchHarvardRecords();
      });
  });

  const searchHarvardRecords = async () => {
    const searchQuery = document.getElementById("museum__search-input").value;
    const apiKey = "19c3f5ed-fa29-417d-8f60-60d2c8d4d25e";

    // URL для первого запроса, чтобы узнать количество страниц
    const initialUrl = new URL("https://api.harvardartmuseums.org/object");
    initialUrl.search = new URLSearchParams({
      apikey: apiKey,
      classification: searchQuery,
      size: 3,
    }).toString();

    try {
      // Первый запрос для получения данных о количестве страниц
      const initialResponse = await fetch(initialUrl);
      if (!initialResponse.ok) {
        throw new Error("Ошибка при получении данных.");
      }
      const initialJson = await initialResponse.json();
      const minimalPages = initialJson.info.page; // Минимально допустимое значение
      const totalPages = initialJson.info.pages;

      // Генерация случайного номера страницы
      const randomPage = Math.floor(
        Math.random() * (totalPages - minimalPages) + minimalPages
      );

      // URL для второго запроса с использованием случайного номера страницы
      const finalUrl = new URL("https://api.harvardartmuseums.org/object");
      finalUrl.search = new URLSearchParams({
        apikey: apiKey,
        classification: searchQuery,
        size: 3, // Количество объектов на странице
        page: randomPage, // Использование случайного номера страницы
      }).toString();

      // Второй запрос с использованием случайного номера страницы
      const finalResponse = await fetch(finalUrl);
      if (!finalResponse.ok) {
        throw new Error("Ошибка при получении данных.");
      }
      const finalJson = await finalResponse.json();

      // Обновляем результаты поиска
      displayResult(finalJson);
      console.log(finalJson);
    } catch (error) {
      console.error("Произошла ошибка:", error);
    }
  };

  const displayResult = (finalJson) => {
    // Отображаем результаты поиска
    const resultContainer = document.querySelector(".museum__search-result");
    resultContainer.innerHTML = ""; // Очистка предыдущих результатов

    if (finalJson.records && finalJson.records.length > 0) {
      finalJson.records.forEach((record) => {
        if (record.primaryimageurl) {
          const divForImgLabel = document.createElement("div");
          divForImgLabel.classList.add("museum__container_picture");
          const img = document.createElement("img");
          img.classList.add("museum__picture");
          img.src = record.primaryimageurl;
          const label_img = document.createElement("label");
          label_img.textContent = record.title;
          divForImgLabel.appendChild(img);
          divForImgLabel.appendChild(label_img);
          resultContainer.appendChild(divForImgLabel);
        }
      });
    } else {
      resultContainer.innerHTML = "<p>Нет результатов для вашего запроса.</p>";
    }
  };
});
