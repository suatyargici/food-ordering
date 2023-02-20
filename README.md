
## Scripts

Run the development server

```bash
yarn dev
```

Building for production

```bash
yarn build
```

Run in production mode

```bash
yarn start
```

Run Storybook server

```bash
yarn storybook
```

Build Storybook as a static web application

```bash
yarn build-storybook
```

## Project directory structure

Main folder structure

```
📂 components
  ...📄 {Component}.jsx
  ...📂 {page}
     ...📄 {Component}.jsx

📂 lib
  📂 data
    ...📄 {service}.js
  📂 types
    ...📄 {type}.js

📂 pages
  📂 api
    ...📄 {apiPath}.ts
  _app.tsx ?
  _document.jsx ?
  ...📄 {path}.js

📂 public
  📂 icons
  📂 images
  📄 favicon.ico
  📄 robots.txt

📂 stories
  ...📄 {Component}.stories.tsx
  ...📂 {page}
     ...📄 {Component}.stories.tsx

📂 styles
  📄 globals.scss
```

## Project's main tech stack useful resources

### React

- [W3Schools React tutorial](https://www.w3schools.com/react) - Step-by-step guide to learning React.
- [React new Docs](https://beta.reactjs.org/learn) - react official documentation (in beta).
- [React old Docs](https://reactjs.org/docs) - react official documentation (to be replaced).

### Next.js

- [Learn Next.js](https://nextjs.org/learn) - the best way to start with next.js if you are new.
- [Next.js Docs](https://nextjs.org/docs) - learn about Next.js features and API.

### Tailwind Css

- [Tailwind Docs](https://tailwindcss.com/docs) - Tailwind Css official documentation and reference.
- [Tailwind with Next.js guide](https://tailwindcss.com/docs/guides/nextjs) - Tailwind installation guide with Next.js.
