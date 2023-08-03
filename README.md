# Cocktail Searcher App

This is a simple web application that allows you to search for cocktail recipes using TheCocktailDB API. You can search for cocktails by name or get a random cocktail suggestion.

You can view a live demo [here](https://drinkypooforyou.netlify.app).

## Getting Started

### Prerequisites

Before running the app, you need to have Node.js and npm (Node Package Manager) installed on your computer. If you don't have them, you can learn how here: [Downloading and Installing Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

### Running the App

Follow the steps below to run the app on your local machine:

Step 1: Clone the repository and navigate to the project folder
```
git clone https://github.com/vguzman812/CocktailDB.git
cd CocktailDB
```
Step 2: In order to run the app locally, you need to install the live-server package. You can install it globally by running the following command:
```
npm install -g live-server
```
Step 3: After installation, run the following command to start the live server:
```
live-server
```
You should get a response like this:
```
Serving "/Path/to/wherever/you/cloned/the/repo/CocktailDB" at http://127.0.0.1:8080
Ready for changes
```
This command will start the live server and open the app in your default web browser. If it doesn't open automatically, you can access the app by navigating to the URL provided by `live-server`, usually `http://127.0.0.1:8080` or `http://localhost:8080`.

Now, you should see your Cocktail Searcher app running on the live server, and any changes you make to the files will automatically trigger a refresh in the browser.

Keep in mind that using this method is intended for development and testing purposes. For production deployment, you'll need to host your app on a proper web server.

## How to Use

1. Open the app in your web browser by following the installation instructions.
2. Choose one of the options from the dropdown menu:
   - "Search by cocktail name" to search for cocktails by name.
   - "Get random cocktail" to get a random cocktail suggestion.
3. Enter your search query in the input field and click "Search."
4. If the search returns results, the first cocktail will be displayed with its ingredients and instructions. Additional cocktails will be shown in the "results" panel.
5. Click on an image of one of other cocktails to view their details.
6. To start a new search, navigate back to the main panel and resubmit the form.

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or bug reports, please create an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute the code for your own purposes.

