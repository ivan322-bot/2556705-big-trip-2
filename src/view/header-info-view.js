// Вставлять в .trip-main
import {createElement} from '../render.js';

// Заголовок сайта, где будут показаны:
// Все пройденные города (Москва-Раменское-Люберцы)
// В каких числах это пройдет (18-20 мая)
// Общая стоимость поездки (30 тыс. рублей)
function createHeaderInfoTemplate() {
  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>

        <p class="trip-info__dates">18&nbsp;&mdash;&nbsp;20 Mar</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
      </p>
    </section>`
  );
}

export default class HeaderInfoView {
  getTemplate() {
    return createHeaderInfoTemplate();
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
