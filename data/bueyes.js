// DATOS DE EJEMPLO (ficticios) para la demo de Casa Manjavacas.
// Para usar el sistema de verdad, sustituye estos registros por los de tus animales.
// Estados posibles: "ceba", "acabado", "maduracion", "vendido"
window.BUEYES = [
  {
    id: "CM-001", nombre: "Lucero", crotal: "ES-DEMO-0001", raza: "Rubia Gallega",
    nacimiento: "2021-03-14", entrada: "2021-10-02", origen: "Ganadería de cría (Galicia) — ejemplo",
    estado: "vendido", finca: "Pastos de montaña — Montaña Palentina",
    sacrificio: "2026-06-18", pesoCanal: 612, diasMaduracion: 75,
    cortes: ["Chuletón", "Lomo alto", "Solomillo", "Entrecot"],
    eventos: [
      { fecha: "2021-10-02", tipo: "entrada", texto: "Llega a la explotación con 7 meses." },
      { fecha: "2022-05-10", tipo: "pasto", texto: "Primera subida a los pastos de verano." },
      { fecha: "2023-04-20", tipo: "sanidad", texto: "Saneamiento ganadero anual: correcto." },
      { fecha: "2025-11-15", tipo: "alimentacion", texto: "Inicio del acabado con heno y cereal de la zona." },
      { fecha: "2026-06-18", tipo: "sacrificio", texto: "Sacrificio en matadero autorizado. Canal: 612 kg." },
      { fecha: "2026-09-01", tipo: "maduracion", texto: "Fin de maduración en cámara: 75 días." }
    ]
  },
  {
    id: "CM-002", nombre: "Moreno", crotal: "ES-DEMO-0002", raza: "Rubia Gallega",
    nacimiento: "2021-05-02", entrada: "2021-12-01", origen: "Ganadería de cría (Galicia) — ejemplo",
    estado: "maduracion", finca: "Pastos de montaña — Montaña Palentina",
    sacrificio: "2026-09-25", pesoCanal: 588, diasMaduracion: 60,
    cortes: ["Chuletón", "Lomo bajo", "Solomillo"],
    eventos: [
      { fecha: "2021-12-01", tipo: "entrada", texto: "Llega a la explotación con 7 meses." },
      { fecha: "2022-05-12", tipo: "pasto", texto: "Primera subida a los pastos de verano." },
      { fecha: "2024-04-18", tipo: "sanidad", texto: "Saneamiento ganadero anual: correcto." },
      { fecha: "2026-02-01", tipo: "alimentacion", texto: "Inicio del acabado con heno y cereal de la zona." },
      { fecha: "2026-09-25", tipo: "sacrificio", texto: "Sacrificio en matadero autorizado. Canal: 588 kg." },
      { fecha: "2026-09-27", tipo: "maduracion", texto: "Entra en cámara de maduración (objetivo: 60 días)." }
    ]
  },
  {
    id: "CM-003", nombre: "Trueno", crotal: "ES-DEMO-0003", raza: "Rubia Gallega",
    nacimiento: "2022-02-20", entrada: "2022-09-15", origen: "Ganadería de cría (Galicia) — ejemplo",
    estado: "acabado", finca: "Pastos de montaña — Montaña Palentina", pesoVivo: 1080,
    eventos: [
      { fecha: "2022-09-15", tipo: "entrada", texto: "Llega a la explotación con 7 meses." },
      { fecha: "2023-05-08", tipo: "pasto", texto: "Primera subida a los pastos de verano." },
      { fecha: "2025-04-22", tipo: "sanidad", texto: "Saneamiento ganadero anual: correcto." },
      { fecha: "2026-10-01", tipo: "alimentacion", texto: "Inicio del acabado con heno y cereal de la zona." },
      { fecha: "2026-11-10", tipo: "peso", texto: "Pesaje: 1.080 kg en vivo." }
    ]
  },
  {
    id: "CM-004", nombre: "Bravo", crotal: "ES-DEMO-0004", raza: "Rubia Gallega",
    nacimiento: "2022-04-11", entrada: "2022-11-20", origen: "Ganadería de cría (Galicia) — ejemplo",
    estado: "ceba", finca: "Pastos de montaña — Montaña Palentina", pesoVivo: 960,
    eventos: [
      { fecha: "2022-11-20", tipo: "entrada", texto: "Llega a la explotación con 7 meses." },
      { fecha: "2023-05-08", tipo: "pasto", texto: "Primera subida a los pastos de verano." },
      { fecha: "2025-04-22", tipo: "sanidad", texto: "Saneamiento ganadero anual: correcto." },
      { fecha: "2026-10-28", tipo: "pasto", texto: "Bajada a la finca de invierno." }
    ]
  },
  {
    id: "CM-005", nombre: "Castaño", crotal: "ES-DEMO-0005", raza: "Rubia Gallega",
    nacimiento: "2023-03-03", entrada: "2023-10-10", origen: "Ganadería de cría (Galicia) — ejemplo",
    estado: "ceba", finca: "Pastos de montaña — Montaña Palentina", pesoVivo: 780,
    eventos: [
      { fecha: "2023-10-10", tipo: "entrada", texto: "Llega a la explotación con 7 meses." },
      { fecha: "2024-05-14", tipo: "pasto", texto: "Primera subida a los pastos de verano." },
      { fecha: "2026-04-21", tipo: "sanidad", texto: "Saneamiento ganadero anual: correcto." }
    ]
  },
  {
    id: "CM-006", nombre: "Roble", crotal: "ES-DEMO-0006", raza: "Rubia Gallega",
    nacimiento: "2024-04-08", entrada: "2024-11-05", origen: "Ganadería de cría (Galicia) — ejemplo",
    estado: "ceba", finca: "Pastos de montaña — Montaña Palentina", pesoVivo: 540,
    eventos: [
      { fecha: "2024-11-05", tipo: "entrada", texto: "Llega a la explotación con 7 meses." },
      { fecha: "2025-05-12", tipo: "pasto", texto: "Primera subida a los pastos de verano." },
      { fecha: "2026-04-21", tipo: "sanidad", texto: "Saneamiento ganadero anual: correcto." }
    ]
  }
];
