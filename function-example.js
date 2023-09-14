const fs = require('fs');
const path = require('path');
const MarkdownIt = require('markdown-it');
const axios = require('axios');


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

const md = new MarkdownIt();

function markdownExtractor(ruta) {
  return readFile(ruta, { encoding: 'utf8' })
    .then((data) => {
      const linkPattern = /\[([^\]]+)\]\(([^\)]+)\)/g;
      const links = [];
      let match;

      while ((match = linkPattern.exec(data))) {
        const [, text, href] = match;
        links.push({
          href,
          text,
          file: ruta,
          status: 'unknown',
          ok: 'unknown',
        });
      }

      if (links.length === 0) {
        console.log('Enlaces extraídos:', []); // No hay enlaces, muestra un array vacío
      } else {
        console.log('Enlaces extraídos:', links); // Muestra los enlaces extraídos
      }

      return links;
    })
    .catch((error) => {
      console.error('Error al leer el archivo:', error);
      return []; // Devuelve un array vacío en caso de error
    });
}

function validateLinks(links) {
  console.log(validateLinks);
  const linkPromises = links.map((link) => {
    return axios
      .head(link.href) // Realiza una solicitud HEAD para verificar el estado
      .then((response) => {
        console.log(`Validando enlace: ${link.href}, Estado: ${response.status}`);
        link.status = response.status; // Almacena el código de estado en el objeto de enlace
        link.ok = response.status >= 200 && response.status < 400; // Establece el estado "ok" en función del código de estado
        return link; // Devuelve el objeto de enlace actualizado
      })
      .catch((error) => {
        console.error(`Error al validar enlace: ${link.href}, Error: ${error.message}`);
        // Resto del código...
        // Si hubo un error en la solicitud, maneja el error aquí (por ejemplo, puedes establecer el estado en "error")
        link.status = 'error';
        link.ok = false;
        return link; // Devuelve el objeto de enlace actualizado
      });
  });

  // Retorna una promesa que se resolverá cuando todas las solicitudes se completen
  return Promise.all(linkPromises);
}


module.exports = { markdownExtractor, esRutaAbsoluta, siExisteRuta, convertirAbsoluta, validateLinks};
