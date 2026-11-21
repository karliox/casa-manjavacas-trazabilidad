// Anexo de datos de la presentación: 40 gráficos con las cifras del modelo económico.
(function () {
  const P = DATOS.plan, G = GRAF, nf = G.nf, S = G.S;
  const A = P["Año"].map(a => String(2027 + a));
  const eur = v => nf(v) + " €";
  const sum = (a, b) => a.map((v, i) => (v || 0) + (b[i] || 0));
  const pick = k => P[k];
  const ult = k => P[k][15];
  const i11 = k => P[k][11];
  const SIN_LEY = "";

  const graficos = [
    // 1. El rebaño
    { sec: "El rebaño", t: `El rebaño crece de 11 cabezas en 2027 a ${nf(ult("Cabezas totales"))} en 2042`, svg: () => G.barras(A, [{ nombre: "Cabezas", v: pick("Cabezas totales") }], { etiquetaFinal: true }), n: "Cabezas totales en la explotación al cierre de cada año." },
    { sec: "El rebaño", t: "La mayor parte del rebaño está siempre en el monte", svg: () => G.barras(A, [
        { nombre: "En pasto", v: pick("Cabezas propias en pasto (de 0 a 3 años en la explotación)") },
        { nombre: "Engorde final", v: pick("Cabezas propias en engorde final") },
        { nombre: "Vacas", v: pick("Vacas en la explotación") },
        { nombre: "Animales crecidos", v: pick("Animales crecidos en pasto") }], { apiladas: true }), n: "Composición del rebaño por año." },
    { sec: "El rebaño", t: "Entran 6 terneros al año, todos los años", svg: () => G.barras(A, [{ nombre: "Terneros", v: pick("Terneros que entran a cebo") }], { fmt: v => nf(v, 1) }), n: "Terneros que entran a cebo cada año (comprados y nacidos en casa)." },
    { sec: "El rebaño", t: "Las vacas propias entran a partir de 2035", svg: () => G.barras(A, [{ nombre: "Vacas", v: pick("Vacas en la explotación") }], { etiquetaFinal: true }), n: "Vacas de Rubia Gallega para criar terneros propios (Año 8 en adelante)." },
    { sec: "El rebaño", t: `De ${nf(P["Hectáreas de pasto necesarias"][0], 1)} a ${nf(ult("Hectáreas de pasto necesarias"), 1)} hectáreas de pasto`, svg: () => G.lineas(A, [{ nombre: "Hectáreas", v: pick("Hectáreas de pasto necesarias") }], { area: true, fmt: v => nf(v, 1) + " ha", min: 0 }), n: "Superficie de pasto necesaria, unas 1,5 ha por animal." },
    { sec: "El rebaño", t: "Desde 2032 se venden unos 5 bueyes propios al año", svg: () => G.barras(A, [
        { nombre: "Bueyes propios", v: pick("Bueyes propios vendidos") },
        { nombre: "Animales crecidos", v: pick("Animales crecidos vendidos como bueyes") }], { apiladas: true, fmt: v => nf(v, 1) }), n: "Animales vendidos por año y origen. En el Plan actual no se venden bueyes de otros criadores." },
    { sec: "El rebaño", t: `Unos ${nf(i11("Kilos de canal vendidos de bueyes propios"))} kg de canal al año en plena marcha`, svg: () => G.barras(A, [
        { nombre: "Vendidos", v: pick("Kilos de canal vendidos de bueyes propios") },
        { nombre: "Entregados al club", v: pick("Kilos de canal entregados al club") }], { apiladas: true }), n: "Kilos de canal de bueyes propios: venta y entregas al club de fundadores." },

    // 2. Precio
    { sec: "El precio", t: "El precio sube por escalones de 16 a 55 €/kg de canal", svg: () => G.lineas(A, [{ nombre: "Precio", v: pick("Precio de los bueyes propios (€/kg canal)").map((v, i) => i < 5 ? null : v) }], { escalon: true, fmt: v => nf(v) + " €/kg", min: 0 }), n: "Precio de venta de los bueyes propios por kilo de canal." },
    { sec: "El precio", t: "El precio mínimo para no perder dinero ronda los 20-26 €/kg", svg: () => G.lineas(A, [
        { nombre: "Precio del plan", v: pick("Precio de los bueyes propios (€/kg canal)").map((v, i) => i < 5 ? null : v) },
        { nombre: "Precio mínimo", v: pick("Precio mínimo de los bueyes propios para no perder dinero (€/kg canal)").map((v, i) => i < 5 ? null : v), color: S[2], discontinua: true }], { fmt: v => nf(v, 1) + " €/kg", min: 0 }), n: "Distancia entre el precio del plan y el precio que cubre todos los gastos." },
    { sec: "El precio", t: "Desde 2034 cada buey ingresa más de lo que cuesta", svg: () => G.lineas(A, [
        { nombre: "Ingreso por buey", v: pick("Ingreso total por buey vendido").map((v, i) => i < 5 ? null : v) },
        { nombre: "Gasto por buey", v: pick("Gasto total por buey vendido").map((v, i) => i < 5 ? null : v), color: S[2] }], { fmt: v => nf(v) + " €", min: 0 }), n: "Ingreso y gasto totales del año divididos entre los bueyes vendidos." },
    { sec: "El precio", t: `Cada buey deja unos ${nf(i11("Resultado por buey vendido"))} € en 2038`, svg: () => G.barras(A.slice(5), [{ nombre: "Resultado por buey", v: pick("Resultado por buey vendido").slice(5) }], { negColor: S[2], fmt: v => nf(v) + " €", etiquetaFinal: true }), n: "Resultado de explotación dividido entre los bueyes vendidos (2032 en adelante)." },
    { sec: "El precio", t: `La carne de bueyes propios llega a ${nf(i11("Venta de carne de bueyes propios"))} € al año`, svg: () => G.barras(A, [{ nombre: "Venta de carne", v: pick("Venta de carne de bueyes propios") }], { fmt: v => nf(v) + " €", etiquetaFinal: true }), n: "Venta de carne de bueyes propios por año." },
    { sec: "El precio", t: "55 €/kg de canal son unos 82 €/kg de carne: precio de buey gourmet", svg: () => G.horizontales(MODELO.mercado.map(r => ({ n: r.etiqueta.replace("Casa Manjavacas: ", "Plan: "), v: r.valor, destaca: r.tipo === "plan" })).sort((a, b) => b.v - a.v), { fmt: v => nf(v, 2).replace(",00", "") + " €/kg", margen: 520 }), n: "Referencias públicas de precio (noviembre de 2026). Rojo: el plan." },

    // 3. Ingresos y gastos
    { sec: "Ingresos y gastos", t: "Los ingresos se separan de los gastos a partir de 2034", svg: () => G.lineas(A, [
        { nombre: "Ingresos", v: pick("Total ingresos") }, { nombre: "Gastos", v: pick("Total gastos"), color: S[2] }], { fmt: v => nf(v) + " €", min: 0 }), n: "Total de ingresos y de gastos por año." },
    { sec: "Ingresos y gastos", t: "La carne propia pasa a ser casi todo el ingreso", svg: () => G.barras(A, [
        { nombre: "Carne propia", v: sum(pick("Venta de carne de bueyes propios"), pick("Extra por venta directa")) },
        { nombre: "Animales crecidos", v: pick("Venta de los animales crecidos") },
        { nombre: "PAC", v: pick("Ayudas de la PAC") },
        { nombre: "Subproductos y genética", v: sum(pick("Subproductos y elaborados"), pick("Venta de novilla de genética")) }], { apiladas: true, fmt: v => nf(v) + " €" }), n: "Ingresos por año y origen." },
    { sec: "Ingresos y gastos", t: "El pasto es el gasto que más pesa", svg: () => G.barras(A, [
        { nombre: "Pasto y veterinario", v: pick("Pasto, alquiler y veterinario") },
        { nombre: "Compra de animales", v: sum(sum(pick("Compra de terneros"), pick("Compra de animales crecidos")), pick("Compra y gastos de bueyes de otros criadores")) },
        { nombre: "Engorde final", v: pick("Concentrado del engorde final") },
        { nombre: "Sacrificio y cámara", v: pick("Sacrificio, despiece y maduración") },
        { nombre: "Marketing", v: pick("Marketing y distribución") },
        { nombre: "Autónomos y seguro", v: sum(pick("Cuota de autónomos"), pick("Seguro del ganado")) }], { apiladas: true, fmt: v => nf(v) + " €" }), n: "Gastos por año y partida." },
    { sec: "Ingresos y gastos", t: `${nf(i11("Total ingresos"))} € de ingresos en 2038`, svg: () => G.horizontales([
        ["Carne de bueyes propios", "Venta de carne de bueyes propios"], ["Ayudas de la PAC", "Ayudas de la PAC"], ["Extra por venta directa", "Extra por venta directa"],
        ["Venta de novilla de genética", "Venta de novilla de genética"], ["Subproductos y elaborados", "Subproductos y elaborados"]]
        .map(([n, k]) => ({ n, v: i11(k) })).filter(f => f.v > 0).sort((a, b) => b.v - a.v), { fmt: v => nf(v) + " €" }), n: "Ingresos del Año 11 por partida." },
    { sec: "Ingresos y gastos", t: `${nf(i11("Total gastos"))} € de gastos en 2038`, svg: () => G.horizontales([
        ["Pasto, alquiler y veterinario", "Pasto, alquiler y veterinario"], ["Concentrado del engorde final", "Concentrado del engorde final"], ["Marketing y distribución", "Marketing y distribución"],
        ["Cuota de autónomos", "Cuota de autónomos"], ["Sacrificio, despiece y maduración", "Sacrificio, despiece y maduración"], ["Seguro del ganado", "Seguro del ganado"], ["Compra de terneros", "Compra de terneros"]]
        .map(([n, k]) => ({ n, v: i11(k) })).filter(f => f.v > 0).sort((a, b) => b.v - a.v), { fmt: v => nf(v) + " €" }), n: "Gastos del Año 11 por partida." },
    { sec: "Ingresos y gastos", t: `${nf(MODELO.ayudasPAC.reduce((a, b) => a + b, 0))} € de PAC en 16 años`, svg: () => G.barras(A, [{ nombre: "PAC", v: pick("Ayudas de la PAC") }], { fmt: v => nf(v) + " €" }), n: "Ayudas de la PAC por año." },
    { sec: "Ingresos y gastos", t: "El margen llega al 52 % en 2038", svg: () => G.lineas(A, [{ nombre: "Margen", v: pick("Margen sobre ingresos").map((v, i) => i < 2 ? null : v * 100) }], { fmt: v => nf(v) + " %", fmtY: v => nf(v) + " %", ref: { v: 0, texto: "" } }), n: "Resultado de explotación sobre ingresos (sin los Años 0 y 1, de arranque)." },
    { sec: "Ingresos y gastos", t: `La explotación gasta unos ${nf(i11("Gasto medio al mes de la explotación"))} € al mes en 2038`, svg: () => G.barras(A, [{ nombre: "Gasto al mes", v: pick("Gasto medio al mes de la explotación") }], { fmt: v => nf(v) + " €", etiquetaFinal: true }), n: "Gasto medio mensual de la explotación." },
    { sec: "Ingresos y gastos", t: `De ${nf(MODELO.cuentaBuey.ingresos.reduce((a, r) => a + r[1], 0))} € de ingresos a ${nf(MODELO.cuentaBuey.resultado)} € de resultado por buey`, svg: () => {
        const C = MODELO.cuentaBuey, ing = C.ingresos.reduce((a, r) => a + r[1], 0);
        return G.cascada([{ n: "Ingresos", corto: "Ingresos", v: ing, total: true }, ...C.gastos.map(([n, v]) => ({ n, corto: n.split(/[ ,]/)[0], v: -v })), { n: "Ajuste", corto: "Ajuste", v: C.resultado - (ing - C.gastos.reduce((a, r) => a + r[1], 0)) }, { n: "Resultado", corto: "Resultado", v: C.resultado, total: true }]);
      }, n: "Cuenta de un buey en el Año 11: ingresos, cada gasto y el resultado. Verde: suma; naranja: resta." },

    // 4. Resultado y caja
    { sec: "Resultado y caja", t: "Pérdidas los primeros años; más de 73.000 € al año desde 2038", svg: () => G.barras(A, [{ nombre: "Resultado", v: pick("RESULTADO DE EXPLOTACIÓN") }], { negColor: S[2], fmt: v => nf(v) + " €" }), n: "Resultado de explotación por año. Naranja: pérdidas." },
    { sec: "Resultado y caja", t: "La caja baja en 2028, 2032-2033 y 2035-2036: arranque, primeros bueyes e inversiones", svg: () => G.barras(A, [{ nombre: "Caja del año", v: pick("Caja del año") }], { negColor: S[2], fmt: v => nf(v) + " €" }), n: "Variación de caja de cada año." },
    { sec: "Resultado y caja", t: `La caja acaba en ${nf(ult("CAJA ACUMULADA"))} € en 2042`, svg: () => G.lineas(A, [{ nombre: "Caja", v: pick("CAJA ACUMULADA") }], { area: true, fmt: v => nf(v) + " €", ref: { v: 0, texto: "" } }), n: "Caja acumulada del negocio. El peor momento es 2028, con −1.649 €." },
    { sec: "Resultado y caja", t: "Las ayudas de capital acompañan a las dos grandes inversiones", svg: () => G.barras(A, [{ nombre: "Inversiones", v: pick("Inversiones") }, { nombre: "Ayudas de capital", v: pick("Ayudas de capital") }], { fmt: v => nf(v) + " €" }), n: "Inversiones y ayudas de capital por año." },
    { sec: "Resultado y caja", t: `${nf(ult("Invertido en instalaciones, cámara y vacas, acumulado"))} € invertidos en instalaciones, cámara y vacas`, svg: () => G.lineas(A, [{ nombre: "Invertido", v: pick("Invertido en instalaciones, cámara y vacas, acumulado") }], { escalon: true, fmt: v => nf(v) + " €", min: 0 }), n: "Inversión acumulada." },
    { sec: "Resultado y caja", t: `El negocio vale ${nf(ult("Patrimonio del negocio: caja + rebaño a precio de lonja"))} € en 2042, solo en caja y rebaño`, svg: () => G.barras(A, [{ nombre: "Caja", v: pick("CAJA ACUMULADA") }, { nombre: "Rebaño a precio de lonja", v: pick("Rebaño a precio de lonja, sin marca") }], { apiladas: true, fmt: v => nf(v) + " €" }), n: "Patrimonio: caja acumulada más el rebaño valorado sin marca." },
    { sec: "Resultado y caja", t: `${nf(i11("Resultado por hectárea de pasto"))} € de resultado por hectárea en 2038`, svg: () => G.barras(A, [{ nombre: "Por hectárea", v: pick("Resultado por hectárea de pasto") }], { negColor: S[2], fmt: v => nf(v) + " €" }), n: "Resultado de explotación por hectárea de pasto." },
    { sec: "Resultado y caja", t: `${nf(i11("Resultado por cabeza en la explotación"))} € de resultado por cabeza en 2038`, svg: () => G.barras(A, [{ nombre: "Por cabeza", v: pick("Resultado por cabeza en la explotación") }], { negColor: S[2], fmt: v => nf(v) + " €" }), n: "Resultado de explotación por cabeza en la explotación." },

    // 5. El inversor
    { sec: "El inversor", t: "Primer pago por el resultado de 2035; el mayor, 14.983 €, por el de 2037", svg: () => G.barras(A, [{ nombre: "Pago", v: pick("Pago a los inversores (por el resultado del año)") }], { fmt: v => nf(v) + " €" }), n: "Pago a los inversores por el resultado de cada año (se cobra en junio del siguiente)." },
    { sec: "El inversor", t: "Lo aportado se recupera con el resultado de 2037", svg: () => G.lineas(A, [{ nombre: "Cobrado", v: pick("Cobrado acumulado por los inversores").map((v, i) => i < 7 ? null : v) }], { area: true, fmt: v => nf(v) + " €", min: 0, ref: { v: 30000, texto: "Aportado: 30.000 €", color: S[2] } }), n: "Cobrado acumulado por los inversores, por año del resultado." },
    { sec: "El inversor", t: "En el escenario de riesgo, los inversores no recuperan lo aportado", svg: () => G.lineas(A, [
        { nombre: "Base", v: P["Cobrado acumulado por los inversores"] }, { nombre: "Conservador", v: DATOS.conservador["Cobrado acumulado por los inversores"] }, { nombre: "Riesgo", v: DATOS.riesgo["Cobrado acumulado por los inversores"], color: S[2] }],
        { fmt: v => nf(v) + " €", min: 0, ref: { v: 30000, texto: "Aportado: 30.000 €", color: "#e8dcc8" } }), n: "Cobrado acumulado por escenario." },
    { sec: "El inversor", t: "Las medidas de mejora suben lo que cobra el inversor hasta 97.661 €", svg: () => G.horizontales([{ n: "Plan actual (Base)", v: 69545, destaca: true }, ...MODELO.medidas.map(m => ({ n: m.nombre, v: m.reciben })), ...MODELO.escenarios.slice(1).map(e => ({ n: "Escenario " + e.nombre.toLowerCase(), v: e.reciben }))].sort((a, b) => b.v - a.v), { fmt: v => nf(v) + " €" }), n: "Lo que cobran los inversores en total según escenario y medida. Las medidas usan supuestos sin confirmar; la de otros criadores no tiene ningún criador confirmado." },
    { sec: "El inversor", t: "Rentabilidad anual del 10 % en el Base; del 2,5 % en el conservador", svg: () => G.horizontales([{ n: "Plan actual (Base)", v: 10.0, destaca: true }, { n: "Escenario conservador", v: 2.5 }, ...MODELO.medidas.map(m => ({ n: m.nombre, v: m.tir }))].sort((a, b) => b.v - a.v), { fmt: v => nf(v, 1) + " %" }), n: "TIR del inversor. En el escenario de riesgo es negativa y no aparece. Las medidas usan supuestos sin confirmar." },

    // 6. Escenarios y sensibilidad
    { sec: "Escenarios", t: "A precio de lonja el negocio gana poco: unos 7.800 € en 2038", svg: () => G.lineas(A, [
        { nombre: "Base", v: P["RESULTADO DE EXPLOTACIÓN"] }, { nombre: "Conservador", v: DATOS.conservador["RESULTADO DE EXPLOTACIÓN"] }, { nombre: "Riesgo", v: DATOS.riesgo["RESULTADO DE EXPLOTACIÓN"], color: S[2] }], { fmt: v => nf(v) + " €", ref: { v: 0, texto: "" } }), n: "Resultado de explotación por escenario." },
    { sec: "Escenarios", t: "En el escenario conservador la caja pasa por negativo en 2034 y 2035", svg: () => G.lineas(A, [
        { nombre: "Base", v: P["CAJA ACUMULADA"] }, { nombre: "Conservador", v: DATOS.conservador["CAJA ACUMULADA"] }, { nombre: "Riesgo", v: DATOS.riesgo["CAJA ACUMULADA"], color: S[2] }], { fmt: v => nf(v) + " €", ref: { v: 0, texto: "" } }), n: "Caja acumulada por escenario." },
    { sec: "Escenarios", t: "Tres hipótesis de precio: 55, 46,8 y 21,3 €/kg", svg: () => G.lineas(A, [
        { nombre: "Base", v: P["Precio de los bueyes propios (€/kg canal)"].map((v, i) => i < 5 ? null : v) }, { nombre: "Conservador", v: DATOS.conservador["Precio de los bueyes propios (€/kg canal)"].map((v, i) => i < 5 ? null : v) }, { nombre: "Riesgo", v: DATOS.riesgo["Precio de los bueyes propios (€/kg canal)"].map((v, i) => i < 5 ? null : v), color: S[2] }], { escalon: true, fmt: v => nf(v, 1) + " €/kg", min: 0 }), n: "Precio por kilo de canal en cada escenario." },
    { sec: "Escenarios", t: "Precio y número de bueyes: el resultado de 2038 va de 19.000 a 282.000 €", svg: () => {
        const R = DATOS.sensRaw, i0 = R.findIndex(r => String(r[0]).startsWith("Precio (€/kg canal)"));
        const cols = R[i0].slice(1).filter(v => v != null), filas = R.slice(i0 + 1, i0 + 9);
        return G.calor(filas.map(r => r[0] + " €/kg"), cols.map(c => nf(c, 1) + " bueyes"), filas.map(r => r.slice(1, 1 + cols.length)), { filaDestaca: filas.findIndex(r => r[0] === 55), colDestaca: cols.indexOf(5.2), colTitulo: "Bueyes vendidos al año →", filaTitulo: "Precio ↓" });
      }, n: "Resultado de explotación del Año 11 según precio y bueyes vendidos (hoja «Sensibilidad»). Recuadro: el Plan actual." },
    { sec: "Escenarios", t: "Para llegar a 55 €/kg el chuletón tendría que venderse a unos 158 €/kg", svg: () => {
        const cats = [["Solomillo", 3, 4], ["Chuletón y lomo", 13, 3.5], ["Resto de Primera", 47, 1.8], ["Segunda", 10, 1.3], ["Tercera (guiso, picada)", 27, 1]];
        const total = 493 * 55, kg = cats.map(c => 330.5 * c[1] / 100), base = total / kg.reduce((s, k, i) => s + k * cats[i][2], 0);
        return G.horizontales(cats.map(c => ({ n: c[0], v: base * c[2], destaca: c[0] === "Chuletón y lomo" })), { fmt: v => nf(v) + " €/kg" });
      }, n: "Precio por kilo de carne de cada tipo de pieza para llegar a 55 €/kg de canal, con el reparto de despieces publicados (calculadora de precios)." }
  ];

  // Construye las diapositivas antes de la de cierre
  const cierre = [...document.querySelectorAll(".diapo")].pop();
  const secciones = [...new Set(graficos.map(g => g.sec))];
  const indice = document.createElement("section");
  indice.className = "diapo";
  indice.innerHTML = `<div class="sup">ANEXO DE DATOS</div><h2>${graficos.length} gráficos con las cifras del modelo</h2>
    <p class="lead">Para responder preguntas en la reunión. Todas son previsiones del Plan actual, salvo que se indique otro escenario.</p>
    <div class="indice-anexo">${secciones.map(s => { const n0 = graficos.findIndex(g => g.sec === s); const cnt = graficos.filter(g => g.sec === s).length; return `<a href="#" data-ir="${n0}"><b>${s}</b><span>${cnt} gráficos</span></a>`; }).join("")}</div>`;
  cierre.before(indice);
  graficos.forEach((g, k) => {
    const d = document.createElement("section");
    d.className = "diapo diapo-graf";
    d.dataset.anexo = k;
    d.innerHTML = `<div class="sup">ANEXO · ${g.sec.toUpperCase()} · ${k + 1} / ${graficos.length}</div><h2>${g.t}</h2><div class="graf">${g.svg()}</div><p class="nota">${g.n} Fuente: modelo económico de Casa Manjavacas (previsiones).</p>`;
    cierre.before(d);
  });
  window.ANEXO_N = graficos.length;
})();
