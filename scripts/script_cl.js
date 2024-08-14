async function getRandomArtwork() {
  const url = `https://openaccess-api.clevelandart.org/api/artworks/?`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    displayArtwork(data);
  } catch (error) {
    artworkDiv.textContent = error;
  }
}

function displayArtwork(data) {
  const artworkDiv = document.getElementById("artwork");
  let number = Math.floor(Math.random() * 100 + 1);
  artworkDiv.innerHTML = `
      <div class = "info">
      <h2 class = "artwork">${data.data[number].title}</h2>
      <img src="${data.data[number].images.web.url}" alt="${data.data[number].title}" class = "img__info"  width="300" height="300">
      </div> `;
}

document.querySelector(".btn").addEventListener("click", getRandomArtwork);
