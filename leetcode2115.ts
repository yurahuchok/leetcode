type RecipeBook = Record<string, {
  id: string;
  ingredients: string[];
}>

let recipeBook: RecipeBook = {};

function canPrepare(recipe: string, chain: string[] = []): boolean {
  const record = recipeBook[recipe];

  if (record === undefined) {
    return false;
  }

  if (chain.includes(recipe)) {
    return false;
  }

  const result = record.ingredients.every((ingredient) => canPrepare(ingredient, [...chain, recipe]));

  if (result === true) {
    recipeBook[recipe] = {
      id: recipe,
      ingredients: [],
    }
  }

  return result;
}

function findAllRecipes(recipes: string[], ingredients: string[][], supplies: string[]): string[] {
  recipeBook = {};

  [...recipes, ...supplies].forEach((recipe, i) => {
    recipeBook[recipe] = {
      id: recipe,
      ingredients: ingredients[i] ?? [],
    };
  });

  return recipes.filter((recipe) => canPrepare(recipe));
};
