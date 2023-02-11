// variables that help dom traversal 
var searchButton = document.getElementById("search-button");
var searchMealElement = document.getElementById("meal-search");
var mealResult = document.getElementById("meal-result");

// var mealIngredients = document.getElementById("ingredients");


// function that searches for meals on API 
function searchMeal() {
    var searchMeal = searchMealElement.value;
    var getMeal = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + searchMeal;

    fetch(getMeal)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

// loop that gets the value of how many recipes are available from related search  
            var availableMeals = data.meals.length;
            for (var arrayMeal = 0; arrayMeal < availableMeals; arrayMeal++) {
                var mealType = arrayMeal;
                
//variable to reach certain object properties, to avoid typing whole path
            var mealPath = (data.meals[mealType]); 

// console log to see what the object is displaying 
                console.log(mealPath);

// creates and appends a p tag to the meal-result id on the html of each different recipes that api results from search 
                var meal = document.createElement("h1");
                var recipe = document.createElement("div");
// adds a class of hidden to not display recipe 
                recipe.setAttribute("class", "hidden");

//adds a button to remove hidden class and show recipe on the html
                var mealButton = document.createElement("button");
                mealButton.innerText = "Show Recipe";
                mealButton.id = "recipeButton";
                mealButton.addEventListener("click", function removeClass() {
                    recipe.classList.remove("hidden");
                })
                
                meal.textContent = mealPath.strMeal;
                recipe.textContent = mealPath.strInstructions;
                
                mealResult.append(meal);
                mealResult.append(recipe);
                mealResult.append(mealButton);

        // loop that goes through all the ingredients and measurements                
                for (var index = 1; index < 20; index++) {
                var allIngredients = mealPath["strIngredient" + index];
                var allMeasurements = mealPath["strMeasure" + index];
                
                var ingredients = document.createElement("p");
                ingredients.setAttribute("class", "hidden");     

        // combines the measurements with ingredients in one concatenated line
                ingredients.textContent = allMeasurements + " " + allIngredients;
                mealResult.append(ingredients);

                }
                
            }
            
        })
};


searchButton.addEventListener("click", searchMeal);