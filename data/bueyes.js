// DATOS DE EJEMPLO (ficticios). Simulación de cómo se verá el sistema en junio de 2033 (Año 6 del plan).
// Para usar el sistema de verdad, sustituye estos registros por los de tus animales.
// Estados posibles: "ceba", "acabado", "maduracion", "vendido"
window.FECHA_DEMO = "2033-06-15";
window.BUEYES = [
  {
    id: "CM-001", nombre: "Lucero", crotal: "ES-DEMO-0001", raza: "Rubia Gallega",
    nacimiento: "2027-03-14", entrada: "2027-10-02", estado: "vendido",
    sacrificio: "2032-10-20", pesoCanal: 497, diasMaduracion: 60,
    cortes: ["Chuletón", "Lomo alto", "Solomillo", "Entrecot", "Picaña"],
    eventos: [
      { fecha: "2027-10-02", tipo: "entrada", texto: "Llega a la explotación con 7 meses." },
      { fecha: "2028-05-10", tipo: "pasto", texto: "Primera subida a los pastos de verano." },
      { fecha: "2029-04-20", tipo: "sanidad", texto: "Saneamiento ganadero anual: correcto." },
      { fecha: "2031-10-15", tipo: "alimentacion", texto: "Empieza el engorde final: un año con heno y cereal." },
      { fecha: "2032-10-20", tipo: "sacrificio", texto: "Sacrificio en matadero autorizado. Canal: 497 kg." },
      { fecha: "2032-12-19", tipo: "maduracion", texto: "Sale de cámara tras 60 días de maduración." }
    ]
  },
  {
    id: "CM-002", nombre: "Moreno", crotal: "ES-DEMO-0002", raza: "Rubia Gallega",
    nacimiento: "2028-03-02", entrada: "2028-10-05", estado: "maduracion",
    sacrificio: "2033-04-22", pesoCanal: 489, diasMaduracion: 60,
    cortes: ["Chuletón", "Lomo bajo", "Solomillo", "Entraña"],
    eventos: [
      { fecha: "2028-10-05", tipo: "entrada", texto: "Llega a la explotación con 7 meses." },
      { fecha: "2029-05-12", tipo: "pasto", texto: "Primera subida a los pastos de verano." },
      { fecha: "2031-04-18", tipo: "sanidad", texto: "Saneamiento ganadero anual: correcto." },
      { fecha: "2032-04-20", tipo: "alimentacion", texto: "Empieza el engorde final: un año con heno y cereal." },
      { fecha: "2033-04-22", tipo: "sacrificio", texto: "Sacrificio en matadero autorizado. Canal: 489 kg." },
      { fecha: "2033-04-24", tipo: "maduracion", texto: "Entra en cámara de maduración. Objetivo: 60 días." }
    ]
  },
  {
    id: "CM-003", nombre: "Trueno", crotal: "ES-DEMO-0003", raza: "Rubia Gallega",
    nacimiento: "2028-04-11", entrada: "2028-10-05", estado: "acabado", pesoVivo: 905,
    eventos: [
      { fecha: "2028-10-05", tipo: "entrada", texto: "Llega a la explotación con 7 meses." },
      { fecha: "2029-05-12", tipo: "pasto", texto: "Primera subida a los pastos de verano." },
      { fecha: "2032-04-22", tipo: "sanidad", texto: "Saneamiento ganadero anual: correcto." },
      { fecha: "2032-09-15", tipo: "alimentacion", texto: "Empieza el engorde final: un año con heno y cereal." },
      { fecha: "2033-06-01", tipo: "peso", texto: "Pesaje: 905 kg en vivo." }
    ]
  },
  {
    id: "CM-004", nombre: "Bravo", crotal: "ES-DEMO-0004", raza: "Rubia Gallega",
    nacimiento: "2029-03-20", entrada: "2029-10-08", estado: "ceba", pesoVivo: 780,
    eventos: [
      { fecha: "2029-10-08", tipo: "entrada", texto: "Llega a la explotación con 7 meses." },
      { fecha: "2030-05-10", tipo: "pasto", texto: "Primera subida a los pastos de verano." },
      { fecha: "2033-04-20", tipo: "sanidad", texto: "Saneamiento ganadero anual: correcto." },
      { fecha: "2033-05-14", tipo: "pasto", texto: "Sube a los pastos de verano." }
    ]
  },
  {
    id: "CM-005", nombre: "Castaño", crotal: "ES-DEMO-0005", raza: "Rubia Gallega",
    nacimiento: "2030-03-03", entrada: "2030-10-10", estado: "ceba", pesoVivo: 640,
    eventos: [
      { fecha: "2030-10-10", tipo: "entrada", texto: "Llega a la explotación con 7 meses." },
      { fecha: "2031-05-14", tipo: "pasto", texto: "Primera subida a los pastos de verano." },
      { fecha: "2033-04-20", tipo: "sanidad", texto: "Saneamiento ganadero anual: correcto." }
    ]
  },
  {
    id: "CM-006", nombre: "Roble", crotal: "ES-DEMO-0006", raza: "Rubia Gallega",
    nacimiento: "2031-04-08", entrada: "2031-11-05", estado: "ceba", pesoVivo: 470,
    eventos: [
      { fecha: "2031-11-05", tipo: "entrada", texto: "Llega a la explotación con 7 meses." },
      { fecha: "2032-05-12", tipo: "pasto", texto: "Primera subida a los pastos de verano." },
      { fecha: "2033-04-20", tipo: "sanidad", texto: "Saneamiento ganadero anual: correcto." }
    ]
  },
  {
    id: "CM-007", nombre: "Cierzo", crotal: "ES-DEMO-0007", raza: "Rubia Gallega",
    nacimiento: "2032-03-25", entrada: "2032-10-12", estado: "ceba", pesoVivo: 310,
    eventos: [
      { fecha: "2032-10-12", tipo: "entrada", texto: "Llega a la explotación con 7 meses." },
      { fecha: "2033-05-14", tipo: "pasto", texto: "Primera subida a los pastos de verano." }
    ]
  }
];
