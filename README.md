# careacademy

This is Home Test project which manages notes.

## Requirements

1. Assume that you are writing “production-ready” code
2. The user can create, view, edit, and remove plain text notes
   1. No special formatting required
3. This is a single user web application
   1. No need for multiple user accounts
4. Style the app to make it user-friendly, bonus for looking nice
5. Create at least one unit and one e2e test (Cypress is a nice to have)

## Tech-Stacks

```
  HTML/Vue.js, Typescript, SCSS
```

## Project Structure

`./src/components` - Contains definition of Components

- `NotesComponents` - Defines NotesItem

  - `NotesComponents.html` - Defines Template
  - `NotesComponents.scss` - Defines Style
  - `NotesComponents.ts` - Defines Scripts
  - `NotesComponents.vue` - Imports Template, Style, Scripts and Export component

- `TitleComponent` - Defines TitleComponent
  - `TitleComponent.html` - Defines Template
  - `TitleComponent.scss` - Defines Style
  - `TitleComponent.ts` - Defines Scripts
  - `TitleComponent.vue` - Imports Template, Style, Scripts and Export component

`./src/views` - Contains definition of Pages

- `HomeView.html` - Defines Template
- `HomeView.scss` - Defines Style
- `HomeView.ts` - Defines Scripts
- `HomeView.vue` - Imports Template, Style, Scripts and Export component

`./tests/e2e/specs/test.js` - E2E testing scripts using cypress

`./tests/unit` - Contains the scripts of unit testing scripts

- `NotesComponent.spec.ts` - testing scripts of NotesComponent
- `TitleComponent.spec.ts` - testing scripts of TitleComponent

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your unit tests

```
npm run test:unit
```

### Run your end-to-end tests

```
npm run test:e2e
```

### Lints and fixes files

```
npm run lint
```
