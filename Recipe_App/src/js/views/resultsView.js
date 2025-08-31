import previewView from './previewView.js';
import View from './view.js';

class ResultsView extends View {
    _parentElement = document.querySelector('.results');
    _errorMessage = 'No recipes found for your query! Please try again!';
    _message = 'Start by searching for a recipe or an ingredient. Have fun!';

    _generateMarkup() {
        if (!this.data || (Array.isArray(this.data) && this.data.length === 0)) {
            return this._errorMessage;
        }
        console.log(this.data);
        return this.data.map(results => previewView.render(results, false)).join('');
    }
    
}

export default new ResultsView();