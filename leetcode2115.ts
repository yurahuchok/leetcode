class Recipe {
  constructor(protected id: string, protected ingredients: Recipe[]) {};

  getId(): string {
    return this.id;
  }

  canPrepare(): boolean {
    return this.ingredients.every((i) => i.canPrepare());
  }
}

type RecipeBook = {
  id: string,
  ingredients: string[],
}[];

function makeRecipes(recipeIds: string[], recipeBook: RecipeBook): Recipe[] {
  return recipeIds.map((id) => {
    const record = recipeBook.find((record) => record.id === id);

    if (record) {
      const ingredients = makeRecipes(
        recipeBook.find((record) => record.id === id)?.ingredients ?? [],
        recipeBook
      );
  
      return new Recipe(id, ingredients);
    }

    return null;
  }).filter((val) => val !== null);
};

function findAllRecipes(recipes: string[], ingredients: string[][], supplies: string[]): string[] {
  const recipeBook: RecipeBook = [...recipes, ...supplies].map((id, i) => ({
    id: id,
    ingredients: ingredients[i] ?? [],
  }));

  console.log(recipeBook);

  const result = makeRecipes(recipeBook.map((record) => record.id), recipeBook);

  console.log(result);

  return result
    .filter((recipe) => recipes.includes(recipe.getId()))
    .filter((recipe) => recipe.canPrepare())
    .map((recipe) => recipe.getId());
};

console.log(
  findAllRecipes(
    ["bread"],
    [["yeast","flour"]],
    ["yeast"],
  )
);
