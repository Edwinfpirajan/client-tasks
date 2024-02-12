# PRUEBA DE ENTRADA PARA CIOMPRIX - Frontend

## Descripción del Proyecto

El propósito general de este proyecto es realizar un frontend en React para conectar con las APIs servidas desde un servidor con PHP-Laravel.

El objetivo de esta documentación es facilitar al usuario entender el proceso de iniciar el proyecto y cómo podría solucionar errores al momento de ejecutarlo.

## Tecnologías Requeridas

Para este proyecto, necesitarás las siguientes tecnologías:

- Node.js: Visita la [documentación oficial de Node.js](https://nodejs.org/en/docs/) para obtener más detalles.
- TypeScript: Conoce más sobre TypeScript en su [página oficial](https://www.typescriptlang.org/docs/).
- NPM: Encuentra la [documentación oficial de NPM](https://docs.npmjs.com/) aquí.
- Primereact: Biblioteca de diseño [documentación oficial de PrimeReact](https://primereact.org/)

Se recomienda usar el perfil de configuración de plugins para Visual Studio Code que viene en la carpeta `_vscode_plugins`.

## Instalación de Tecnologías

### Windows, Linux, y Mac

Para instalar las tecnologías requeridas en diferentes sistemas operativos, sigue las guías oficiales:

- **Node.js y NPM**: La instalación de Node.js incluirá NPM. Visita [Node.js Downloads](https://nodejs.org/en/download/) para obtener instrucciones específicas de instalación para tu sistema operativo.
- **TypeScript**: Después de instalar Node.js, puedes instalar TypeScript globalmente usando NPM:

npm install -g typescript

Inicialización del Proyecto

Para inicializar nuestro proyecto, debemos clonar el proyecto ejecutando el comando:



git clone https://github.com/Edwinfpirajan/client-tasks.git

Configuración del Proyecto Clonado

Una vez clonado el repositorio, sigue estos pasos para configurar el proyecto:

    Instala las dependencias:

Navega al directorio del proyecto y ejecuta:



cd client-tasks
npm install

o si prefieres usar yarn:



yarn install

    Configuración adicional:

Si el proyecto requiere pasos de configuración adicionales (como configurar variables de entorno en un archivo .env), inclúyelos aquí.
Ejecución del Servidor en Modo Desarrollo

Para correr el servidor en modo desarrollo, ejecuta el siguiente comando:



npm run dev

o si estás usando yarn:



yarn dev

Posibles Errores y Soluciones

    Error: Cannot find module:
        Asegúrate de haber ejecutado npm install para instalar todas las dependencias antes de intentar iniciar el proyecto.
    Error install modules:
        Ejecuta el comando añadiendo --force al final.
    Error de TypeScript:
        Verifica que todas las dependencias de TypeScript estén instaladas y que tu archivo tsconfig.json esté correctamente configurado.
    Problemas de conexión con el backend:
        Confirma que la URL base para las solicitudes de API esté correctamente configurada en tus archivos de configuración o variables de entorno.
        Asegúrate de que el backend esté corriendo y accesible desde tu entorno de desarrollo.
