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



function logCocktails() {
    fetch(cocktailPath + searchEndpoint + "?s=mar")
    .then(res => res.json()) // parse response as JSON
    .then(data => {
        console.log(data)
    })
    .catch(err =>{
        console.log(`error: ${err}`)
    });
  }

  logCocktails()