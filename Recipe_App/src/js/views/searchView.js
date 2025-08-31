class searchView {
  _parentElement = document.querySelector('.search');
  _errorMessage = 'No recipes found for your query! Please try again.';
  _message = '';
  _inputField = this._parentElement.querySelector('.search__field');

  getQuery() {
    const query = this._inputField.value;
    this._clearInput();
    return query;
  }

  _clearInput() {
    this._inputField.value = '';
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}
export default new searchView();