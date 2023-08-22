const fs = require('fs');
const path = require('path');
const markdownLinkExtractor = require('markdown-link-extractor');

// Función para verificar los enlaces en un archivo Markdown
function checkLinks(filePath) {
  const markdownContent = fs.readFileSync(filePath, 'utf-8');
  const links = markdownLinkExtractor(markdownContent);

  const brokenLinks = [];
  const validLinks = [];

  links.forEach(link => {
    if (link.href.startsWith('http')) {
      // Simular una verificación real de enlaces HTTP
      // Aquí podrías usar axios o fetch para verificar si el enlace es válido
      validLinks.push(link);
    } else {
      brokenLinks.push(link);
    }
  });

  return { validLinks, brokenLinks };
}

// Carpeta donde se encuentran los archivos Markdown
const markdownFolder = 'ruta/a/tu/carpeta';

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
    const { validLinks, brokenLinks } = checkLinks(filePath);

    report.totalBrokenLinks += brokenLinks.length;
    report.totalValidLinks += validLinks.length;

    console.log(`Archivo: ${file}`);
    console.log(`- Enlaces válidos: ${validLinks.length}`);
    console.log(`- Enlaces rotos: ${brokenLinks.length}`);
  });

  console.log('\nResumen del informe:');
  console.log(`- Total de archivos analizados: ${report.totalFiles}`);
  console.log(`- Total de enlaces válidos: ${report.totalValidLinks}`);
  console.log(`- Total de enlaces rotos: ${report.totalBrokenLinks}`);
});

module.exports = { checkLinks };