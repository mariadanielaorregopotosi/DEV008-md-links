const axios = require('axios');

// Realizar una solicitud GET a una API pública
axios.get('https://jsonplaceholder.typicode.com/posts/1')
  .then(response => {
    console.log('Datos de la respuesta:');
    console.log('Título:', response.data.title);
    console.log('Contenido:', response.data.body);
  })
  .catch(error => {
    console.error('Error al hacer la solicitud:', error.message);
  });

  module.exports = { axios };
