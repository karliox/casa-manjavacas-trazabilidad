// Gráficos SVG para la presentación (fondo oscuro). Cada función devuelve un <svg> como texto.
// Paleta categórica validada (modo oscuro, fondo #14110f): orden fijo, nunca rotado.
(function () {
  const S = ["#c98500", "#199e70", "#d95926", "#3987e5", "#d55181", "#9085e9"];
  const TXT = "#d9cbb5", TXT2 = "#a8977f", REJ = "rgba(243,234,219,.10)", EJE = "rgba(243,234,219,.35)";
  const W = 1200, H = 500;
  const nf = (v, d = 0) => v == null ? "—" : Number(v).toLocaleString("es-ES", { maximumFractionDigits: d, minimumFractionDigits: d, useGrouping: "always" });
  const corto = v => {
    const a = Math.abs(v);
    if (a >= 1e6) return nf(v / 1e6, 1) + " M";
    if (a >= 1e4) return nf(v / 1e3, 0) + " k";
    if (a >= 1e3) return nf(v / 1e3, 1) + " k";
    return nf(v, a < 10 && a % 1 ? 1 : 0);
  };
  // Escala "bonita"
  function escala(min, max, n = 5) {
    if (min === max) { max = min + 1; }
    const paso0 = (max - min) / n, mag = Math.pow(10, Math.floor(Math.log10(paso0))), f = paso0 / mag;
    const paso = (f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10) * mag;
    const lo = Math.floor(min / paso) * paso, hi = Math.ceil(max / paso) * paso, ticks = [];
    for (let t = lo; t <= hi + paso / 2; t += paso) ticks.push(+t.toFixed(10));
    return { lo, hi, ticks };
  }
  const leyenda = series => {
    if (series.length < 2) return "";
    let x = 70, y = 18, g = "";
    series.forEach((s, i) => {
      const w = 40 + s.nombre.length * 8.2;
      if (x + w > W - 20) { x = 70; y += 24; }
      g += `<g transform="translate(${x},${y})"><rect width="14" height="14" rx="3" fill="${s.color || S[i]}"/><text x="22" y="12">${s.nombre}</text></g>`;
      x += w;
    });
    return `<g font-size="15" fill="${TXT}">${g}</g>`;
  };
  // Marco con eje Y y rejilla; devuelve funciones de posición
  function marco(etiquetas, yMin, yMax, opc = {}) {
    const mL = 76, mR = 24, mT = opc.leyenda ? 48 : 20, mB = 44, iw = W - mL - mR, ih = H - mT - mB;
    const e = escala(Math.min(0, yMin), Math.max(0, yMax), opc.ticks || 5);
    const y = v => mT + (e.hi - v) / (e.hi - e.lo) * ih, n = etiquetas.length, bw = iw / n, x = i => mL + i * bw + bw / 2;
    let g = "";
    e.ticks.forEach(t => {
      g += `<line x1="${mL}" x2="${W - mR}" y1="${y(t)}" y2="${y(t)}" stroke="${t === 0 ? EJE : REJ}"/>`;
      g += `<text x="${mL - 10}" y="${y(t) + 5}" text-anchor="end" font-size="14" fill="${TXT2}">${(opc.fmtY || corto)(t)}</text>`;
    });
    const cada = n > 12 ? 2 : 1;
    etiquetas.forEach((l, i) => { if (i % cada === 0 || i === n - 1) g += `<text x="${x(i)}" y="${H - 14}" text-anchor="middle" font-size="14" fill="${TXT2}">${l}</text>`; });
    return { g, x, y, bw, mL, mR, mT, mB, iw, ih };
  }
  const svg = (cuerpo, etiqueta) => `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${etiqueta || "Gráfico"}" font-family="Inter,system-ui,sans-serif">${cuerpo}</svg>`;

  // Barras simples, apiladas o con signo
  function barras(etiquetas, series, opc = {}) {
    const apil = series.length > 1 && opc.apiladas;
    const tot = etiquetas.map((_, i) => series.reduce((s, se) => s + Math.max(0, se.v[i] || 0), 0));
    const neg = etiquetas.map((_, i) => series.reduce((s, se) => s + Math.min(0, se.v[i] || 0), 0));
    const max = apil ? Math.max(...tot) : Math.max(...series.flatMap(s => s.v.map(v => v || 0)));
    const min = apil ? Math.min(...neg) : Math.min(...series.flatMap(s => s.v.map(v => v || 0)));
    const m = marco(etiquetas, min, max, { leyenda: series.length > 1, fmtY: opc.fmtY });
    let g = m.g;
    etiquetas.forEach((l, i) => {
      if (apil) {
        let base = 0, baseN = 0;
        series.forEach((se, k) => {
          const v = se.v[i] || 0; if (!v) return;
          const y0 = v > 0 ? m.y(base + v) : m.y(baseN), h = Math.abs(m.y(v > 0 ? base : baseN) - m.y(v > 0 ? base + v : baseN + v));
          g += `<rect x="${m.x(i) - m.bw * .32}" y="${y0 + 1}" width="${m.bw * .64}" height="${Math.max(h - 2, 1)}" rx="3" fill="${se.color || S[k]}"><title>${l} · ${se.nombre}: ${(opc.fmt || nf)(v)}</title></rect>`;
          if (v > 0) base += v; else baseN += v;
        });
      } else {
        const k = series.length, gw = m.bw * .7 / k;
        series.forEach((se, j) => {
          const v = se.v[i]; if (v == null || v === 0) return;
          const col = v < 0 && opc.negColor ? opc.negColor : (se.color || S[j]);
          const y0 = m.y(Math.max(v, 0)), h = Math.abs(m.y(v) - m.y(0));
          g += `<rect x="${m.x(i) - m.bw * .35 + j * gw + 1}" y="${y0}" width="${gw - 2}" height="${Math.max(h, 1)}" rx="3" fill="${col}"><title>${l}${k > 1 ? " · " + se.nombre : ""}: ${(opc.fmt || nf)(v)}</title></rect>`;
        });
      }
    });
    if (opc.etiquetaFinal) { const i = etiquetas.length - 1, v = apil ? tot[i] : series[0].v[i]; g += `<text x="${m.x(i)}" y="${m.y(v) - 10}" text-anchor="middle" font-size="15" fill="${TXT}" font-weight="600">${(opc.fmt || nf)(v)}</text>`; }
    if (opc.ref) g += `<line x1="${m.mL}" x2="${W - m.mR}" y1="${m.y(opc.ref.v)}" y2="${m.y(opc.ref.v)}" stroke="${opc.ref.color || "#e8dcc8"}" stroke-dasharray="7 6" stroke-width="2"/><text x="${W - m.mR}" y="${m.y(opc.ref.v) - 8}" text-anchor="end" font-size="14" fill="${TXT}">${opc.ref.texto}</text>`;
    return svg(leyenda(series) + g, opc.titulo);
  }

  // Líneas (escalones opcionales)
  function lineas(etiquetas, series, opc = {}) {
    const vals = series.flatMap(s => s.v.filter(v => v != null));
    const m = marco(etiquetas, opc.min != null ? opc.min : Math.min(...vals), opc.max != null ? opc.max : Math.max(...vals), { leyenda: series.length > 1, fmtY: opc.fmtY });
    let g = m.g;
    if (opc.ref) g += `<line x1="${m.mL}" x2="${W - m.mR}" y1="${m.y(opc.ref.v)}" y2="${m.y(opc.ref.v)}" stroke="${opc.ref.color || "#e8dcc8"}" stroke-dasharray="7 6" stroke-width="2"/><text x="${m.mL + 8}" y="${m.y(opc.ref.v) - 8}" font-size="14" fill="${TXT}">${opc.ref.texto}</text>`;
    series.forEach((se, k) => {
      const col = se.color || S[k];
      const pts = se.v.map((v, i) => v == null ? null : [m.x(i), m.y(v)]).filter(Boolean);
      let d = "";
      pts.forEach((p, i) => { d += i === 0 ? `M${p[0]},${p[1]}` : opc.escalon ? `H${p[0]}V${p[1]}` : `L${p[0]},${p[1]}`; });
      if (opc.area && k === 0) g += `<path d="${d}V${m.y(0)}H${pts[0][0]}Z" fill="${col}" opacity=".14"/>`;
      g += `<path d="${d}" fill="none" stroke="${col}" stroke-width="3" stroke-linejoin="round"${se.discontinua ? ' stroke-dasharray="8 6"' : ""}/>`;
      se.v.forEach((v, i) => { if (v != null) g += `<circle cx="${m.x(i)}" cy="${m.y(v)}" r="9" fill="transparent"><title>${etiquetas[i]} · ${se.nombre || ""}: ${(opc.fmt || nf)(v)}</title></circle>`; });
      const u = pts[pts.length - 1], vu = se.v.filter(v => v != null).pop();
      g += `<circle cx="${u[0]}" cy="${u[1]}" r="5" fill="${col}" stroke="#14110f" stroke-width="2"/>`;
      if (opc.etiquetas !== false) g += `<text x="${u[0] - 10}" y="${u[1] - 12 - k * 2}" text-anchor="end" font-size="15" fill="${TXT}" font-weight="600">${(opc.fmt || nf)(vu)}</text>`;
    });
    return svg(leyenda(series) + g, opc.titulo);
  }

  // Barras horizontales ordenadas
  function horizontales(filas, opc = {}) {
    const n = filas.length, mL = opc.margen || 360, mR = 130, mT = 10, alto = Math.min(52, (H - 20) / n), max = Math.max(...filas.map(f => f.v));
    let g = "";
    filas.forEach((f, i) => {
      const y = mT + i * alto, w = (W - mL - mR) * f.v / max;
      g += `<text x="${mL - 14}" y="${y + alto / 2 + 5}" text-anchor="end" font-size="16" fill="${f.destaca ? "#f3eadb" : TXT}" font-weight="${f.destaca ? 600 : 400}">${f.n}</text>`;
      g += `<rect x="${mL}" y="${y + alto * .18}" width="${Math.max(w, 2)}" height="${alto * .64}" rx="4" fill="${f.color || (f.destaca ? S[2] : S[0])}"><title>${f.n}: ${(opc.fmt || nf)(f.v)}</title></rect>`;
      g += `<text x="${mL + w + 10}" y="${y + alto / 2 + 5}" font-size="16" fill="${TXT}">${(opc.fmt || nf)(f.v)}</text>`;
    });
    return `<svg viewBox="0 0 ${W} ${mT + n * alto + 10}" role="img" aria-label="${opc.titulo || "Gráfico"}" font-family="Inter,system-ui,sans-serif">${g}</svg>`;
  }

  // Cascada (de ingresos a resultado)
  function cascada(pasos, opc = {}) {
    let acc = 0; const barras = pasos.map(p => { const ini = p.total ? 0 : acc, fin = p.total ? p.v : acc + p.v; acc = fin; return { ...p, ini, fin }; });
    const max = Math.max(...barras.map(b => Math.max(b.ini, b.fin)));
    const m = marco(pasos.map(p => p.corto || p.n), 0, max, {});
    let g = m.g;
    barras.forEach((b, i) => {
      const y0 = m.y(Math.max(b.ini, b.fin)), h = Math.abs(m.y(b.ini) - m.y(b.fin));
      const col = b.total ? "#e8dcc8" : b.v >= 0 ? S[1] : S[2];
      g += `<rect x="${m.x(i) - m.bw * .34}" y="${y0}" width="${m.bw * .68}" height="${Math.max(h, 1)}" rx="3" fill="${col}"><title>${b.n}: ${nf(b.v)} €</title></rect>`;
      g += `<text x="${m.x(i)}" y="${y0 - 8}" text-anchor="middle" font-size="14" fill="${TXT}">${b.v > 0 && !b.total ? "+" : ""}${corto(b.v)}</text>`;
      if (i < barras.length - 1 && !barras[i + 1].total) g += `<line x1="${m.x(i) + m.bw * .34}" x2="${m.x(i + 1) - m.bw * .34}" y1="${m.y(b.fin)}" y2="${m.y(b.fin)}" stroke="${EJE}" stroke-dasharray="3 3"/>`;
    });
    return svg(g, opc.titulo);
  }

  // Mapa de calor con valores en cada celda (rampa secuencial de un solo tono)
  function calor(filasEtq, colEtq, matriz, opc = {}) {
    const mL = 150, mT = 54, mR = 20, mB = 20, cw = (W - mL - mR) / colEtq.length, ch = (H - mT - mB) / filasEtq.length;
    const vals = matriz.flat(), lo = Math.min(...vals), hi = Math.max(...vals);
    const col = v => { const t = (v - lo) / (hi - lo); const a = [42, 33, 24], b = [240, 195, 106]; return `rgb(${a.map((c, i) => Math.round(c + (b[i] - c) * Math.pow(t, .8))).join(",")})`; };
    let g = `<text x="${mL}" y="22" font-size="14" fill="${TXT2}">${opc.colTitulo || ""}</text><text x="20" y="22" font-size="14" fill="${TXT2}">${opc.filaTitulo || ""}</text>`;
    colEtq.forEach((c, j) => g += `<text x="${mL + j * cw + cw / 2}" y="${mT - 10}" text-anchor="middle" font-size="15" fill="${TXT}" font-weight="${opc.colDestaca === j ? 700 : 400}">${c}</text>`);
    filasEtq.forEach((f, i) => {
      g += `<text x="${mL - 14}" y="${mT + i * ch + ch / 2 + 5}" text-anchor="end" font-size="15" fill="${TXT}" font-weight="${opc.filaDestaca === i ? 700 : 400}">${f}</text>`;
      colEtq.forEach((c, j) => {
        const v = matriz[i][j], t = (v - lo) / (hi - lo);
        const marca = opc.filaDestaca === i && opc.colDestaca === j;
        g += `<rect x="${mL + j * cw + 1}" y="${mT + i * ch + 1}" width="${cw - 2}" height="${ch - 2}" rx="4" fill="${col(v)}"${marca ? ' stroke="#f3eadb" stroke-width="3"' : ""}><title>${f} · ${c}: ${nf(v)} €</title></rect>`;
        g += `<text x="${mL + j * cw + cw / 2}" y="${mT + i * ch + ch / 2 + 5}" text-anchor="middle" font-size="14" fill="${t > .55 ? "#14110f" : "#f3eadb"}">${corto(v)}</text>`;
      });
    });
    return svg(g, opc.titulo);
  }

  window.GRAF = { barras, lineas, horizontales, cascada, calor, S, nf, corto };
})();
