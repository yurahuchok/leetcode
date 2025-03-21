function longestCommonPrefix(strs: string[]): string {
  const maxLength = Math.min(...strs.map((str) => str.length));

  let acc = ""; 

  for (let i = 0; i < maxLength; i++) {
    const same = strs.every((str) => str[i] === strs[0][i]);
    if (!same) {
      break;
    }

    acc += strs[0][i];
  }

  return acc;
};
