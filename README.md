# node-ts-devcontainer

## Init project

Reconfigure the project for your needs.

```bash
rm package.json yarn.lock tsconfig.json biome.json

# Init project
yarn init
yarn add -D typescript nodemon ts-node @types/node
yarn run tsc --init

# Add biome(formatter, linter)
yarn add -D @biomejs/biome
yarn run biome init

# Add nodemon(dev server)
yarn add -D nodemon
```

## Add scripts

```json
"scripts": {
    "build": "tsc",
    "lint": "biome lint",
    "lint:fix": "biome lint --write",
    "format": "biome format",
    "format:fix": "biome format --write",
}
```

## Run sample

Add scripts to `package.json`:

```json
"scripts": {
    "dev": "nodemon --watch 'src/**/*.ts' --exec 'ts-node' src/index.ts",
}
```

```bash
yarn add express @types/express
yarn dev
```
