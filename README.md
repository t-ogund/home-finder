This is an app called Home Finder (creative, I know). You simply enter a city or zip code 
and the app will display properties for sale or for rent in the area. Each property will also be 
plotted on a map.

This app was build with React, React-Bootstrap, and Redux.

Home Finder integrates two APIs:
  A Zillow API, which provides the property data (https://rapidapi.com/apimaker/api/zillow-com1)
  The Google Maps React API, which provides the map (https://www.npmjs.com/package/@react-google-maps/api)

To start the app:
  Clone the app from the main branch using git clone
  Navigate to the project directory and run an npm install to install all the project dependencies
  Finally run an npm start
  
<b>Known limitations:</b>

  Why are there only 40 results per location?<br>
    The Zillow API only allows <a href="https://rapidapi.com/apimaker/api/zillow-com1/tutorials/frequently-asked-   questions#:~:text=40%20records%20per%20page%20is%20the%20maximum.%20You%20will%20have%20to%20use%20the%20loop%20and%20refer%20to%20the%20API%20page%20per%20page%20(f rom%201%20to%2020%2C%2020%20pages%20%3D%2020%20API%20calls).">40 results per location for each API call</a>.
    Receiving all results for a particular location would result in several API calls. Since this is simply a 
    portfolio project, using a paid API, I will be sticking with 40 results per location.
  
  Why do some locations have less than 40 results?<br>
    Of the 40 results that are returned per location, some do not have the price determined yet. Others do not have a latitude and longitude provided. 
    As a result, properties whose price value is null and properties whose latitude/longitude is null have been filtered out.

Thanks for checking it out!



# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
