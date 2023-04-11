[![React](https://skillicons.dev/icons?i=react)](https://reactjs.org/docs/hello-world.html)
[![Bootstrap](https://skillicons.dev/icons?i=bootstrap)](https://react-bootstrap.github.io/getting-started/introduction/)

# Using React Router
`index.js`\
This file handles all URL routing.
Use the following to add a new route:
```
<Route path='' element={} />
```

If you nest routes, the paths will stack.<br><br>
**Example:**\
account/sign-in, account/view, and account/sign-out are all separate pages:
```
<Route path="account">
    <Route path="sign-in" element={<SignIn />} />
    <Route path="view" element={<AccountView />} />
    <Route path="sign-out" element={<SignOut />} />
</Route>
```
If you nest routes, and include an element in the parent Route, you can have its children still render using React Router's [Outlet](https://reactrouter.com/en/6.8.2/components/outlet).

<br>

# Using Font Awesome
Find an icon you want to use [here](https://fontawesome.com/search?o=r&s=solid%2Cregular).

Then in your file, make sure to import FontAwesome:
```
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
```
as well as icon you want to use from either the solid or regular library, replacing NAME with the icon's name in PascalCase:
```
import { faNAME } from '@fortawesome/free-solid-svg-icons'
or
import { faNAME } from '@fortawesome/free-regular-svg-icons'
```
<br>

**Example:**\
Wanting to import ["rotate-left"](https://fontawesome.com/icons/rotate-left?s=solid&f=classic).
```
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons';
```
<br>

# Using React

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
