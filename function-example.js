const fs = require('fs');
const path = require('path');
const markdownLinkExtractor = require('markdown-link-extractor');
// const axios = require('axios');
// const { extractLinks } = require('./mdLinksUtilsh');
// const { validateLinks } = require('./mdLinksValidator');

// Funciones de utilidad
function esRutaAbsoluta(ruta) {
  return path.isAbsolute(ruta);
}

function siExisteRuta(ruta) {
  return fs.existsSync(ruta);
}

function convertirAbsoluta(ruta) {
  return path.resolve(ruta);
}
function readFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

function markdownExtractor(filePath) {
  return readFile(filePath, { encoding: 'utf8' }).then((data) => {
    const links = markdownLinkExtractor(data);
    return links || [];
  });
}

function makeGetRequestToFile(filePath) {
  return readFile(filePath, { encoding: 'utf8' })
    .then((data) => {
      const httpLinks = data.match(/https?:\/\/[^\s]+/g) || [];
      return httpLinks;
    });
}

// Función principal mdLinks
function mdLinks(filePath, options = { validate: false }) {
  return new Promise((resolve, reject) => {
    if (!filePath || typeof options !== 'object') {
      reject(new Error('Argumentos inválidos'));
      return;
    }

    markdownExtractor(filePath)
  .then((result) => {
    const links = result.links;
    console.log('Enlaces extraídos:', links); // Agrega esta línea
    if (options.validate) {
      return validateLinks(links);
    } else {
      return links.map((link) => ({ href: link, text: '', file: filePath }));
    }
  })
  // ...
  });
};

module.exports = { mdLinks, esRutaAbsoluta, siExisteRuta, convertirAbsoluta, makeGetRequestToFile };
