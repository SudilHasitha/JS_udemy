import View from "./view";
import icons from 'url:../../img/icons.svg'; // Parcel 2

class PaginationView extends View {
    _parentElement = document.querySelector('.pagination');
    _errorMessage = 'No recipes found for your query! Please try again!';
    _message = 'Start by searching for a recipe or an ingredient. Have fun!';
    
    addHandlerClick(handler) {
        this._parentElement.addEventListener('click', function (e) {
        const btn = e.target.closest('.btn--inline');
        if (!btn) return;
        
        const goToPage = +btn.dataset.goto;
        handler(goToPage);
        });
    }   

    _generateMarkup() {
        const numPages = Math.ceil(this.data.results.length / this.data.resultsPerPage);
        const currentPage = this.data.page;
        
        // Page 1, and there are other pages
        if (currentPage === 1 && numPages > 1) {
            return this._generateMarkupButton(currentPage, 'next');
        }
        
        // Last page
        if (currentPage === numPages && numPages > 1) {
            return this._generateMarkupButton(currentPage, 'prev');
        }
        
        // Other page
        if (currentPage < numPages) {
            return `
                ${this._generateMarkupButton(currentPage, 'prev')}
                ${this._generateMarkupButton(currentPage, 'next')}
            `;
        }
        
        // Page 1, and there are NO other pages
        return '';
    }
    _generateMarkupButton(currentPage, type) {
        return `
            <button class="btn--inline pagination__btn--${type}" data-goto="${type === 'next' ? currentPage + 1 : currentPage - 1}">
                <span>Page ${type === 'next' ? currentPage + 1 : currentPage - 1}</span>
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-${type === 'next' ? 'right' : 'left'}"></use>
                </svg>
            </button>
        `;
    }
}

export default new PaginationView();