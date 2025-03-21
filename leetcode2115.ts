function findAllRecipes(recipes: string[], ingredients: string[][], supplies: string[]): string[] {
  const recipeMap = new Map<string, string[]>();
  
  const supplied = new Set<string>();
  const processed = new Set<string>();

  recipes.forEach((r, i) => recipeMap.set(r, ingredients[i] ?? []));
  supplies.forEach((s) => supplied.add(s));

  const cookable = (recipe: string) => {
    if (supplied.has(recipe)) {
      return true;
    }
  
    const record = recipeMap.get(recipe);
    if (record === undefined || processed.has(recipe)) {
      return false;
    }
  
    processed.add(recipe);
  
    const result = record.every((ingredient) => cookable(ingredient));
    if (result) {
      supplied.add(recipe);
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
