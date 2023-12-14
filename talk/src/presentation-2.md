---
theme: uncover
class:
  - modern
  - invert
paginate: true
---

# Modern Micro&nbsp;Frontends Concepts

---

<style scoped>
section {
  justify-content: normal;
}
</style>

# Agenda

1) Micro Frontend Discovery
2) Distributed Development
3) Island Architectures
4) Summary

---

<style scoped>
section {
  justify-content: normal;
}
</style>

# Caution

✨ This session is all about code.

⚠️ All coding will be done live.

---

<style scoped>
section {
  justify-content: normal;
}
</style>

# Sample Project

See codebase: [piral-samples/christmas-sample](https://github.com/piral-samples/christmas-sample)

* Netflix clone
* Currently already using micro frontends
* Primary goal: Make development more flexible

---

# Project Progress

<style scoped>
li {
  list-style: none;
}
</style>

- ⬜️ Deploy application
- ⬜️ Introduce micro frontend discovery
- ⬜️ Add new feature outside monorepo
- ⬜️ Take a look at islands

---

```js
const instance = createInstance({
  state: {
    components: {
      Layout,
      LoadingIndicator: Loading,
    },
    routes: {
      "/": () => <Navigate to="/browse" />,
    },
  },
  requestPilets() {
    return fetch('./pilets.json').then(res => res.json());
  },
});
```

---

```sh
#!/bin/bash

npm run build --workspace=christmas-demo-app -- --type release
npx pilet build 'packages/*-pilet' --type manifest
mv packages/app/dist/release/* dist/

npx http-server dist
```

---

<style scoped>
li {
  list-style: none;
}
</style>

# Project Progress

- ✅ Deploy application
- ⬜️ Introduce micro frontend discovery
- ⬜️ Add new feature outside monorepo
- ⬜️ Take a look at islands

---

```js
const instance = createInstance({
  state: {
    components: {
      Layout,
      LoadingIndicator: Loading,
    },
    routes: {
      "/": () => <Navigate to="/browse" />,
    },
  },
  requestPilets() {
    return fetch(
      "https://munichjs-christmas-demo.my.piral.cloud/api/v1/pilet"
    )
      .then((res) => res.json())
      .then((data) => data.items);
  },
});
```

---

```sh
#!/bin/bash

npm run build --workspace=christmas-demo-app -- --type release

npx pilet publish --fresh 'packages/*-pilet' \
  --url https://munichjs-christmas-demo.my.dev.piral.cloud/api/v1/pilet \
  --interactive

npx http-server packages/app/dist/release
```

---

<style scoped>
li {
  list-style: none;
}
</style>

# Project Progress

- ✅ Deploy application
- ✅ Introduce micro frontend discovery
- ⬜️ Add new feature outside monorepo
- ⬜️ Take a look at islands

---

```sh
#!/bin/bash

npm run build --workspace=christmas-demo-app -- \
  --type emulator-website

npx http-server packages/app/dist/emulator
```

```sh
npm init pilet@latest -- \
  --source http://localhost:8080/emulator.json \
  --bundler esbuild \
  --defaults 
```

---

```jsx
// Browse Pilet
export function setup(api: PiletApi) {
  const MovieTile = (props) => (
    <api.Extension name="movie-tile" params={props} />
  );

  const Buttons = (props) => (
    <api.Extension name="movie-buttons" params={props} />
  );

  api.registerPage("/browse", () =>
    <BrowsePage MovieTile={MovieTile} Buttons={Buttons} />
  );
}
```

---

```jsx
// (New!) Favorites Pilet
export function setup(api: PiletApi) {
  const MovieTile = (props) => (
    <api.Extension name="MovieTile" params={props} />
  );

  api.registerPage("/favorites", () => (
    <Favorites MovieTile={MovieTile} />
  ));

  api.registerExtension("menu", () => <Menu />);

  api.registerExtension("movie-buttons", ({ params }) => (
    <FavoriteToggle {...params} />
  ));
}
```

---

<style scoped>
li {
  list-style: none;
}
</style>

# Project Progress

- ✅ Deploy application
- ✅ Introduce micro frontend discovery
- ✅ Add new feature outside monorepo
- ⬜️ Take a look at islands

---

# 🏝 Islands

Look at the demo code at:

[piral-samples/netflix-islands-demo](https://github.com/piral-samples/netflix-islands-demo)

Or the available website:

[netflix-islands-demo.azurewebsites.net](https://netflix-islands-demo.azurewebsites.net/browse)

---

<style scoped>
li {
  list-style: none;
}
</style>

# Project Progress

- ✅ Deploy application
- ✅ Introduce micro frontend discovery
- ✅ Add new feature outside monorepo
- ✅ Take a look at islands

---

<style scoped>
section {
  justify-content: normal;
}
</style>

# Summary

* Micro Frontend discovery enables high-scalability for feature development
* Distributed development requires infrastructure
* Micro Frontends can be application agnostic
* Islands help to make Micro Frontends go much faster
