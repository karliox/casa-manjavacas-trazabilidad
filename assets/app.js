// Lógica común de la demo de trazabilidad Casa Manjavacas.
(function () {
  const ESTADOS = {
    ceba: "En ceba", acabado: "En acabado", maduracion: "En maduración", vendido: "Vendido"
  };
  const TIPOS = {
    entrada: "Entrada", pasto: "Pasto", sanidad: "Sanidad", alimentacion: "Alimentación",
    peso: "Pesaje", sacrificio: "Sacrificio", maduracion: "Maduración", otro: "Otro"
  };

  // Eventos añadidos desde "Registrar" (solo en este navegador, para la demo).
  function eventosLocales() {
    try { return JSON.parse(localStorage.getItem("cm-eventos") || "[]"); } catch (e) { return []; }
  }
  function guardarEventoLocal(ev) {
    try {
      const l = eventosLocales(); l.push(ev);
      localStorage.setItem("cm-eventos", JSON.stringify(l)); return true;
    } catch (e) { return false; }
  }

  function bueyes() {
    const extra = eventosLocales();
    return (window.BUEYES || []).map(b => {
      const evs = b.eventos.concat(extra.filter(e => e.id === b.id))
        .sort((a, c) => a.fecha.localeCompare(c.fecha));
      return Object.assign({}, b, { eventos: evs });
    });
  }

  const fmt = f => f ? new Date(f + "T12:00:00").toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" }) : "—";
  const meses = (desde, hasta) => {
    const a = new Date(desde), b = hasta ? new Date(hasta) : new Date();
    return Math.max(0, Math.round((b - a) / (1000 * 60 * 60 * 24 * 30.44)));
  };
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  function urlFicha(id) {
    const base = location.href.replace(/[^/]*([?#].*)?$/, "");
    return base + "ficha.html?id=" + encodeURIComponent(id);
  }

  function qrSVG(texto) {
    const qr = qrcode(0, "M"); qr.addData(texto); qr.make();
    return qr.createSvgTag({ cellSize: 6, margin: 2, scalable: true });
  }

  window.CM = { ESTADOS, TIPOS, bueyes, fmt, meses, esc, urlFicha, qrSVG, guardarEventoLocal };
})();
