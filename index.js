// testimonials start
//JSON testimonials
const quotes = {
  quotes: [
    {
      museumname: "The Rijksmuseum",
      about:
        "A must see in Amsterdam - great museum although Travelling in mid-summer, the museum was packed. The exhibits were fantastic, but with so many people they were often hard to get in front to photograph. Photos are allowed as long as you don't use a flash",
      rating: 4,
    },
    {
      museumname: "The Rijksmuseum",
      about:
        "This is a good experience in Amsterdam! It is quite expensive at €22.50 per person. There is some really interesting art inside but it could be considered overpriced",
      rating: 4,
    },
    {
      museumname: "The National Museum of Australia",
      about:
        "Why do you tell people it costs money to go to the museum? It is free to enter and look around most of the museum. Tours are totally optional.",
      rating: 4,
    },
    {
      museumname: "The National Museum of Australia",
      about:
        "Our first attraction to visit in Canberra, headed there early on the Sunday morning, firstly to have breakfast in the cafe and then explore the museum. We still discovered enough interesting exhibits to view until lunchtime.",
      rating: 5,
    },
    {
      museumname: "The Harvard Art Museums",
      about:
        "This museum surpassed my expectations. It is filled with works by incredibly well known artists, Picasso, Manet, Monet, Pollack, Van Gogh as well as artifacts from ancient Egypt, Ancient Greece and more. Did I mention it's free to visit?",
      rating: 5,
    },
    {
      museumname: "The Harvard Art Museums",
      about:
        "Wow! What a wonderful collection this relatively small art museum has and it’s free to enter. We were thrilled by the wide range of American, European and Asian art and thoroughly enjoyed our visit",
      rating: 5,
    },
    {
      museumname: "Cleveland Museum of Art",
      about:
        "It is consistently rated as one of the best art museums in the country and we could not disagree with that appraisal. We spent three hours in the museum and saw less than half of the objects on display. ",
      rating: 5,
    },
    {
      museumname: "Cleveland Museum of Art",
      about:
        "We went to the Cleveland Museum of Art. What a wonderful time. Great works of art. too many great paintings. Wow. We'll be back",
      rating: 5,
    },
  ],
};

const testimonalTitle = document.querySelector(".testimonial__title");
const testimonalContainer = document.querySelector(".testimonial__container");

fetch("https://randomuser.me/api/?results=4")
  .then((response) => response.json())
  .then((data) => {
    data.results.forEach((user) => {
      //add cards elements testimonils
      const testimonialElement = document.createElement("div");
      testimonialElement.classList.add("testimonial__card");
      testimonalContainer.appendChild(testimonialElement);
      // random quote
      function getRandom() {
        const randomIndex = Math.floor(Math.random() * quotes.quotes.length);
        return quotes.quotes[randomIndex];
      }
      // star rating
      const star =
        '<img src="https://www.svgrepo.com/show/13695/star.svg" alt="star">'.repeat(
          getRandom().rating
        );
      //add content testimonials
      testimonialElement.innerHTML = `<div class="stars"><img src="${
        user.picture.thumbnail
      }"><span>${star}</span></div><p>${user.name.first} ${
        user.name.last
      }</p><div>${user.location.country}</div><div>${
        getRandom().museumname
      }</div>
<div>${getRandom().about}</div>`;
    });
  })
  .catch((error) => {
    testimonalTitle.textContent = "Произошла ошибка";
  });
// testimonial end

// start script for block footer
const footer_btn = document.getElementById("footer_btn");
const qouteOneParagraph = document.getElementById("qouteOne");
const qouteTwoParagraph = document.getElementById("qouteTwo");
footer_btn.addEventListener("click", getQoute);
const apiKey = "IKcXFfHkp073VsjIpV0Pcw==tuGLiz34hLnoEgNu";

const footerApiOptions = {
  method: "GET",
  headers: {
    "X-Api-Key": apiKey,
  },
};

const footerApiUrl = "https://api.api-ninjas.com/v1/quotes?category=art";
async function getQoute() {
  const response = await fetch(footerApiUrl, footerApiOptions);
  const data = await response.json();

  qouteOneParagraph.textContent = JSON.stringify(data[0].quote);
  qouteTwoParagraph.textContent = JSON.stringify(data[0].author).slice(1, -1);
  qouteOneParagraph.style.fontFamily = "Avenir-Bold";
  qouteTwoParagraph.style.fontFamily = "Avenir-Regular";
  qouteOneParagraph.style.marginTop = "10%";
}

// finish script for block footer
