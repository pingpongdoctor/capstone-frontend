![Logo](https://res.cloudinary.com/dtdzvyf4s/image/upload/v1671582202/build-your-diets-low-resolution-logo-white-on-black-background_ouha7g.png)

# Build Your Diet

https://buildyourdiet.netlify.app/

This project is about building a website to help users designing their own diets quickly and effortlessly. Users can calculate their suitable macronutrient ratios and diversify their dishes by refering to the recipe library. All pages are responsive in different breakpoints such as mobile, tablet and desktop breakpoints.

![](https://github.com/pingpongdoctor/capstone-frontend/blob/main/demo.gif)

## Key Features

- Allow users to have their own accounts
- Calculate macronutrients
- Save macros to a list
- Add new macro
- Edit an exsiting macro
- Learn how to cook with recipe library
- Add new recipe
- Edit your posted recipes
- Give comments and likes for recipes

## Tech Stack Frontend

- React JS.
- React Component - React Components are applied to create reusable components and create multi-view single pages.
- Slick Library - React slick is a carousel component built with React. The homepage has an image carousel that is built by using this library.
- Chart.js Library - React components for Chart.js is one of the most popular charting libraries. The website uses the Pie chart and the Line chart from this library.
- Fitness Calculator Library - This library helps perform calculations for your BMI, BMR, total daily energy expenditure, and so on.
- Cloudinary - Cloudinary is used to store the recipe images posted from frontend.
- Sha256 Library - This library is used to hash email and password on the front end to protect users from being hacked.

## Tech Stack Backend

- JWT token - JWT token helps authenticating users.
- Node.js
- Express - Express framework is used to to create routes, deploy libraries and apply routes on the index.js file.
- REST API - Use REST API for building endpoints to fetch data.
- MySQL Workbench - This is a visual tool is used to build, query, and manage relational databases.
- Knex library - Knex is applied to query databases such as user data, macro data, recipe data and comment data.
- Bcrypt Library - The encrypted password and email on frontend are again encrypted on the backend by using the bcrypt library. This immensly enhance the security level for the website.

## Installation

### Frontend

Create an env file that includes all information as same as the env.sample file.

Install node-module and pakage json files with npm

```bash
  npm install
```

Run the website with npm

```bash
  npm start
```

### Backend

Since the website uses databases for storing data on the backend, we need to install a SQL query tool.

[Download SQL Workbench](https://github.com/hheennrryyb/rhythm-music-server)

After installing the SQL query application, you then create a database (schema) called capstone.

Create an env file that includes all information as same as the env.sample file.

Change the values of user and password variables so that they matches with your SQL app's username and password.

Run the below commands to use migration file and seed file to form the SQL tables.

```bash
  npx knex migration:latest
```

```bash
  npx knex seed:run
```

Now you can run the server

```bash
npm start
```

## Log in accounts

Since the website authenticates users by using JWT token, you have to log in to use the full website's feature. There are two available accounts below for you or you can sign up for a new account.

- Email: simon@gmail.com | Password: 123456Aa@
- Email: greg@gmail.com | Password: 123456Aa@

## Links

- Link to [Frontend](https://github.com/pingpongdoctor/capstone-frontend)
- Link to [Backend](https://github.com/pingpongdoctor/capstone-backend)
