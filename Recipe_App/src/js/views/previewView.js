import View from './view.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class PreviewView extends View {
    _parentElement = '';

    _generateMarkup() {
        const id = window.location.hash.slice(1);
        const activeClass = this.data.id === id ? 'preview__link--active' : '';
        return `
        <li class="preview">
            <a class="preview__link  ${activeClass}" href="#${this.data.id}">
                <figure class="preview__fig">
                    <img src="${this.data.imageUrl}" alt="${this.data.title}" />
                </figure>
                <div class="preview__data">
                    <h4 class="preview__title">${this.data.title}</h4>
                    <p class="preview__publisher">${this.data.publisher}</p>
                </div>
                <div class="preview__user-generated ${this.data.key ? '' : 'hidden'}">
                    <svg>
                        <use href="${icons}#icon-user"></use>
                    </svg>
                </div>
            </a>
        </li>
        `;  
    }
    
}

export default new PreviewView();