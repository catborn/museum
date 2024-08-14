const apiKey = "19c3f5ed-fa29-417d-8f60-60d2c8d4d25e";

async function getRandomArtwork() {
  const number = 1;
  const page = Math.floor(Math.random() * 9000) + 1;

  const url = `https://api.harvardartmuseums.org/image?apikey=${apiKey}&size=${number}&page=${page}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    displayArtwork(data.records[0]);
  } catch (error) {
    artworkDiv.textContent = error;
  }
}

function displayArtwork(artObject) {
  const artworkDiv = document.getElementById("artwork");
  artworkDiv.innerHTML = `
    <div class = "info">
    <h2 class = "artwork">${artObject.title}</h2>
    <img src="${artObject.baseimageurl}" alt="${artObject.title}" class = "img__info" width="400" height="400">
    </div>  `;
}

document.querySelector(".btn").addEventListener("click", getRandomArtwork);
