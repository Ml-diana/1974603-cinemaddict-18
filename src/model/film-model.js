export default class FilmsModel {
  #films = null;

  set films(films) {
    this.#films = films;
  }

  get films() {
    return this.#films;
  }

}
