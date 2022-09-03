export default class Section {
  constructor({ data, renderer }, containerSelector) {
    this._initialItems = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // добавление элемента
  addItem(item) {
    this._container.prepend(item);
  }

  renderItems() {
    this._initialItems.forEach(item => {
      this._renderer(item);
    });
  }
}
