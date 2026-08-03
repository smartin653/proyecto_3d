import Page from "./Page.js";
import tour from "../data/tour.js";

export default class TourPage extends Page {
  static config = {
    experience: false,
    header: false,
    footer: false,
  };
  create() {
    super.create();

    this.element.classList.add("tour-page");

    //---------------------------------
    // Título
    //---------------------------------

    const title = document.createElement("h1");

    title.className = "tour-title";

    title.textContent = tour.title;

    //---------------------------------
    // Poster
    //---------------------------------

    const poster = document.createElement("img");

    poster.className = "tour-poster";

    poster.src = tour.poster;

    poster.alt = tour.title;

    //---------------------------------
    // Contenedor de fechas
    //---------------------------------

    const dates = document.createElement("section");

    dates.className = "tour-dates";

    tour.dates.forEach((show) => {
      const card = document.createElement("article");

      card.className = "tour-date";

      //---------------------------------
      // Ciudad
      //---------------------------------

      const city = document.createElement("h2");

      city.className = "tour-city";

      city.textContent = show.city;

      //---------------------------------
      // País
      //---------------------------------

      const country = document.createElement("p");

      country.className = "tour-country";

      country.textContent = show.country;

      //---------------------------------
      // Venue
      //---------------------------------

      const venue = document.createElement("p");

      venue.className = "tour-venue";

      venue.textContent = show.venue;

      //---------------------------------
      // Fecha
      //---------------------------------

      const date = document.createElement("p");

      date.className = "tour-day";

      date.textContent = show.date;

      //---------------------------------
      // Botón
      //---------------------------------

      const button = document.createElement("a");

      button.className = "tour-ticket";

      button.textContent = show.titleBtn;

      if (show.tickets) {
        button.href = show.tickets;

        button.target = "_blank";

        button.rel = "noopener noreferrer";
      } else {
        button.classList.add("tour-ticket-disabled");

        button.removeAttribute("href");
      }

      //---------------------------------
      // Ensamblar tarjeta
      //---------------------------------

      card.appendChild(city);
      card.appendChild(country);
      card.appendChild(venue);
      card.appendChild(date);
    
      card.appendChild(button);

      dates.appendChild(card);
    });

    //---------------------------------
    // Agregar al DOM
    //---------------------------------

    this.element.appendChild(title);

    this.element.appendChild(poster);

    this.element.appendChild(dates);
  }
}
