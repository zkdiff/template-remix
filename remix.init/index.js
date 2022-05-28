const crypto = require("crypto");
const fs = require("fs/promises");
const path = require("path");

async function main({ rootDirectory }) {
  const EXAMPLE_ENV_PATH = path.join(rootDirectory, ".env.example");
  const ENV_PATH = path.join(rootDirectory, ".env");
  const PACKAGE_JSON_PATH = path.join(rootDirectory, "package.json");

  const APP_NAME = path.basename(rootDirectory).replace(/[^a-zA-Z0-9-_]/g, "-");

  const [env, packageJson] = await Promise.all([
    fs.readFile(EXAMPLE_ENV_PATH, "utf-8"),
    fs.readFile(PACKAGE_JSON_PATH, "utf-8"),
  ]);

  const newEnv = env.replace(
    /^SESSION_SECRET=.*$/m,
    `SESSION_SECRET="${crypto.randomBytes(16).toString("hex")}"`
  );

  const newPackageJson = packageJson.replace(
    /template-super-simple-start-to-remix/g,
    APP_NAME
  );

  await Promise.all([
    fs.writeFile(ENV_PATH, newEnv),
    fs.writeFile(PACKAGE_JSON_PATH, newPackageJson),
    fs.copyFile(
      path.join(rootDirectory, "remix.init", "gitignore"),
      path.join(rootDirectory, ".gitignore")
    ),
  ]);

  console.log(`Setup is complete.`);
}

module.exports = main;
