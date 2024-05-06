# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

### Installation

```console
npm install
```

### Local Development

```console
npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```console
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

```console
npm run serve
```

 This command tests your build locally before deploying to production.

## Deployment

```console
.\dotenv.ps1
npm run deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
