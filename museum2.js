const setupClevelandSearch = () => {
  const btn_museum2 = document.getElementById("__menu_tab-btn-3");

  btn_museum2.addEventListener("click", async function () {
    let museum__two = document.getElementById("museum__two");

    let existingContainer = museum__two.querySelector("#museum__container");
    if (!existingContainer) {
      // Создание и добавление нового контейнера
      let div_museum2 = document.createElement("div");
      div_museum2.classList.add("container");
      div_museum2.id = "museum__container";
      div_museum2.innerHTML = `
        <form id="museum__search">
          <div class="museum__container">
            <h3 class="museum__title">The Cleveland Museum of Art</h3>
            <div id="museum__search_input-button">
            <input id="museum__search-input" name="search-input" type="text" value="" autocomplete="off">
            <button type="submit" id="museum__search-button"></button>
            <p class="museum__search-hint">
              * введите ключевое слово, по которому хотите совершить поиск
            </p>
            </div>
            
          </div>
          <div class="museum__search-result">
          <!-- Результаты поиска будут добавлены сюда -->
        </div>
        </form>
        `;
      museum__two.appendChild(div_museum2);
    } else {
      // Если контейнер уже существует, очищаем его содержимое
      existingContainer.querySelector(".museum__search-result").innerHTML = "";
    }

    // Добавление обработчика для отправки формы
    document
      .getElementById("museum__search")
      .addEventListener("submit", async (event) => {
        event.preventDefault();
        await searchClevelandRecords();
        // Очистка значения инпута после отправки формы
        document.getElementById("museum__search-input").value = "";
      });
  });

  const searchClevelandRecords = async () => {
    const searchQuery = document.getElementById("museum__search-input").value;

    const finalUrl = new URL(
      "https://openaccess-api.clevelandart.org/api/artworks/?"
    );
    finalUrl.search = new URLSearchParams({
      skip: 2,
      q: searchQuery,
      limit: 100,
    }).toString();
    try {
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

  const getRandomItems = (array, numItems) => {
    // Создаем копию массива и перемешиваем его
    const shuffled = array.slice(0);
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    // Возвращаем случайные элементы
    return shuffled.slice(0, numItems);
  };

  const displayResult = (finalJson) => {
    // Отображаем результаты поиска
    const resultContainer = document.querySelector(".museum__search-result");
    resultContainer.innerHTML = ""; // Очистка предыдущих результатов

    if (finalJson.data && finalJson.data.length > 0) {
      // Выбираем 3 случайные записи
      const randomRecords = getRandomItems(finalJson.data, 3);
      randomRecords.forEach((record) => {
        if (record.images && record.images.web && record.images.web.url) {
          const divForImgLabel = document.createElement("div");
          divForImgLabel.classList.add("museum__container_picture");
          const img = document.createElement("img");
          img.classList.add("museum__picture");
          img.src = record.images.web.url;
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
