// Lógica común de la web de Casa Manjavacas.
(function () {
  const ESTADOS = { ceba: "En ceba", acabado: "En engorde final", maduracion: "En maduración", vendido: "Vendido" };
  const TIPOS = {
    entrada: "Entrada", pasto: "Pasto", sanidad: "Sanidad", alimentacion: "Alimentación",
    peso: "Pesaje", sacrificio: "Sacrificio", maduracion: "Maduración", otro: "Otro"
  };
  // Las cinco etapas de la vida de un buey Casa Manjavacas.
  const ETAPAS = [
    { clave: "entrada", nombre: "Llega de ternero", detalle: "Rubia Gallega, con unos 7 meses" },
    { clave: "ceba", nombre: "Cuatro años en el monte", detalle: "Pasto en extensivo en la Montaña Palentina" },
    { clave: "acabado", nombre: "Un año de engorde final", detalle: "Heno y cereal para infiltrar la grasa" },
    { clave: "maduracion", nombre: "Maduración en cámara", detalle: "Semanas de reposo en seco" },
    { clave: "vendido", nombre: "En tu mesa", detalle: "Pieza a pieza, con su historia" }
  ];
  const ORDEN = { ceba: 1, acabado: 2, maduracion: 3, vendido: 4 };
  const COCINA = {
    "Chuletón": "Atemperar 1 hora. Brasa muy fuerte, 4-5 min por cara, sal gorda al final y reposo de 5 min.",
    "Lomo alto": "En plancha muy caliente, vuelta y vuelta. Pide un corte de 3 cm para que quede rojo por dentro.",
    "Lomo bajo": "Plancha o brasa, punto poco hecho. Cortar en tiras finas contra la fibra.",
    "Solomillo": "Sellar entero y terminar al horno a 180 °C. Retirar a 52 °C en el centro.",
    "Entrecot": "Sartén de hierro, mantequilla y tomillo al final para regar la pieza.",
    "Picaña": "Con la capa de grasa hacia el fuego primero. Cortar en filetes gruesos.",
    "Entraña": "Brasa rápida y fuerte. Sabor intenso, se corta en diagonal."
  };

  function eventosLocales() {
    try { return JSON.parse(localStorage.getItem("cm-eventos") || "[]"); } catch (e) { return []; }
  }
  function guardarEventoLocal(ev) {
    try { const l = eventosLocales(); l.push(ev); localStorage.setItem("cm-eventos", JSON.stringify(l)); return true; }
    catch (e) { return false; }
  }
  function bueyes() {
    const extra = eventosLocales();
    return (window.BUEYES || []).map(b => {
      const evs = b.eventos.concat(extra.filter(e => e.id === b.id)).sort((a, c) => a.fecha.localeCompare(c.fecha));
      return Object.assign({}, b, { eventos: evs });
    });
  }
  const hoy = () => window.FECHA_DEMO ? new Date(window.FECHA_DEMO + "T12:00:00") : new Date();
  const fmt = f => f ? new Date(f + "T12:00:00").toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" }) : "—";
  const fmtCorto = f => f ? new Date(f + "T12:00:00").toLocaleDateString("es-ES", { month: "short", year: "numeric" }) : "—";
  const dias = (desde, hasta) => Math.max(0, Math.round(((hasta ? new Date(hasta + "T12:00:00") : hoy()) - new Date(desde + "T12:00:00")) / 864e5));
  const meses = (desde, hasta) => Math.round(dias(desde, hasta) / 30.44);
  const eur = n => Math.round(n).toLocaleString("es-ES", { useGrouping: "always" }) + " €";
  const num = n => Math.round(n).toLocaleString("es-ES", { useGrouping: "always" });
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  function urlFicha(id) {
    return location.href.replace(/[^/]*([?#].*)?$/, "") + "ficha.html?id=" + encodeURIComponent(id);
  }
  function qrSVG(texto, color) {
    const qr = qrcode(0, "M"); qr.addData(texto); qr.make();
    let s = qr.createSvgTag({ cellSize: 6, margin: 2, scalable: true });
    if (color) s = s.replace(/fill="black"/g, 'fill="' + color + '"');
    return s;
  }
  window.CM = { ESTADOS, TIPOS, ETAPAS, ORDEN, COCINA, bueyes, hoy, fmt, fmtCorto, dias, meses, eur, num, esc, urlFicha, qrSVG, guardarEventoLocal };
})();
