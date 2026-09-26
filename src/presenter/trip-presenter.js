import { render, remove, replace } from '../framework/render.js';
import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import PointEditView from '../view/point-edit-view.js';
import PointView from '../view/point-view.js';
import NoPointView from '../view/no-points-view.js';
// !! Вроде как не вставляется import PointModel from '../model/point-model.js';
export default class TripPresenter {
  #tripContainer;
  #pointsModel;
  #boardPoints;
  #destinations;
  #offers;
  #eventListComponent = new EventListView();

  constructor({ tripContainer, pointsModel }) {
    this.#tripContainer = tripContainer;
    this.#pointsModel = pointsModel;
    this.#destinations = this.#pointsModel.destinations;
    this.#offers = this.#pointsModel.offers;
  }

  init() {
    this.#boardPoints = this.#pointsModel.points;

    render(new SortView(), this.#tripContainer);
    render(this.#eventListComponent, this.#tripContainer);
    if (this.#boardPoints.length === 0) {
      render(new NoPointView(), this.#eventListComponent.element);
      return;
    }

    for (let i = 0; i < this.#boardPoints.length; i++) {
      this.#renderPoint(this.#boardPoints[i]);
    }
  }

  #renderPoint(point) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointComponent = new PointView(
      point, this.#destinations, this.#offers, onEditClick
    );

    function onEditClick() {
      replaceCardToForm();
      document.addEventListener('keydown', escKeyDownHandler);
    }

    const pointEditComponent = new PointEditView(
      point, this.#destinations, this.#offers, onFormSubmit
    );

    function onFormSubmit() {
      replaceFormToCard();
      document.removeEventListener('keydown', escKeyDownHandler);
    }

    function replaceCardToForm() {
      replace(pointEditComponent, pointComponent);
    }

    function replaceFormToCard() {
      replace(pointComponent, pointEditComponent);
    }
    render(pointComponent, this.#eventListComponent.element);
  }
}
