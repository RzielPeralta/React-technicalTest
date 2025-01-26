# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
Decisiones 
La primer decision que tome fue en donde compilar mi proyecto React, esto debido a que se me presentaron problemas con mi equipo al querer crearlo con create-react-app,
por lo tanto opte por usar vite para esto, una vez creado el archivo comencé a crear mi estructura de carpetas.

Para la conexión con la API de imgBB se considero usar axios para esto, sin embargo tuve inconvenientes al instalar dependencias de esta lib, por lo que opte por usar fetch

Realice una busqueda APIS gratuitas que me permitieran obtener usuarios aleatorios, sin embargo mi busquda no fue exitosa, a lo cual opte por generar un array con 50 datos aleatorios, de este modo alterne en la tabla dos arrays, uno en el cual inyecto un usuario por medio del formulario y almacenado en el localStorage, de este modo me permitio alterna la visualizacion en mi tabla, donde si localStorage esta vacio muestro los datos que genere de manera aleatoria, en caso contrario muestro lo que hay en localStorage

Bibliotecas/Frameworks empleados:
Para el desarrollo de esta prueba se utilizó lo siguiente:
React con TypeScript en todo el proyecto
Material UI para construir las interfaces de tabla y formulario
React-Hook-Form, se empleo para validar los campos en el formulario
zod, se utilzó para construir el esquema de validación en los campos del formulario
imgBB, utilizado para la carga de imagenes mediante la obtención de una API key

Como dependencias adicionales se integraron:
Material Icons
gh-pages, para poder hacer un deploy con vite
npm, para instalar dependencias y/o actualizarlas

Desafios

El mayor desafio, considero fue intentar implementar el mapa, y es que al intentar esto tuve ocasiones en que el codigo se rompia, por cual opte por no implementarlo, y seguir revisando la documentacion de la API
de Google Maps

El ordenamiento asc-desc en las columnas tambien fue un desafio, y es que por accesibilidad para este caso unicamente considere aplicar el ordenamiento en la primera columna, esto por orden alfabetico, de este modo los usuarios que muestro en la tabla se orden por alfabeto

