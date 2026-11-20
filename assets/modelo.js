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
  sens: { a: 497.93, b: -11426.5, c: 1204.8, factorPromotor: 0.63 },
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
