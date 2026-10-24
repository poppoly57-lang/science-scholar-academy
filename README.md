# React + Vite

## Subject catalog setup

The initial Science Scholar Academy catalog is maintained in `src/data/subjectSeed.js`. After signing in with an account that has the Firebase custom claim `admin: true`, the catalog can be safely created once from the browser console:

```js
const { seedSubjectsIfMissing } = await import('/src/services/subjectService.js')
await seedSubjectsIfMissing()
```

The operation creates only missing subject documents and marks them unpublished. An administrator must publish each subject by setting `published` to `true` in Firestore before students can read it. Firestore rules reserve catalog and topic writes for accounts with the trusted `admin` custom claim; students can read published entries only.

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
