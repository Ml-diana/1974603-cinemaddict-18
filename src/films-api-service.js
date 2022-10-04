import ApiService from './framework/api-service.js';
import {HttpMethod} from './utils/const.js';


export default class FilmsApiService extends ApiService {
  get films() {
    return this._load({url: 'movies'})
      .then(ApiService.parseResponse);
  }

  updateFilm = async (film) => {
    const response = await this._load({
      url: `movies/${film.id}`,
      method: HttpMethod.PUT,
      body: JSON.stringify(this.#adaptToServer(film)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);
    return parsedResponse;
  };

  #adaptToServer = (film) => ({
    'id': film.id,
    'comments': film.comments,
    'film_info': {
      'title': film.filmInfo.title,
      'alternative_title': film.filmInfo.title,
      'total_rating': film.filmInfo.rating,
      'poster': film.filmInfo.poster,
      'age_rating': film.filmInfo.ageRating,
      'director': film.filmInfo.director,
      'writers':film.filmInfo.writers,
      'actors': film.filmInfo.actors,
      'release': {
        'date': film.filmInfo.release.date,
        'release_country': film.filmInfo.release.releaseCountry,
      },
      'runtime': film.filmInfo.runtime,
      'genre': film.filmInfo.genres,
      'description': film.filmInfo.description
    },
    'user_details': {
      'watchlist': film.userDetails.watchlist,
      'already_watched': film.userDetails.alreadyWatched,
      'watching_date': film.userDetails.watchingDate instanceof Date ? film.userDetails.watchingDate.toISOString() : null,
      'favorite': film.userDetails.favorite,
    },
  });
}
