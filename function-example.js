const fs = require('fs');
const path = require('path');
const markdownLinkExtractor = require('markdown-link-extractor');

// Función para verificar los enlaces en un archivo Markdown
function checkLinks(filePath) {
  const markdownContent = fs.readFileSync(filePath, 'utf-8');
  console.log('Markdown Content:', markdownContent);
  const links = markdownLinkExtractor(markdownContent);
  console.log('Links:', links); 
console.log (checkLinks);
  const brokenLinks = [];
  const validLinks = [];

  links.forEach(index, links => {
    for (let index = 0; index < links.length; index++) {
      const link = links[index];
      const anchor = anchor[index];

    if (links.href.startsWith('http')) {
      validarEnlace(links);
      validLinks.push({ links, anchor: anchor[index] });
      // Aquí podria usar axios o fetch para verificar si el enlace es válido

    } else {
      brokenLinks.push({ link, links, anchor: anchor[index] });
    }
  }
  });
 
  return { validLinks, brokenLinks };
}

// Carpeta donde se encuentran los archivos Markdown
const markdownFolder ='C:\\Users\\CORE I5\\OneDrive\\Documentos\\Proyectos Laboratoria\\MDLink\\DEV008-md-links\\evidence';

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