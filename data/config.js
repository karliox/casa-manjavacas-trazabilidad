// Configuración del club de clientes fundadores.
// Para recibir las reservas de verdad: crea un Google Form con los campos Nombre, Email, Teléfono y Mensaje,
// y pega aquí su enlace "formResponse" y los identificadores "entry.XXXX" de cada campo.
window.CONFIG_CLUB = {
  plazas: 6,
  plazasReservadas: 0,          // actualízalo a mano cuando confirmes reservas
  formularioGoogle: "",         // p. ej. "https://docs.google.com/forms/d/e/XXXX/formResponse"
  campos: { nombre: "", email: "", telefono: "", mensaje: "" } // p. ej. "entry.123456"
};

// Datos de los animales. Si la hoja de Google está compartida como «Cualquier persona con el enlace: lector»,
// la web lee los bueyes y eventos de ahí. Si no se puede leer, usa los datos de ejemplo de data/bueyes.js.
window.CONFIG_DATOS = {
  hojaGoogle: "1nuJmWk4wM9TvnJWVsQvRp1Sb2nVfvbkbU2VaJk3PZA8",
  fechaSimulada: "2033-06-15"   // déjalo vacío ("") cuando metas tus animales reales
};
