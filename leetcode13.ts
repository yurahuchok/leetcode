const map = {
  "I": 1,
  "V": 5,
  "X": 10,
  "L": 50,
  "C": 100,
  "D": 500,
  "M": 1000,
  "IV": 4,
  "IX": 9,
  "XL": 40,
  "XC": 90,
  "CD": 400,
  "CM": 900,
};

function romanToInt(s: string): number {
  let acc = 0;

  for (let i = 0; i < s.length; i++) {
    if (s[i+1] !== undefined && map[`${s[i]}${s[i+1]}`] !== undefined) {
      acc += map[`${s[i]}${s[i+1]}`] ?? 0;
      i++;
      continue;
    }

    acc += map[s[i]] ?? 0
  }

  return acc;
};
