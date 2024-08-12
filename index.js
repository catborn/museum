// testimonials start
const testimonialData = {
  museumname: "First museum Name",
  mustext:
    "text about museum testimonial text about museum testimonial text about museum testimonial text about museum testimonial text about museum testimonial text about museum testimonial text about museum testimonial",
  star: "https://www.svgrepo.com/show/13695/star.svg",
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
      //add content testimonials
      testimonialElement.innerHTML = `<div class="stars"><img src="${user.picture.thumbnail}"><span><img src="${testimonialData.star}"> <img src="${testimonialData.star}"> <img src="${testimonialData.star}"> <img src="${testimonialData.star}"> <img src="${testimonialData.star}"> </span></div><p>${user.name.first} ${user.name.last}</p><div>${user.location.country}</div><div></div>
Interactive exhibits are what kids need! The tour guide was very knowledgeable and entertaining<div>The Cleveland Museum of Art - Harvard Museum - Rijksmuseum - The National Museum of Australia</div>`;
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
        qouteTwoParagraph.textContent = JSON.stringify(data[0].author).slice(1,-1);
        qouteOneParagraph.style.fontFamily = "Avenir-Bold";
        qouteTwoParagraph.style.fontFamily = "Avenir-Regular";
    };
        
    // finish script for block footer