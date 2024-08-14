const setupRijksmuseumSearch = () => {
  const btn_museum4 = document.getElementById("__menu_tab-btn-5");

  // Создание и добавление нового контейнера, если его нет
  let museum__four = document.getElementById("museum__four");
  let existingContainer = museum__four.querySelector("#museum__container");

  if (!existingContainer) {
    let div_museum4 = document.createElement("div");
    div_museum4.classList.add("container");
    div_museum4.id = "museum__container";
    div_museum4.innerHTML = `
          <div id="museum__search_four">
            <div class="museum__container">
              <h3 class="museum__title"><a href="https://www.rijksmuseum.nl/en" target="_blank">Rijks Museum</a></h3>
              <div class="museum__about">
              <span class="museum__about_title">About the Museum</span>
              <p>The Rijksmuseum is the national museum 
              of the Netherlands dedicated to Dutch arts and and is located in Amsterdam. 
              The Rijksmuseum was founded in The Hague on 19 November 1798 and moved to
               Amsterdam in 1808. The current main building was designed by Pierre Cuypers
               and first opened in 1885.</br>The museum has on display 8,000 objects of art 
               and history , from their total collection of 1 million objects from the 
               years 1200–2000.The collection contains more than 2,000 paintings 
               from the Dutch Golden Age by notable painters such as Jacob van Ruisdael,
                Rembrandt , and Rembrandt's pupils.</p>
              </div>
              <div id="museum__search_four_input-button">
              <input id="museum__search_four-input" name="search-input" type="text" value="" autocomplete='off'>
                <button type="button" id="museum__search_four-button"></button>
                <p class="museum__search-hint">
                  * If you want to search by keyword, enter it, example: lover, paintings, dog, ship and etc.
                </p>
              </div>
            </div>
            <div class="museum__search_four-result">
              <!-- Результаты поиска будут добавлены сюда -->
            </div>
          </div>
        `;
    museum__four.append(div_museum4);
  }

  // Обработчик клика на кнопку
  btn_museum4.addEventListener("click", async function () {
    // Инициализация получения случайного произведения искусства
    if (document.getElementById("museum__search_four-button")) {
      document
        .getElementById("museum__search_four-button")
        .addEventListener("click", async () => {
          await getRandomArtwork();
        });
    }
  });

  const getRandomArtwork = async () => {
    const searchQuery = document.getElementById(
      "museum__search_four-input"
    ).value;
    const apiKey = "Tlo9VRYF";
    const number = 1;
    const page = Math.floor(Math.random() * 10000) + 1;

    const url = `https://www.rijksmuseum.nl/api/en/collection?key=${apiKey}&ps=${number}&p=${page}&imgonly=true&q=${searchQuery}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      displayArtwork(data.artObjects[0]);
    } catch (error) {
      console.error("Error", error);
    }
  };

  const displayArtwork = (artObject) => {
    const resultContainer = document.querySelector(
      ".museum__search_four-result"
    );
    resultContainer.innerHTML = ""; // Очистка предыдущих результатов

    if (artObject) {
      const divForImgLabel = document.createElement("div");
      divForImgLabel.classList.add("museum__container_picture");
      const img = document.createElement("img");
      img.classList.add("museum__picture");
      img.src = artObject.webImage.url;
      img.style.width = "40%";
      const label_img = document.createElement("label");
      label_img.textContent = artObject.title || "No Title";
      divForImgLabel.appendChild(img);
      divForImgLabel.appendChild(label_img);
      resultContainer.appendChild(divForImgLabel);
    } else {
      resultContainer.innerHTML = "<p>Нет результатов для вашего запроса.</p>";
    }
  };
};
