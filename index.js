const functions = require("./function-example");

function mdLinks(ruta, opstions) {
  return new Promise((resolve, reject) => {
    //     reject('hoy es martes')
    if (functions.siExisteRuta(ruta)) {
      let rutaAbsoluta;

      if (functions.esRutaAbsoluta(ruta)) {
        rutaAbsoluta = ruta;
      } else {
        rutaAbsoluta = functions.convertirAbsoluta(ruta);
      }
      // resolve(rutaAbsoluta);
      functions
        .mdLinks(rutaAbsoluta)
        .then((respuesta) => {
          resolve(respuesta);
        })
        .catch((error) => {
          reject(error);
        });
    } else {
      reject("la ruta no existe");
    }
  });
}
// console.log(rutaCarpeta)
// mdLinks(rutaCarpeta, (err, report) => {
//   if (err) {
//     console.error('Error:', err);
//     return;
//   }

//   console.log('Informe:', report);
// });
//usar una promesa grande no atraves de callback si no una promesa grande
const rutaCarpeta = "C:\\Users\\CORE I5\\OneDrive\\Documentos\\Proyectos Laboratoria\\MDLink\\DEV008-md-links\\evidence\\README2.md";
mdLinks(rutaCarpeta)
  .then((respuesta) => {
    console.log("correcto");
    console.log(respuesta);
  })
  .catch((error) => {
    console.log("error");
    console.log(error);
  });
