// module.exports = () => {
//   // ...
//   checkLinks 
// };
// mdLinks.js
function mdLinks(filePath, options) {
  // Tu lógica para procesar los enlaces en el archivo Markdown
  // Puedes usar la biblioteca 'fs' para leer el archivo y 'marked' para analizar el contenido Markdown.
  // Luego, extrae los enlaces y realiza las operaciones necesarias según las opciones.

  // Por ejemplo, podrías devolver un array de objetos que contienen información sobre los enlaces.
  const links = [
    { 
      href: 'https://ejemplo.com',
      text: 'Enlace de ejemplo',
      file: '/ruta/al/archivo.md'
    },
    // ...otros enlaces
  ];

  return links;
}

// Exportar la función para que pueda ser utilizada desde otros archivos
module.exports = mdLinks;
