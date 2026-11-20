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

  // Carga desde Google Sheets (pestañas «Bueyes» y «Eventos»), con los datos de ejemplo como respaldo.
  function csv(t) {
    const filas = []; let f = [], c = "", q = false;
    for (let i = 0; i < t.length; i++) {
      const ch = t[i];
      if (q) { if (ch === '"') { if (t[i + 1] === '"') { c += '"'; i++; } else q = false; } else c += ch; }
      else if (ch === '"') q = true;
      else if (ch === ",") { f.push(c); c = ""; }
      else if (ch === "\n" || ch === "\r") { if (ch === "\r" && t[i + 1] === "\n") i++; f.push(c); filas.push(f); f = []; c = ""; }
      else c += ch;
    }
    if (c || f.length) { f.push(c); filas.push(f); }
    const cab = (filas.shift() || []).map(h => h.trim());
    return filas.filter(r => r.some(x => x.trim())).map(r => Object.fromEntries(cab.map((h, i) => [h, (r[i] || "").trim()])));
  }
  function fechaISO(v) {
    if (!v) return "";
    if (/^\d{4}-\d{2}-\d{2}/.test(v)) return v.slice(0, 10);
    const m = /^(\d{1,2})\/(\d{1,2})\/(\d{4})/.exec(v);
    return m ? `${m[3]}-${m[2].padStart(2, "0")}-${m[1].padStart(2, "0")}` : v;
  }
  const n = v => v === "" || v == null ? undefined : Number(String(v).replace(",", "."));
  let fuente = "ejemplo";
  async function cargarHoja() {
    const C = window.CONFIG_DATOS || {};
    if (!C.hojaGoogle) return;
    const url = p => `https://docs.google.com/spreadsheets/d/${C.hojaGoogle}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(p)}`;
    const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), 6000);
    try {
      const [rb, re] = await Promise.all([fetch(url("Bueyes"), { signal: ctl.signal }), fetch(url("Eventos"), { signal: ctl.signal })]);
      if (!rb.ok || !re.ok) return;
      const tb = await rb.text(), te = await re.text();
      if (/^\s*</.test(tb)) return; // página de inicio de sesión: la hoja no está compartida
      const bs = csv(tb), es = csv(te);
      if (!bs.length || !("id" in bs[0])) return;
      window.BUEYES = bs.map(b => ({
        id: b.id, nombre: b.nombre, crotal: b.crotal, raza: b.raza || "Rubia Gallega",
        nacimiento: fechaISO(b.nacimiento), entrada: fechaISO(b.entrada), estado: (b.estado || "ceba").toLowerCase(),
        sacrificio: fechaISO(b.sacrificio) || undefined, pesoCanal: n(b.pesoCanal), pesoVivo: n(b.pesoVivo), diasMaduracion: n(b.diasMaduracion),
        cortes: b.cortes ? b.cortes.split(",").map(x => x.trim()).filter(Boolean) : [],
        eventos: es.filter(e => e.id === b.id).map(e => ({ fecha: fechaISO(e.fecha), tipo: (e.tipo || "otro").toLowerCase(), texto: e.texto }))
      }));
      window.FECHA_DEMO = C.fechaSimulada || null;
      fuente = "hoja";
    } catch (e) { /* sin conexión o hoja privada: seguimos con los datos de ejemplo */ }
    finally { clearTimeout(t); }
  }
  const promesa = cargarHoja();
  const listo = fn => promesa.then(() => {
    fn();
    if (fuente === "hoja" && !window.FECHA_DEMO) document.querySelectorAll(".demo").forEach(d => d.remove());
  }, () => fn());

  window.CM = { ESTADOS, TIPOS, ETAPAS, ORDEN, COCINA, bueyes, hoy, fmt, fmtCorto, dias, meses, eur, num, esc, urlFicha, qrSVG, guardarEventoLocal, listo, fuente: () => fuente };
})();
