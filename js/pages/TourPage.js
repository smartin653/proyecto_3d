import Page from "./Page.js";
import tour from "../data/tour.js";

export default class TourPage extends Page {
     static config = {
    experience: false,
    header: false,
    footer: false
}
  create() {
    super.create();

    this.element.classList.add("tour-page");

    // Título
    const title = document.createElement("h1");

    title.className = "tour-title";

    title.textContent = tour.title;

    // Poster
    const poster = document.createElement("img");

    poster.className = "tour-poster";

    poster.src = tour.poster;

    poster.alt = tour.title;

    // Contenedor de fechas
    const dates = document.createElement("section");

    dates.className = "tour-dates";

    tour.dates.forEach((show) => {
      const card = document.createElement("article");

      card.className = "tour-date";

      const city = document.createElement("h2");

      city.className = "tour-city";

      city.textContent = show.city;

      const date = document.createElement("p");

      date.className = "tour-day";

      date.textContent = show.date;
      const button = document.createElement("a");

      button.className = "tour-ticket";

      button.href = show.tickets;

      button.target = "_blank";

      button.rel = "noopener noreferrer";

      button.textContent = "GET TICKETS";

      card.appendChild(city);

      card.appendChild(date);

      dates.appendChild(card);
      card.appendChild(button);
    });

    this.element.appendChild(title);

    this.element.appendChild(poster);

    this.element.appendChild(dates);
  }
}
