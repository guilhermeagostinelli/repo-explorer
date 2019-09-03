# Repository Explorer

Implementation of a Repository and Commit Explorer using React. The app connects to the [Github API](https://developer.github.com/v3/), lists all public repositories from a user, and the last commits for the repositories.

## Repository Exploration

The Repository Explorer page lists all public repositories from the user specified in the "Search by" field. Each repository is listed in a card with its basic information (name, description, creation date, language and stars) and with two links: "Go to GitHub", which navigates to the repository's GitHub page, and "See Commits".

## Commit Exploration

Clicking on "See commits" will take the user to the Commit Explorer page, where it is possible to see the last 20 commits on that repository, and also a search field for filtering the commit message by the specified term. Each commit is listed in a card with its basic information (commit message, author, commit date) and a link to see the commit on GitHub.

## Specifications

**This project contains:**

- Sort By field to change the order the repositories are shown (by stars, name, etc)
- Field to switch between ascending/descending order
- Use of a modern css solution ([Styled-components](https://www.styled-components.com/))
- API communication code using [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- State managing solution
- Use of [State](https://reactjs.org/docs/hooks-state.html) and [Effect](https://reactjs.org/docs/hooks-effect.html) Hooks instead of Class Components
- Unit and integration tests (more information below)
- Dynamic routing system with [React Router v5](https://reacttraining.com/react-router/)

**Modern ES6+ features:**

- Object destructuring: intuitive and flexible destructuring of Objects into individual variables during assignment, used for exemple as function parameters
- Arrow functions: more expressive closure syntax, used for declaring all functions of the app
- Use of `async`/`await` to deal with asynchronous operations: makes it possible to write way cleaner ("synchronous-like") code and error handling (`try`/`catch`) when compared to Promise chaining
- Spread operator: spreading of elements of an iterable collection (like an array or even a string) into both literal elements and individual function parameters, e.g. used as a cleaner way to pass props to components
- Template strings: intuitive expression interpolation for single-line and multi-line strings, used for cleaner concatenation of variables into a string

**Tests:**

  The tests were created and ran using [Jest](https://jestjs.io/) framework. The tests make use of:
  
- [Jest's Mock Functions API](https://jestjs.io/docs/en/mock-functions.html) to mock functions and simulate a different implementation of them
- [Jest's Spy On](https://jestjs.io/docs/en/jest-object#jestspyonobject-methodname) to track calls and arguments passed to a mocked function
- [jest-styled-components](https://github.com/styled-components/jest-styled-components) for unit testing styled components
- [react-test-renderer](https://reactjs.org/docs/test-renderer.html) for snapshot testing of React components that are stable
- [Act API](https://reactjs.org/docs/test-utils.html#act) for unit and integration testing of React components that hold a state and update logic (such as async calls)
- [jest-fetch-mock](https://github.com/jefflau/jest-fetch-mock) for mocking fetch functions
- [enzyme](https://airbnb.io/enzyme/) and its [Shallow Rendering API](https://airbnb.io/enzyme/docs/api/shallow.html) for testing routing behaviour

## Prerequisites

Just make sure you have [npm](https://www.npmjs.com/get-npm) installed.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm test -- --coverage`

Generates a test coverage report.<br>
Note that tests run much slower with coverage so it is recommended to run it separately from your normal workflow.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

## Contributing

Feel free to contribute with corrections, optimizations, etc. There are no strict guidelines on how one should contribute.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
