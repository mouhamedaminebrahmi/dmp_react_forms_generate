# Dynamic form generation

# Getting Started with dynamic form generation

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## steps

- Copy the content of src file
- Copy the app.js
- Add this css to app.css

```sh
.outline-red {
  outline: 1px solid #dc3545;
}
```

- Add this to index.js

```sh
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Global from "./components/context/Global";
import { Toaster } from "react-hot-toast";
```

```sh
<Global>
    <App />
    <Toaster position="top-center" reverseOrder={false} />
  </Global>
```

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Global from "./components/context/Global";
import { Toaster } from "react-hot-toast";
```

- Add fontAwesome to index.html

```sh
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" />
```

- Delete app.test.js

## Tech

dynamic form generation uses a number of open source projects to work properly:

- [react-bootstrap](https://react-bootstrap.github.io/) - React-Bootstrap replaces the Bootstrap JavaScript. Each component has been built from scratch as a true React component, without unneeded dependencies like jQuery!
- [dompurify](https://github.com/cure53/DOMPurify) - DOMPurify is a DOM-only, super-fast, uber-tolerant XSS sanitizer for HTML, MathML and SVG.
- [draft-js](https://github.com/facebookarchive/draft-js) - Draft.js is a JavaScript rich text editor framework, built for React and backed by an immutable model. Extensible and Customizable.
- [react-hot-toast](https://react-hot-toast.com/) - Add beautiful notifications to your React app with react-hot-toast. Lightweight. Smoking hot by default.
- [react-select](https://react-select.com/home) - A flexible and beautiful Select Input control for ReactJS with multiselect, autocomplete, async and creatable support.
- [sweetalert](https://sweetalert2.github.io/) - A BEAUTIFUL, RESPONSIVE, CUSTOMIZABLE, ACCESSIBLE (WAI-ARIA) REPLACEMENT FOR JAVASCRIPT'S POPUP BOXES

## Installation

Dynamic form generation requires [Node.js](https://nodejs.org/) v10+ to run.

Install the dependencies .

```sh
npm i react-select draft-js react-draft-wysiwyg draftjs-to-html html-to-draftjs
npm i react-bootstrap bootstrap dompurify
npm i react-hot-toast sweetalert
```

For developement testing environment...

```sh
npm install --save-dev @testing-library/react @testing-library/jest-dom react-test-renderer
npm install --save-dev enzyme @cfaester/enzyme-adapter-react-18
```

> Note: `Reactjs < 18` is required to install a enzyme adapter for every react js version.

```sh
npm install --save-dev npm i enzyme-adapter-react-16
```

## Development

By default, the react js app will expose port 3000.

Open your favorite Terminal and run these commands.

Run project:

```sh
npm start
```

Generating built files for distribution:

```sh
npm run build
```

(optional) run project with build files:

```sh
npx serve -s build
```

#### Unit test

For developement:

```sh
npm run test
```

## License

MIT

**Free Software, Hell Yeah!**
