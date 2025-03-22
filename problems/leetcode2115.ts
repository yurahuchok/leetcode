const cookBook = new Map<string, string[]>();

function cookable(recipe: string) {
  const record = cookBook.get(recipe);

  if (record === undefined) {
    return false;
  }

  if (record.length === 0) { // If no ingredients required - the recipe is cookable.
    return true;
  }

  cookBook.delete(recipe); // Removing requested recipe to avoid infinite loop when recipes require parent recipes.

  const result = record.every((ingredient) => cookable(ingredient));

  if (result === true) {
    cookBook.set(recipe, []); // Setting no ingredient requirements for this cookable recipe for future requests.
  }

  return result;
}

function fillCookBook(recipes: string[], ingredients: string[][], supplies: string[]) {
  cookBook.clear();
  [...recipes, ...supplies].forEach((r, i) => cookBook.set(r, ingredients[i] ?? []));
}

function findAllRecipes(recipes: string[], ingredients: string[][], supplies: string[]): string[] {
  fillCookBook(recipes, ingredients, supplies);
  return recipes.filter((recipe) => cookable(recipe));
};
