// Cifras copiadas de Casa_Manjavacas_Modelo_completo.xlsx (Plan actual, escenario Base salvo indicación).
// Son previsiones del modelo, no datos: ningún precio de venta está confirmado todavía.
window.MODELO = {
  anioCero: 2027,
  anios: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
  resultado: [-19642,-31487,1370,9193,7408,-7938,-3860,9560,24843,43891,66706,83436,81051,78595,76066,73536],
  caja: [1838,-1649,9810,21246,51431,43493,39634,46326,16591,12195,19507,72072,123134,172649,220571,266898],
  ingresos: [5101,7139,62258,62348,62437,46455,51413,66288,91377,117124,147310,160717,160786,160854,160919,160983],
  gastos: [29400,43107,65112,58152,59244,55526,56456,57996,66363,72789,79244,78340,81100,83941,86868,89795],
  precio: [0,0,0,0,0,16,18,24,32,42,50,55,55,55,55,55],
  cabezas: [11,22,32,32,33,28,28,28,33,38,43,44,44,44,45,45],
  pagoInversores: [0,0,0,0,0,0,0,0,5199,10095,14983,8344,8105,7860,7607,7354],
  cobradoInversores: [0,0,0,0,0,0,0,0,5199,15294,30277,38620,46725,54585,62192,69545],
  hectareas: [16.5,32.5,41,41.7,34.4,34.4,34.4,34.4,41.9,49.4,56.9,57.5,58,58.6,59.1,59.1],
  ayudasPAC: [5101,7139,9116,9207,9295,5396,5396,5396,6351,7306,8261,8333,8402,8470,8535,8599],
  ayudasCapital: [72780,28000,0,0,0,0,0,0,8750,0,0,0,0,0,0,0],
  inversiones: [51300,0,0,0,0,0,0,0,52236,28053,28894,0,0,0,0,0],
  patrimonio: [15126,24528,42807,54818,85561,77623,73764,80456,64220,73325,94137,147155,198656,248598,296933,343661],
  rebanoLonja: [13288,26177,32997,33572,34130,34130,34130,34130,47630,61130,74630,75083,75522,75949,76362,76763],
  margen: [null,null,0.02,0.15,0.12,-0.17,-0.08,0.14,0.27,0.37,0.45,0.52,0.50,0.49,0.47,0.46],
  // Medidas para mejorar el plan (hoja «Resumen»). Usan supuestos del promotor sin confirmar; la 5 es la más incierta.
  medidas: [
    { id: "M1", nombre: "Demostrar el precio ya", que: "Preventa: los primeros animales a 24 €/kg y la subida de precio un año antes.", reciben: 78555, veces: 2.62, tir: 12.8, recuperan: 9 },
    { id: "M4", nombre: "Un cliente de alta gama dentro", que: "Un restaurante o tienda gourmet fijo que paga 5 €/kg más desde el Año 8.", reciben: 79555, veces: 2.65, tir: 11.8, recuperan: 10 },
    { id: "M5", nombre: "Bueyes de otros criadores", que: "Vender 3 bueyes al año de otros criadores con la marca. Supuesto sin ningún criador confirmado.", reciben: 97661, veces: 3.26, tir: 14.1, recuperan: 10 }
  ],
  // Referencias de precio de mercado (consultadas en noviembre de 2026).
  mercado: [
    { etiqueta: "Canal de vacuno en Galicia (precio medio)", valor: 8.05, tipo: "canal", fuente: "Fundación Juana de Vega, vía El Español (abril de 2026)", url: "https://www.elespanol.com/quincemil/economia/20260414/precio-carne-vacuno-dispara-coruna-gente-aldeas-no-quiere-criar/1003744204901_0.html" },
    { etiqueta: "Casa Manjavacas: precio del plan por kg de canal", valor: 55, tipo: "plan" },
    { etiqueta: "Casa Manjavacas: lo mismo por kg de carne vendida", valor: 82, tipo: "plan", nota: "55 €/kg × 493 kg de canal ÷ 330,5 kg de carne (ratio del modelo)" },
    { etiqueta: "Chuletón de vaca Rubia Gallega, +60 días, tienda online", valor: 54.95, tipo: "pieza", fuente: "buenacarne.es", url: "https://buenacarne.es/products/vaca-rubia-gallega-60-dias-dry-aged" },
    { etiqueta: "Chuletón de buey de verdad (ganadería Torrestrella, 2021)", valor: 70, tipo: "pieza", masDe: true, fuente: "Directo al Paladar", url: "https://www.directoalpaladar.com/actualidad-1/a-veces-se-puede-comprar-chuleton-buey-verdad-cuesta-70-euros-kilo-como-estos-ganaderia-torrestrella" },
    { etiqueta: "Chuletón de Rubia Gallega en carnicería de Bélgica", valor: 97.5, tipo: "pieza", fuente: "Dierendonck", url: "https://www.dierendonck.be/en/products/rubia" },
    { etiqueta: "Chuleta de buey en restaurante de Madrid (Taberna Pedraza)", valor: 169, tipo: "restaurante", fuente: "El Español (mayo de 2026)", url: "https://www.elespanol.com/cocinillas/actualidad-gastronomica/20260512/exclusiva-chuleta-buey-taberna-pedraza-kilo-especial-anos-llevamos-abiertos/1003744238433_0.html" }
  ],
  club: { plazas: 6, cuota: 2500, kgCarneAnio: 120, desdeAnio: 5, hastaAnio: 9 },
  aportacion: { tramo1: 5000, anioTramo1: 3, tramo2: 25000, anioTramo2: 4, total: 30000 },
  participacion: { hastaRecuperar: 0.23, despues: 0.10, hastaAnio: 15 },
  // Los pagos se cobran en junio del año siguiente al resultado.
  kgCanalPorBuey: 493,
  bueyesAnio11: 5.15,
  escenarios: [
    { nombre: "Base", precio: 55, bueyes: 5.2, resultado11: 83436, reciben: 69545, veces: 2.32, recuperan: "Año 10", tir: "10,0 %", gananciaPromotor: 287851, peorCaja: -1649 },
    { nombre: "Conservador", precio: 46.8, bueyes: 4.6, resultado11: 47394, reciben: 38362, veces: 1.28, recuperan: "Año 13", tir: "2,5 %", gananciaPromotor: 71249, peorCaja: -7975 },
    { nombre: "Riesgo", precio: 21.3, bueyes: 5.2, resultado11: 7757, reciben: 11808, veces: 0.39, recuperan: "No recuperan", tir: "Negativa", gananciaPromotor: -378, peorCaja: -1649 }
  ],
  // Cuenta de un buey en el Año 11 (Plan actual), euros por buey vendido.
  cuentaBuey: {
    ingresos: [["Carne de bueyes propios",27115],["Extra por venta directa",1356],["Subproductos y elaborados",270],["Novilla de genética",835],["Ayudas de la PAC",1617]],
    gastos: [["Pasto, alquiler y veterinario",11130],["Concentrado del engorde final",1302],["Marketing y distribución",1085],["Cuota de autónomos",806],["Sacrificio, despiece y maduración",512],["Seguro del ganado",369]],
    resultado: 16194, precioMinimo: 22.5
  },
  // Sensibilidad del Año 11: resultado = a·bueyes·precio + b·bueyes + c (ajuste exacto de la hoja «Sensibilidad»).
  sens: { a: 497.93, b: -11426.5, c: 1243.8, factorPromotor: 0.63 },
  hitos: [
    { anio: 0, titulo: "Arranque", texto: "Instalaciones y vallado. Entran los primeros 6 terneros de Rubia Gallega. Ayuda de joven agricultor." },
    { anio: 2, titulo: "Club de clientes", texto: "Cuotas del club de clientes y primeras ventas de animales crecidos." },
    { anio: 3, titulo: "Primer tramo inversor", texto: "Entran 5.000 €." },
    { anio: 4, titulo: "Segundo tramo inversor", texto: "Entran 25.000 €." },
    { anio: 5, titulo: "Primeros bueyes propios", texto: "Unos 5 bueyes al año. El precio sube por escalones hasta 55 €/kg canal." },
    { anio: 8, titulo: "Cámara de maduración propia y vacas", texto: "Cámara de 25.000 € (ayuda LEADER del 35 %) y compra de las primeras vacas para criar terneros propios." },
    { anio: 10, titulo: "Inversores recuperan lo aportado", texto: "Con el resultado del Año 10, en el escenario Base. Su participación baja del 23 % al 10 %." },
    { anio: 15, titulo: "Fin del acuerdo", texto: "Los inversores han cobrado unas 2,3 veces lo aportado en el escenario Base." }
  ]
};
