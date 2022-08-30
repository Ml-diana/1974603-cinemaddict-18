import {createElement} from '../render.js';

const createStatisticsTemplate = () => '<p>130 291 movies inside</p>';
export default class StatisticsView {
  getTemplate() {
    return createStatisticsTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  getStatisticsElement() {
    return this.getElement().querySelector('.footer__statistics'); //statistics
  }

  removeElement() {
    this.element = null;
  }
}
