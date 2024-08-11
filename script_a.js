async function getRandomArtwork() {
  const url = `https://data.nma.gov.au/object?media=*`;

  try {
    const response = await fetch(url);
    const data = await response.json();
console.log(data);
    displayArtwork(data);
  } catch (error) {
    console.error('Error', error);
  }
}

function displayArtwork(data) {
  const artworkDiv = document.getElementById('artwork');
  let number = Math.floor(Math.random()*50+1);
  artworkDiv.innerHTML = `
    <h2>${data.data[number].title}</h2>
    <img src="${data.data[number].hasVersion[0].hasVersion[0].identifier}" alt="${data.data[number].title}" width="300" height="300">
  `;
}

document.querySelector('.btn').addEventListener('click', getRandomArtwork);
