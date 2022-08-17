import {createElement} from '../render.js';

const createLoadingTemplate = () => (`
<section class="films">
<section class="films-list">
  <h2 class="films-list__title">Loading...</h2>
</section>
</section>
`);
export default class LoadingView {
  getTemplate() {
    return createLoadingTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
