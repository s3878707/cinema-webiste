# rmit2023b-cosc2758-fullstack - Loop Cinemas

## Background: 
During the COVID-19 pandemic, it was expected that many businesses and some industries would cease to exist after a
few years of being closed. One such industry was the film and cinema industry. Fortunately, going to see a movie in
person has continued to exist, with some films continuing to break box office records. With the ever-growing adoption
of streaming platforms such as Netflix, cinema operators are looking at ways to improve the way that they engage with
their customers and use technology online.
Loop Cinemas is a long running cinema operator with several cinema locations around Australia. They focus on a
premium, unique experience and bringing community into their cinema experiences. In addition to displaying the latest
and greatest films, Loop also holds a few community events, art shows and the like at their locations.
One challenge Loop Cinemas is facing is that whilst they do a very good job delivering a great cinema experience, they
have not kept up with the times and have very little technology and online capabilities as part of their business.
Their competitors have features like online booking, film ratings, reviews, and search. Loop Cinemas do not have these
features and as a result they are being left behind, with customers preferring to go to other cinemas because they provide
a better user experience prior to arriving in the cinema.
For all the above reasons, you have been approached by a senior representative of Loop Cinemas who have secured
funding to build a new website experience for their business. The project has been codenamed “Loop Web”.
At this stage, Loop Web will help potential customers discover upcoming films, session times and see ratings and
reviews from other moviegoers.

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

# Folder Structure:
```
C:.
├───components
│   ├───Button
│   ├───footer
│   ├───movie
│   ├───nav
│   ├───Post
│   └───Rate
├───Pages
│   ├───EditPost
│   ├───Home
│   ├───Login
│   ├───MyProfile
│   ├───register
│   └───Review
└───Repository
```

## There are 3 main folders in /scr: Components, Pages and Repository.
### Components
This folder stores components such as navbar, footer, post, etc

### Pages
All main pages are stored in this folder.
`Register folder`: this folder is used to store register page.
`Login folder`: This folder is used to store login page.
`EditPost folder`: This folder is used to store the page used to edit review post.
`Review folder`: This folder is used to store review film page.
`MyProfile folder`: This folder is used to store both Profile page and Edit Profile page.
`Home folder`: This folder is used to store Homepage.

### Repository
This folder is used to store all the files that is used to deal with localStorage.
`Account.js`: This file is used to deal with all the data related to user account in localStorage.
`Review.js`: This file is used to deal with all the data related to review/feeback in localStorage.
`Security.js`: This file is used to deal with all the data related to handle fake posts in localStorage.

# Development Environment
### Global Requirements

| Requirement                        | Version |
|:-----------------------------------|:-------:|
| [ReactJS](https://react.dev/)      | 18.2.0  |


