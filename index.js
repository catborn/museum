// testimonials start
const testimonialData = {
  museumname: "First museum Name",
  mustext:
    "text about museum testimonial text about museum testimonial text about museum testimonial text about museum testimonial text about museum testimonial text about museum testimonial text about museum testimonial",
  star: "https://www.svgrepo.com/show/13695/star.svg",
};

const testimonalTitle = document.querySelector(".testimonial__title");
const testimonalContainer = document.querySelector(".testimonial__container");

fetch("https://randomuser.me/api/?results=3")
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
