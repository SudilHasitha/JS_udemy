import * as model from './model.js';
import 'core-js/stable'; // Polyfilling everything
import 'regenerator-runtime/runtime'; // Polyfilling async/await
import {MODAL_CLOSE_SEC} from './config.js';


import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

const controlRecipes = async function () {
  try {
    // Get ID from URL
    const id = window.location.hash.slice(1);
    // Check if id is valid
    if (!id) return;
    // update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());
    // Render spinner
    recipeView._renderSpinner();
    // 5ed6604591c37cdc054bc886
    // Load recipe
    console.log(id);
    await model.loadRecipe(id);
    // Render recipe
    const {recipe} = model.state;
    recipeView.render(recipe); 
    // Update bookmarks view
    bookmarksView.update(model.state.bookmarks);
    
  } catch (err) {
    console.log(err);
    recipeView._renderError(err.message);
  }
}

const controlPagination = function (goToPage) {
  // Render new results
  resultsView.render(model.getSearchResultsPage(goToPage));
  // Render pagination
  paginationView.render(model.state.search);
}

const controlSearchResults = async function () {
  try {
    resultsView._renderSpinner();
    const query = searchView.getQuery();
    // Load search results
    await model.loadSearchResults(query);
    // Render search results
    resultsView.render(model.getSearchResultsPage());
    // Render pagination
    paginationView.render(model.state.search);
    
  } catch (err) {
    console.log(err);
  }
}

const controlServings = function (newServings) {
  // Update the recipe servings (in state)
  // model.state.recipe.servings = newServings;
  model.updateServings(newServings);
  // Update the recipe view
  recipeView.update(model.state.recipe);
}

const controlAddBookmark = function () {
  // Add or remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  // Update recipe view
  recipeView.update(model.state.recipe);
  // Render bookmarks
  bookmarksView.render(model.state.bookmarks);
}

const controlBookmarks = function () {
  // Render bookmarks
  bookmarksView.render(model.state.bookmarks);
}

const controlAddRecipe = async function (newRecipe) {
  try {
    // Show loading spinner
    addRecipeView._renderSpinner();
    // Upload new recipe data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);
    // Render recipe
    recipeView.render(model.state.recipe);
    // Success message
    addRecipeView._renderMessage();
    // Render bookmark view
    bookmarksView.render(model.state.bookmarks);
    // Change ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    // Close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    addRecipeView._renderError(err.message);
  }
}

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  bookmarksView.addHandlerRender(controlBookmarks);
  addRecipeView.addHandlerUpload(controlAddRecipe);
}
init();

