import AbstractView from '../framework/view/abstract-view.js';

const createStatisticsTemplate = () => '<p>130 291 movies inside</p>';

export default class StatisticsView extends AbstractView {
  #element = null;
  get template() {
    return createStatisticsTemplate();
  }

  get statisticsElement() {
    return this.#element.querySelector('.footer__statistics');
  }

}
