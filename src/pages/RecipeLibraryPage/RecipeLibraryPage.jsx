import "./RecipeLibraryPage.scss";
import RecipeItem from "../../components/RecipeItem/RecipeItem";
import axios from "axios";
import { useState, useEffect } from "react";
const URL = process.env.REACT_APP_API_URL || "";

export default function RecipeLibraryPage({ loginState, userProfile }) {
  //STATE TO GET DATA OF ALL RECIPES AND THE CORRESPONDING INGREDIENTS
  const [recipes, setRecipes] = useState("");

  //USE EFFECT TO GET THE RECIPE DATA
  useEffect(() => {
    axios
      .get(`${URL}/recipe-library`)
      .then((response) => {
        setRecipes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="recipe-library">
      <h1 className="recipe-library__heading">Recipe Library</h1>
      <ul className="recipe-library__items">
        {recipes &&
          recipes.map((recipe) => (
            <RecipeItem
              key={recipe.id}
              id={recipe.id}
              recipeImage={recipe.image}
              recipeName={recipe.recipe_name}
              recipePosterId={recipe.poster_id}
              loginState={loginState}
              userProfile={userProfile}
            />
          ))}
      </ul>
    </div>
  );
}
