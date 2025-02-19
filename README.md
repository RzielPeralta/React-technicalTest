Proyecto de React con Vite: Implementación de Tabla de Usuarios
Este proyecto fue desarrollado utilizando React con TypeScript y Vite como bundler. Aquí te explico cómo ejecutar el proyecto y algunas decisiones importantes que tomé durante su desarrollo.

🛠️ ¿Cómo correr el proyecto?
Requisitos
Node.js: Asegúrate de tener instalado Node.js (se recomienda la versión 16 o superior).
npm: Este proyecto usa npm para gestionar dependencias.
Pasos para ejecutar el proyecto
Clona el repositorio:

bash
Copiar
git clone https://github.com/tu_usuario/tu_repositorio.git
Accede a la carpeta del proyecto:

bash
Copiar
cd tu_repositorio
Instala las dependencias:

bash
Copiar
npm install
Inicia el proyecto en modo desarrollo:

bash
Copiar
npm run dev
El proyecto estará disponible en http://localhost:3000.

Compila el proyecto para producción (opcional):

bash
Copiar
npm run build
Despliegue en producción (opcional):

bash
Copiar
npm run deploy
📝 Decisiones
Durante el desarrollo del proyecto, tomé algunas decisiones clave:

1. Uso de Vite en lugar de Create-React-App
Inicialmente intenté crear el proyecto con create-react-app, pero me encontré con problemas debido a las configuraciones de mi equipo. Por eso decidí utilizar Vite para compilar el proyecto, lo cual mejoró el tiempo de arranque y la experiencia general de desarrollo.

2. Conexión con la API de imgBB
Consideré usar axios para conectar con la API de imgBB, sin embargo, tuve problemas al instalar sus dependencias. Por lo tanto, opté por usar el API nativo de fetch para realizar las peticiones y cargar imágenes.

3. Generación de usuarios aleatorios
Intenté encontrar APIs gratuitas para obtener usuarios aleatorios, pero la búsqueda no fue exitosa. Decidí entonces generar un array con 50 datos aleatorios, y alterné entre dos arrays en la tabla:

Si localStorage está vacío, se muestran los datos aleatorios generados.
Si localStorage tiene datos almacenados, se muestran los usuarios guardados.
4. Estructura de carpetas
Comencé con una estructura sencilla y funcional, asegurándome de organizar las partes del proyecto de manera clara:

src/components/ para los componentes reutilizables.
src/pages/ para las páginas del proyecto.
src/utils/ para las funciones de utilidad como el manejo de localStorage.
🔧 Bibliotecas y Frameworks empleados
Para el desarrollo de este proyecto, se utilizaron las siguientes herramientas:

React con TypeScript: Todo el proyecto está escrito en React con TypeScript.
Material UI: Utilizado para construir las interfaces de usuario, como la tabla y el formulario.
React Hook Form: Usado para manejar y validar los formularios de manera sencilla.
Zod: Utilizado para construir el esquema de validación en los campos del formulario.
imgBB API: Usada para la carga de imágenes mediante una API key.
Dependencias adicionales:
Material Icons: Para los iconos utilizados en el proyecto.
gh-pages: Para permitir el despliegue en GitHub Pages.
npm: Para instalar y actualizar dependencias.
⚙️ Desafíos
1. Implementación del Mapa de Google Maps
Intenté implementar un mapa con la API de Google Maps, pero debido a algunos errores y falta de documentación clara, el código dejó de funcionar en varias ocasiones. Por lo tanto, decidí postergar esta implementación y seguir investigando más sobre la API.

2. Ordenamiento de las columnas de la tabla (Ascendente/Descendente)
Uno de los desafíos más complejos fue implementar el ordenamiento en las columnas de la tabla. Debido a las necesidades de accesibilidad, decidí implementar el ordenamiento solo en la primera columna, ordenando los usuarios alfabéticamente. Aunque podría haberse agregado el ordenamiento en otras columnas, esta solución fue suficiente para el caso.
