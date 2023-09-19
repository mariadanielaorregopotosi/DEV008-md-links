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
          // status: 'unknown',
          // ok: 'unknown',
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
 
  let nuevosLink = []
  links.forEach((link)=> {
  //   nuevosLink = [...nuevosLink, fetch(link.href)];
    nuevosLink.push( fetch(link.href).then((response)=>{
      return{
        status:response.status,
        ok:response.status >= 200 && response.status < 400,
        ...link,
      }

    }).catch((error)=>{
      reject(error)
      return{
        status: 500,
        ok:false,
        ...link,
      }
    }));
  });
   return Promise.all(nuevosLink); // Retorna una promesa resuelta con un arreglo vacío si links es undefined
  };
  

module.exports = { markdownExtractor, esRutaAbsoluta, siExisteRuta, convertirAbsoluta, validateLinks};
