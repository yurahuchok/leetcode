function longestCommonPrefix(strs: string[]): string {
  let acc = ""; 
  for (let i = 0; i < Math.min(...strs.map((str) => str.length)); i++) {
    const char = strs.map((str) => str[i]).reduce((acc, char) => acc === char ? char : "");
    if (char === "") {
      break;
    }
    acc += strs[0][i];
  }
  return acc;
};
