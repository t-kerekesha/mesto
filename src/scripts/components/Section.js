export default class Section {
  constructor({ renderer, containerSelector }) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // добавление элемента
  addItem(item) {
    this._container.prepend(item);
  }

  renderItems(items) {
    items.reverse();
    items.forEach(item => {
      this._renderer(item);
    });
  }
}
