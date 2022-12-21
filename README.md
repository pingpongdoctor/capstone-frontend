![Logo](https://res.cloudinary.com/dtdzvyf4s/image/upload/v1671582202/build-your-diets-low-resolution-logo-white-on-black-background_ouha7g.png)

# Build Your Diet

This project is about building a website to help users designing their own diets quickly and effortlessly. Users can calculate their suitable macronutrient ratios and diversify their dishes by refering to the recipe library. All pages are responsive in different breakpoints such as mobile, tablet and desktop breakpoints.

## Features

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

- React JS
- React Component - React Components are applied to create reuseable components and create multi-view single pages.
- Slick Library - React slick is a carousel component built with React. The homepage has an image carousel that is built by using this library.
- Chart.js Library - React components for Chart.js is one of the most popular charting libraries. The website uses the Pie chart and the Line chart from this library.
- Fitness Calculator Library - This library helps perform calculations for your BMI, BMR, calorie needs, total daily energy expenditure, macros and much more.
- Cloudinary - Cloudinary is used to store the recipe images posted from frontend.

## Tech Stack Backend

- JWT token - JWT token helps authenticating users.
- Node.js
- Express - Express framework is used to build endpoints for fetching data from tables.
- Knex library - Knex is a SQL query builder that helps form SQL table by using javascript codes and query data from SQL tables such as user data, macro data, recipe data and comment data.

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

Run the below commands to use migration file and seed file to form the SQL table

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

## Links

- Link to [Frontend](https://github.com/pingpongdoctor/capstone-frontend)
- Link to [Backend](https://github.com/pingpongdoctor/capstone-backend)
