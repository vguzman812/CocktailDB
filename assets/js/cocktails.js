// docs: https://www.thecocktaildb.com/api.php

// list out constants such as route and endpoints
const cocktailPath = "https://www.thecocktaildb.com/api/json/v1/1/";

/*  can search by 
    cocktail name: ?s=margarita
    first letter(s?): ?f=a
    ingredient name: ?i=vodka
*/
const searchEndpoint = "search.php";

/*  lookup individual by id
    full cocktail: ?i=11007
    ingredient: ?iid=552
*/
const lookupEndpoint = "lookup.php"

//  brings up one random cocktail
const randomCocktailEndpoint = "random.php"

/*  different from search I guess? Non-combinable. Can filter by:
    ingredient: ?i=gin ?i=Vodka
    alcoholic: ?a=Alcoholic ?a=Non_Alcoholic
    category: ?c=Ordinary_Drink ?c=Cocktail
    glass: ?g=Cocktail_glass ?g=Champagne_flute
*/
const filterEndpoint = "filter.php"

/*  lists all parameters available for filterering:
    categories: ?c=list
    glasses: ?g=list
    ingredients: ?i=list
    alcoholic: ?a=list
*/
const listEndpoint = "list.php"



/* OVERVIEW OF CocktailApp CLASS

constructor(): The constructor method initializes the class by setting up constants for API endpoints and references to DOM elements. It also sets up the form submission event listener.

setupFormSubmit(): This method adds an event listener to the form submission and triggers the fetchCocktailData() method when the user submits the form.

fetchCocktailData(event): This method fetches cocktail data from the API based on the user's input. It determines the URL for the API request based on the selected option and handles the API response to update the UI accordingly. If drinks are found, it displays the first drink's details and appends additional drink results. If no drinks are found or an error occurs, it updates the searchResultsText to display a relevant message.

clearResults(): This method clears any previous search results by removing existing result divs and their children.

populateIngredientsList(drink): This method populates the ingredients list for a given drink by looping through the drink's ingredient and measure keys and creating list items accordingly. It updates the ingredientsList DOM element.

updateDirections(instructions): This method updates the directions (instructions) section for a given drink. It updates the directions DOM element with the provided instructions.

updateSearchText(numDrinks): This method updates the search results text. It clears the display if there are results to show. Otherwise, it displays a message saying there are no results to display.

updateHeaderAndImage(drinkName, drinkImage): This method updates the h1 header and image source with the information of the first drink in the search results. It updates the header and image of the main drink being displayed.

appendResultDiv(drinkName, drinkImage): This method appends a new result div with image and title for each drink (excluding the first drink) in the search results. It creates a new result div element with the provided drink's name and image and appends it to the resultContainer DOM element.

createResultDiv(title, imageSrc): This method creates a single result div with image and title for a given drink. It returns a new result div element with the provided title and imageSrc.

startNewSearch(keyword): This method is triggered when an image in the search results is clicked. It sets the search input value with the drink name (keyword), redirects to the home panel, and triggers the form submission to initiate the new search.

*/

class CocktailApp {

    constructor() {
        // Constants for API endpoints
        this.cocktailPath = "https://www.thecocktaildb.com/api/json/v1/1/";
        this.searchEndpoint = "search.php";
        this.randomCocktailEndpoint = "random.php";

        // References to DOM elements
        this.resultsSection = document.getElementById('results');
        this.resultContainer = this.resultsSection.querySelector('.row');
        this.directions = document.querySelector('#ingredients p');
        this.directionHeading = document.querySelector('#ingredients h3')
        this.searchResultsText = document.querySelector('#results p')
        this.ingredientsList = document.querySelector('#ingredients ul');

        // Set up form submission event listener
        this.setupFormSubmit();
    }

    // Method to set up the form submission event listener
    setupFormSubmit() {
        const form = document.querySelector('form');
        form.addEventListener('submit', (event) => this.fetchCocktailData(event));
    }

    // Method to fetch cocktail data from the API based on user input
    fetchCocktailData(event) {
        event.preventDefault();
        const typeSelect = document.getElementById('type-select').value;
        const searchInput = document.getElementById('searchInput').value;
        let url;

        // Determine the URL based on the user's selection
        switch (typeSelect) {
            case 'cocktailName':
                url = `${this.cocktailPath}${this.searchEndpoint}?s=${searchInput}`;
                break;
            case 'random':
                url = `${this.cocktailPath}${this.randomCocktailEndpoint}`;
                break;
            default:
                console.log('Invalid option selected.');
                return;
        }

        // Fetch data from the API and process the response
        fetch(url)
            .then(res => res.json())
            .then(data => {
                // Clear previous search results
                this.clearResults();

                if (data.drinks && data.drinks.length > 0) {
                    // Process the first drink in the search results
                    const firstDrink = data.drinks[0];
                    const {
                        strDrink,
                        strDrinkThumb,
                        strInstructions
                    } = firstDrink;

                    // Populate the ingredients list
                    this.populateIngredientsList(firstDrink);

                    // Update directions and header image for the first drink
                    this.updateDirections(strInstructions, strDrink);
                    this.updateHeaderAndImage(strDrink, strDrinkThumb);

                    // Update search results text
                    this.updateSearchText(data.drinks.length);

                    // Process and append the other drinks in the search results
                    const otherDrinks = data.drinks.slice(1);
                    otherDrinks.forEach(drink => {
                        const {
                            strDrink,
                            strDrinkThumb
                        } = drink;
                        this.appendResultDiv(strDrink, strDrinkThumb);
                    });
                } else {
                    // Handle the case when no drinks are found
                    console.log('No drinks found for the given search.');
                }
            })
            .catch(err => {
                console.log(`error: ${err}`);
            });
    }

    // Method to clear previous search results
    clearResults() {
        while (this.resultContainer.firstChild) {
            this.resultContainer.removeChild(this.resultContainer.firstChild);
        }
        this.ingredientsList.innerHTML = '';
    }

    // Method to populate the ingredients list for a drink
    populateIngredientsList(drink) {
        for (let i = 1; i <= 15; i++) {
            const ingredientKey = `strIngredient${i}`;
            const measureKey = `strMeasure${i}`;
            const ingredient = drink[ingredientKey];
            const measure = drink[measureKey];

            if (ingredient && measure) {
                // Create list item with ingredient and measure
                const listItem = document.createElement('li');
                listItem.textContent = `${measure} ${ingredient}`;
                this.ingredientsList.appendChild(listItem);
            } else if (ingredient) {
                // Create list item with ingredient only
                const listItem = document.createElement('li');
                listItem.textContent = ingredient;
                this.ingredientsList.appendChild(listItem);
            }
        }
    }

    // Method to update the directions for a drink
    updateDirections(instructions, drink) {
        this.directions.textContent = instructions;
        this.directionHeading.textContent = drink
    }

    // Method to update the search results text. Currently just clears the text
    updateSearchText(numDrinks) {
        if (numDrinks > 1){
            this.searchResultsText.textContent = ""
        } else {
            this.searchResultsText.textContent = "No other drinks to show."
        }
    }

    // Method to update the header and image for the first drink
    updateHeaderAndImage(drinkName, drinkImage) {
        document.querySelector('h1').textContent = drinkName;
        document.querySelector('img').src = drinkImage;
        document.querySelector('label').textContent = "Need Another Idea?";
    }

    // Method to append a result div with image and title
    appendResultDiv(drinkName, drinkImage) {
        const resultDiv = this.createResultDiv(drinkName, drinkImage);
        // Add event listener to the image in the result div
        const image = resultDiv.querySelector('img');
        image.addEventListener('click', () => this.startNewSearch(drinkName));
        this.resultContainer.appendChild(resultDiv);
    }

    // Method to create a single result div with image and title
    createResultDiv(title, imageSrc) {
        const div = document.createElement('div');
        div.classList.add('col-4', 'col-6-medium', 'col-12-small');

        const imageLink = document.createElement('a');
        imageLink.href = "#";
        imageLink.classList.add('image', 'fit');
        div.appendChild(imageLink);

        const image = document.createElement('img');
        image.src = imageSrc;
        image.alt = "";
        imageLink.appendChild(image);

        const titleElement = document.createElement('h6');
        titleElement.textContent = title;
        div.appendChild(titleElement);

        return div;
    }

    // Method to start a new search when an image is clicked
    startNewSearch(keyword) {
        // Set the search input value with the drink name
        document.getElementById('searchInput').value = keyword;

        // Redirect to the home panel
        window.location.hash = '#home';

        // Trigger the form submission to initiate the new search
        const form = document.querySelector('form');
        form.dispatchEvent(new Event('submit'));
    }
}

// Create an instance of the CocktailApp class
const cocktailApp = new CocktailApp();