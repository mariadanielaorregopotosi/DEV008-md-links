const fs = require('fs');
const path = require('path');
const markdownLinkExtractor = require('markdown-link-extractor');
const axios = require('axios');

function esRutaAbsoluta(ruta) {
  return path.isAbsolute(ruta);
}

const rutaRelativa = 'MDLink/DEV008-md-links/evidence/README2.md';
let rutaAbsoluta;

if (esRutaAbsoluta(rutaRelativa)) {
  rutaAbsoluta = rutaRelativa;
} else {
  rutaAbsoluta = path.resolve(rutaRelativa);
}

console.log('Ruta relativa:', rutaRelativa);
console.log('Ruta absoluta:', rutaAbsoluta);

// Carpeta donde se encuentran los archivos Markdown
const markdownFolder ='C:\\Users\\CORE I5\\OneDrive\\Documentos\\Proyectos Laboratoria\\MDLink\\DEV008-md-links\\evidence';

// Función para verificar los enlaces en un archivo Markdown
function checkLinks(filePath) {
  const markdownContent = fs.readFileSync(filePath, 'utf-8');
  const linkData = markdownLinkExtractor(markdownContent);

  if (!linkData || !Array.isArray(linkData.links)) {
    return Promise.reject('La estructura de datos devuelta por markdownLinkExtractor no es válida.');
  }

  const { links } = linkData;
  const brokenLinks = [];
  const validLinks = [];

  const checkLink = (link) => {
    return axios.get(link)
      .then(response => {
        if (response.status === 200) {
          validLinks.push(link);
        } else {
          brokenLinks.push(link);
        }
      })
      .catch(error => {
        brokenLinks.push(link);
        console.log(error);
      });
  };

  const linkPromises = links
    .filter(link => link.startsWith('http'))
    .map(link => checkLink(link));

  return Promise.all(linkPromises)
    .then(() => {
      return { validLinks, brokenLinks };
    });
}



// Leer los archivos Markdown en la carpeta
fs.readdir(markdownFolder, (err, files) => {
  if (err) {
    console.error('Error al leer la carpeta:', err);
    return;
  }

  const report = {
    totalFiles: files.length,
    totalBrokenLinks: 0,
    totalValidLinks: 0,
  };

  files.forEach(file => {
    const filePath = path.join(markdownFolder, file);
    checkLinks(filePath)
      .then(({ validLinks, brokenLinks }) => {
        report.totalBrokenLinks += brokenLinks.length;
        report.totalValidLinks += validLinks.length;

        console.log(`Archivo: ${file}`);
        console.log(`- Enlaces válidos: ${validLinks.length}`);
        console.log(`- Enlaces rotos: ${brokenLinks.length}`);
      })
      .catch(error => {
        console.error(`Error al verificar los enlaces en el archivo ${file}: ${error}`);
      });
  });

  console.log('\nResumen del informe:');
  console.log(`- Total de archivos analizados: ${report.totalFiles}`);
  console.log(`- Total de enlaces válidos: ${report.totalValidLinks}`);
  console.log(`- Total de enlaces rotos: ${report.totalBrokenLinks}`);
});

module.exports = { checkLinks };
