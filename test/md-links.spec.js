const mdLinks = require('../function-example.js');


describe('mdLinks', () => {

  it('es ruta absoluta', () => {
    let ruta = "README.md"
    let resultado = false
    let resultadoObtenido = mdLinks.esRutaAbsoluta(ruta)
expect(resultadoObtenido).toBe(resultado)
  });
  it('si existe la ruta', () => {
    let ruta = "README.md"
    let resultado = true
    let resultadoObtenido = mdLinks.siExisteRuta(ruta)
expect(resultadoObtenido).toBe(resultado)
  });

});
