// Ilustración del paisaje de la Montaña Palentina al atardecer, con bueyes pastando. Devuelve un <svg> como texto.
// Opciones: sinCielo (sin cielo ni sol), bueyes ([[x, y, dirección], ...]; [] para ninguno), sinArbol.
window.paisajeSVG = function (opc) {
  opc = opc || {};
  // Números pseudoaleatorios fijos para que el dibujo sea siempre igual.
  let semilla = 7;
  const azar = () => (semilla = (semilla * 9301 + 49297) % 233280) / 233280;

  const estrellas = Array.from({ length: 46 }, () => {
    const x = Math.round(azar() * 1600), y = Math.round(azar() * 300), r = (azar() * 1.3 + .4).toFixed(1), o = (azar() * .5 + .2).toFixed(2);
    return `<circle cx="${x}" cy="${y}" r="${r}" fill="#f6e7cf" opacity="${o}"/>`;
  }).join("");

  const cielo = opc.sinCielo ? "" : `
    <rect width="1600" height="900" fill="url(#cielo)"/>
    <g class="estrellas">${estrellas}</g>
    <circle cx="1120" cy="430" r="260" fill="url(#sol)"/>
    <circle cx="1120" cy="430" r="48" fill="#f8c780"/>
    <g fill="none" stroke="#2a1d1c" stroke-width="2.2" stroke-linecap="round" opacity=".7">
      <path d="M930 300q7-6 14 0q7-6 14 0"/><path d="M972 278q5-5 10 0q5-5 10 0"/><path d="M905 330q5-4 10 0q5-4 10 0"/>
    </g>`;

  // Bosque: copas redondeadas a lo largo de una línea
  const bosque = (x0, x1, yBase, paso, alto, color) => {
    let s = "";
    for (let x = x0; x < x1; x += paso * (.6 + azar() * .7)) {
      const r = alto * (.55 + azar() * .5), y = yBase(x);
      s += `<ellipse cx="${x.toFixed(0)}" cy="${(y - r * .6).toFixed(0)}" rx="${(r * .8).toFixed(0)}" ry="${r.toFixed(0)}" fill="${color}"/>`;
    }
    return s;
  };
  const crestaMedia = x => 600 - 30 * Math.sin(x / 210) - 18 * Math.sin(x / 95 + 1);

  const buey = `
    <symbol id="buey" viewBox="0 0 120 70">
      <path d="M22 20C26 13 40 12 54 13H84C92 13 98 15 102 19L108 17C112 16 116 18 117 22L118 30C118 34 115 36 112 35L106 34C104 37 101 39 98 40L97 47 96 68H90L89 50H86L85 68H79L78 49H46L44 68H38L37 50H34L32 68H26L25 47C21 44 19 38 19 31 19 27 20 23 22 20Z"/>
      <path d="M21 23C15 30 13 40 14 54L17 54C17 43 18 34 23 27Z"/>
      <path d="M106 18C105 13 108 10 112 10 110 12 109 14 110 18ZM103 22L97 19 100 25Z"/>
    </symbol>`;
  const rebano = (opc.bueyes || [[290, 712, 1], [450, 735, -1], [600, 705, 1], [990, 738, -1], [1230, 716, 1]])
    .map(([x, y, d]) => `<use href="#buey" x="${d > 0 ? x : -x - 124}" y="${y}" width="124" height="72" transform="scale(${d},1)" fill="#120e0b"/>`).join("");

  const cercado = (() => {
    let s = "", pts = [];
    for (let x = -10; x <= 560; x += 62) { const y = 880 - x * .07 + Math.sin(x / 90) * 3; pts.push([x, y]); s += `<rect x="${x - 3}" y="${(y - 52).toFixed(0)}" width="6" height="54" rx="1.5" fill="#0b0807"/>`; }
    const linea = dy => `<polyline fill="none" stroke="#0b0807" stroke-width="2.2" points="${pts.map(([x, y]) => `${x},${(y - dy).toFixed(0)}`).join(" ")}"/>`;
    return s + linea(42) + linea(22);
  })();

  const arbol = opc.sinArbol ? "" : `
    <g fill="#0f0b09" transform="translate(70 0)">
      <path d="M1418 800C1420 760 1416 720 1410 690L1424 688C1428 720 1432 760 1434 800Z"/>
      <path d="M1412 700L1380 676 1384 670 1416 692ZM1426 696L1458 672 1462 678 1430 702Z"/>
      <circle cx="1380" cy="660" r="40"/><circle cx="1424" cy="636" r="52"/><circle cx="1470" cy="664" r="40"/><circle cx="1350" cy="690" r="28"/><circle cx="1498" cy="694" r="28"/><circle cx="1424" cy="684" r="44"/>
    </g>`;

  return `<svg class="paisaje" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
  <defs>
    <linearGradient id="cielo" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#120f17"/><stop offset=".38" stop-color="#3d2430"/><stop offset=".62" stop-color="#9a4f36"/><stop offset=".8" stop-color="#d98a4c"/><stop offset="1" stop-color="#e9b06a"/>
    </linearGradient>
    <radialGradient id="sol"><stop offset="0" stop-color="#ffd59a" stop-opacity=".8"/><stop offset=".35" stop-color="#ffc27a" stop-opacity=".35"/><stop offset="1" stop-color="#ffc27a" stop-opacity="0"/></radialGradient>
    <linearGradient id="muylejos" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b07a72"/><stop offset="1" stop-color="#8a5f62"/></linearGradient>
    <linearGradient id="lejos" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7d5a66"/><stop offset="1" stop-color="#4a3643"/></linearGradient>
    <linearGradient id="luzlejos" x1="1" y1="0" x2="0" y2="0"><stop offset="0" stop-color="#e9a46a" stop-opacity=".35"/><stop offset=".5" stop-color="#e9a46a" stop-opacity="0"/></linearGradient>
    <linearGradient id="medio" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#46363a"/><stop offset="1" stop-color="#261f22"/></linearGradient>
    <linearGradient id="prado" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5e6a40"/><stop offset=".6" stop-color="#3a3a24"/><stop offset="1" stop-color="#262418"/></linearGradient>
    <linearGradient id="suelo" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a2219"/><stop offset=".55" stop-color="#14110f"/></linearGradient>
    <linearGradient id="bruma" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f3d9b5" stop-opacity="0"/><stop offset=".5" stop-color="#f3d9b5" stop-opacity=".2"/><stop offset="1" stop-color="#f3d9b5" stop-opacity="0"/></linearGradient>
    ${buey}
  </defs>
  ${cielo}
  <path d="M0 520 L90 490 L180 505 L300 455 L420 480 L520 440 L650 470 L760 430 L880 465 L980 425 L1100 460 L1220 432 L1330 470 L1450 440 L1600 470 V900 H0Z" fill="url(#muylejos)" opacity=".55"/>
  <path d="M0 560 L120 500 L230 530 L360 430 L470 490 L600 380 L700 440 L790 400 L900 470 L1010 360 L1130 450 L1240 410 L1350 480 L1470 420 L1600 470 V900 H0Z" fill="url(#lejos)"/>
  <path d="M0 560 L120 500 L230 530 L360 430 L470 490 L600 380 L700 440 L790 400 L900 470 L1010 360 L1130 450 L1240 410 L1350 480 L1470 420 L1600 470 V900 H0Z" fill="url(#luzlejos)"/>
  <path d="M600 380 L640 420 L620 418 L600 400 L585 412 L570 405Z M1010 360 L1050 398 L1028 395 L1010 380 L995 392 L980 388Z M360 430 L392 458 L372 456 L360 446 L346 452Z M1470 420 L1494 440 L1478 438 L1470 430 L1460 436Z" fill="#efdccb" opacity=".6"/>
  <g class="niebla"><rect x="-200" y="500" width="2000" height="120" fill="url(#bruma)"/></g>
  <g>${bosque(-20, 1640, crestaMedia, 26, 22, "#2b2124")}</g>
  <path d="M0 ${crestaMedia(0).toFixed(0)} ${Array.from({ length: 33 }, (_, i) => `L${i * 50} ${crestaMedia(i * 50).toFixed(0)}`).join(" ")} L1600 ${crestaMedia(1600).toFixed(0)} V900 H0Z" fill="url(#medio)"/>
  <g class="niebla" style="animation-duration:52s"><rect x="-200" y="610" width="2000" height="90" fill="url(#bruma)"/></g>
  <path d="M0 740 C200 700 380 690 560 720 C760 752 900 700 1100 712 C1300 724 1460 760 1600 740 V900 H0Z" fill="url(#prado)"/>
  <path d="M0 740 C200 700 380 690 560 720 C760 752 900 700 1100 712 C1300 724 1460 760 1600 740" fill="none" stroke="#c9a467" stroke-opacity=".28" stroke-width="2"/>
  ${rebano}
  ${arbol}
  <path d="M0 800 C260 780 520 790 800 806 C1080 822 1340 800 1600 790 V900 H0Z" fill="url(#suelo)"/>
  ${opc.sinCercado ? "" : cercado}
</svg>`;
};
