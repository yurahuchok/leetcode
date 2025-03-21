function findAllRecipes(recipes: string[], ingredients: string[][], supplies: string[]): string[] {
  const recipeMap = new Map<string, string[]>();
  [...recipes, ...supplies].forEach((r, i) => recipeMap.set(r, ingredients[i] ?? []));

  const cookable = (recipe: string, chain: Set<string> = new Set<string>()) => {
    const record = recipeMap.get(recipe);

    if (record === undefined) {
      return false;
    }

    if (record.length === 0) {
      return true;
    }

    if (chain.has(recipe)) {
      return false;
    }
  
    const result = record.every((ingredient) => cookable(ingredient, chain.add(recipe)));

    if (result === true) {
      recipeMap.set(recipe, []);
    } else {
      recipeMap.delete(recipe);
    }
  
    return result;
  };

  return recipes.filter((recipe) => cookable(recipe));
};

console.log(
  findAllRecipes(
    ["burger","bread","sandwich"],
    [["sandwich","meat","bread"],["yeast","flour"],["bread","meat"]],
    ["yeast","flour","meat"],
  )
);
