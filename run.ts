import minimist from "minimist";
import { resolve } from "path";
import { promises as fs } from "fs";

const args = minimist(process.argv.slice(2));
const file = args.file ?? args.f ?? undefined;

if (file === undefined) {
  throw new Error(`"--file/-f" argument is not defined.`);
}

async function exec() {
  const path = resolve(process.cwd(), file);

  await fs.readFile(path, "utf-8");
  const module = await import(path);

  console.log("Result:", module.default || module); // Assuming the default export or the module itself.
}

exec();
