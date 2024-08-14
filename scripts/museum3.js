const setupAustralia = () => {
  const btn_museum3 = document.getElementById("__menu_tab-btn-4");

  // Создание и добавление нового контейнера, если его нет
  let museum__three = document.getElementById("museum__three");
  let existingContainer = museum__three.querySelector("#museum__container");

  if (!existingContainer) {
    let div_museum3 = document.createElement("div");
    div_museum3.classList.add("container");
    div_museum3.id = "museum__container";
    div_museum3.innerHTML = `
          <div id="museum__search_three">
            <div class="museum__container">
              <h3 class="museum__title"><a href="https://www.nma.gov.au/" target="_blank">The National Museum of Australia</a></h3>
              <div class="museum__about">
              <span class="museum__about_title">About the Museum</span>
              <p>The National Museum of Australia (NMA), in the national capital Canberra,
               preserves and interprets Australia's social history, exploring the key issues,
                people and events that have shaped the nation. It was founded in 1980. 
                The museum's collection, known as the National Historical Collection, 
                includes over 210,000 objects.</br>The collection focuses on three themes: 
                the culture and history of Aboriginal  and Torres Strait Islander 
                peoples, Australian history and culture since European settlement in 1788, 
                and interactions between people and the Australian environment .</p>
              </div>
              <div id="museum__search_three_input-button">
              <input id="museum__search_three-input" name="search-input" type="text" value="" autocomplete='off'>
                <button type="button" id="museum__search_three-button"></button>
                <p class="museum__search-hint">
                  * If you want to search by keyword, enter it
                </p>
              </div>
            </div>
            <div class="museum__search_three-result">
              <!-- Результаты поиска будут добавлены сюда -->
            </div>
          </div>
        `;
    museum__three.append(div_museum3);
  }
  btn_museum3.addEventListener("click", async function () {
    // Инициализация получения случайного произведения искусства
    if (document.getElementById("museum__search_three-button")) {
      document
        .getElementById("museum__search_three-button")
        .addEventListener("click", async () => {
          await getRandomArtwork();
        });
    }
  });

  const getRandomArtwork = async () => {
    const searchQuery = document.getElementById(
      "museum__search_three-input"
    ).value;
    const url = `https://data.nma.gov.au/object?media=*&text=${searchQuery}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      displayArtwork(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const displayArtwork = (data) => {
    const resultContainer = document.querySelector(
      ".museum__search_three-result"
    );
    resultContainer.innerHTML = ""; // Очистка предыдущих результатов

    if (data.data && data.data.length > 0) {
      const number = Math.floor(Math.random() * data.data.length);
      const artwork = data.data[number];
      const imageUrl =
        artwork.hasVersion &&
        artwork.hasVersion[0] &&
        artwork.hasVersion[0].hasVersion &&
        artwork.hasVersion[0].hasVersion[0]
          ? artwork.hasVersion[0].hasVersion[0].identifier
          : "";

      const divForImgLabel = document.createElement("div");
      divForImgLabel.classList.add("museum__container_picture");
      const img = document.createElement("img");
      img.classList.add("museum__picture");
      img.src = imageUrl;
      img.alt = artwork.title || "No Title";
      img.style.width = "30%";
      const label_img = document.createElement("label");
      label_img.textContent = artwork.title || "No Title";
      divForImgLabel.appendChild(img);
      divForImgLabel.appendChild(label_img);
      resultContainer.appendChild(divForImgLabel);
    } else {
      resultContainer.innerHTML = "<p>No artwork data available.</p>";
    }
  };
};
