const recipeBook = new Map<string, string[]>();

function cookable(recipe: string, chain: string[] = []): boolean {
  const record = recipeBook.get(recipe);

  if (record === undefined) {
    return false;
  }

  if (chain.includes(recipe)) {
    return false;
  }

  const result = record.every((ingredient) => cookable(ingredient, [...chain, recipe]));

  if (result === true) {
    recipeBook.set(recipe, []);
  } else {
    recipeBook.delete(recipe);
  }

  return result;
}

function findAllRecipes(recipes: string[], ingredients: string[][], supplies: string[]): string[] {
  recipeBook.clear();
  [...recipes, ...supplies].forEach((recipe, i) => recipeBook.set(recipe, ingredients[i] ?? []));
  return recipes.filter((recipe) => cookable(recipe));
};

console.log(
  findAllRecipes(
    ["burger","bread","sandwich"],
    [["sandwich","meat","bread"],["yeast","flour"],["bread","meat"]],
    ["yeast","flour","meat"],
  )
);
