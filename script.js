async function fetchRecipes(ingredients) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`);
  const data = await response.json();
  return data.meals;
}

async function fetchRecipeDetails(id) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await response.json();
  return data.meals[0];
}

function displayRecipes(recipes) {
  const recipeContainer = document.getElementById('recipe-container');
  recipeContainer.innerHTML = '';
  recipes.forEach(recipe => {
    const recipeElement = document.createElement('div');
    recipeElement.classList.add('recipe');
    recipeElement.innerHTML = `
      <h2>${recipe.strMeal}</h2>
      <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
      <button onclick="showRecipeDetails(${recipe.idMeal})">View Details</button>
    `;
    recipeContainer.appendChild(recipeElement);
  });
}

async function showRecipeDetails(id) {
  const recipe = await fetchRecipeDetails(id);
  const recipeDetails = document.getElementById('recipe-details');
  recipeDetails.innerHTML = `
    <h2>${recipe.strMeal}</h2>
    <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
    <p>${recipe.strInstructions}</p>
    <h3>Ingredients</h3>
    <ul>
      ${Object.keys(recipe).filter(key => key.startsWith('strIngredient') && recipe[key]).map(key => `<li>${recipe[key]}</li>`).join('')}
    </ul>
  `;
}

// Event listener for form submission
document.getElementById('search-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const ingredients = document.getElementById('ingredients').value;
  const recipes = await fetchRecipes(ingredients);
  displayRecipes(recipes);
});
