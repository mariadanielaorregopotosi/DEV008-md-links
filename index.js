const functions = require("./function-example.js");

function mdLinksPromess(ruta, options = { validate: false }) {
  return new Promise((resolve, reject) => {
    if (!ruta || typeof options !== "object") {
      // Devolver una promesa rechazada con un error específico
      reject(new Error("Argumentos inválidos"));
      return;
    }

    if (functions.siExisteRuta(ruta)) {
      let rutaAbsoluta;

      if (functions.esRutaAbsoluta(ruta)) {
        rutaAbsoluta = ruta;
      } else {
        rutaAbsoluta = functions.convertirAbsoluta(ruta);
      }

      functions.markdownExtractor(rutaAbsoluta)
        .then((result) => {
          const links = result && result.links; // Verifica si result.links no es undefined

          if (options.validate) {
            functions.validateLinks(links)
              .then((validatedLinks) => {
                resolve(validatedLinks); // Resuelve la promesa con los enlaces validados
              })
              .catch((error) => {
                reject(error); // Rechaza la promesa en caso de error en las solicitudes HTTP
              });
          } else {
            resolve(links); // Resuelve la promesa con los enlaces
          }
        })
        .catch((error) => {
          reject(error); // Rechaza la promesa en caso de error
        });
    } else {
      reject("la ruta no existe");
    }
  });
}
mdLinksPromess("C:\\Users\\CORE I5\\OneDrive\\Documentos\\Proyectos Laboratoria\\MDLink\\DEV008-md-links\\evidence\\README2.md", 
{ validate: false });
