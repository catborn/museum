
const apiKey = 'Tlo9VRYF';

async function getRandomArtwork() {
  const number = 1;
  const page = Math.floor(Math.random() * 10000) + 1;

  const url = `https://www.rijksmuseum.nl/api/en/collection?key=${apiKey}&ps=${number}&p=${page}&imgonly=true`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    displayArtwork(data.artObjects[0]);
  } catch (error) {
    console.error('Error', error);
  }
}

function displayArtwork(artObject) {
  const artworkDiv = document.getElementById('artwork');
  artworkDiv.innerHTML = `
    <h2>${artObject.longTitle}</h2>
    <img src="${artObject.webImage.url}" alt="${artObject.title}" width="500" height="500">
  `;
}

document.querySelector('.btn').addEventListener('click', getRandomArtwork);
