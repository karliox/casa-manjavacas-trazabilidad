// Ilustración del paisaje de montaña con bueyes pastando. Devuelve un <svg> como texto.
window.paisajeSVG = function (opc) {
  opc = opc || {};
  const cielo = opc.sinCielo ? "" : `
    <rect width="1600" height="900" fill="url(#cielo)"/>
    <circle cx="1120" cy="430" r="190" fill="url(#sol)"/>
    <circle cx="1120" cy="430" r="46" fill="#f6c27a" opacity=".9"/>`;
  const vaca = `
    <symbol id="buey" viewBox="0 0 120 70">
      <path d="M18 22c4-8 18-10 34-10h30c10 0 16 2 20 6l8-4c3-1 6 1 6 4l-3 6c2 3 3 7 2 10-1 4-5 6-9 6l-4 1c-2 2-3 4-3 7v19h-7l-2-16h-30l-3 16h-7l-1-17c-4-1-7-3-9-6l-2 23h-7l1-26c-6-3-9-9-6-17-2-1-5 0-7 3l-3-2c3-5 8-7 12-7z"/>
      <path d="M104 16c3-6 9-8 14-6-5 1-8 4-10 8z" />
    </symbol>`;
  const rebano = (opc.bueyes || [[290,712,1],[450,735,-1],[600,705,1],[990,738,-1],[1230,716,1]])
    .map(([x, y, d]) => `<use href="#buey" x="${d > 0 ? x : -x - 124}" y="${y}" width="124" height="72" transform="scale(${d},1)" fill="#120e0b"/>`).join("");
  return `<svg class="paisaje" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
  <defs>
    <linearGradient id="cielo" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#16121a"/><stop offset=".45" stop-color="#4a2a2b"/><stop offset=".72" stop-color="#b8603a"/><stop offset="1" stop-color="#e3a05a"/>
    </linearGradient>
    <radialGradient id="sol"><stop offset="0" stop-color="#ffd18a" stop-opacity=".75"/><stop offset="1" stop-color="#ffd18a" stop-opacity="0"/></radialGradient>
    <linearGradient id="lejos" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7d5a66"/><stop offset="1" stop-color="#4e3a46"/></linearGradient>
    <linearGradient id="medio" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a3a3c"/><stop offset="1" stop-color="#2c2427"/></linearGradient>
    <linearGradient id="prado" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#55603c"/><stop offset="1" stop-color="#2a2a1c"/></linearGradient>
    <linearGradient id="suelo" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a2219"/><stop offset=".55" stop-color="#14110f"/></linearGradient>
    <linearGradient id="bruma" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f3d9b5" stop-opacity="0"/><stop offset=".5" stop-color="#f3d9b5" stop-opacity=".22"/><stop offset="1" stop-color="#f3d9b5" stop-opacity="0"/></linearGradient>
    ${vaca}
  </defs>
  ${cielo}
  <path d="M0 560 L120 500 L230 530 L360 430 L470 490 L600 380 L700 440 L790 400 L900 470 L1010 360 L1130 450 L1240 410 L1350 480 L1470 420 L1600 470 V900 H0Z" fill="url(#lejos)"/>
  <path d="M600 380 L640 420 L620 418 L600 400 L585 412 L570 405Z M1010 360 L1050 398 L1028 395 L1010 380 L995 392 L980 388Z M360 430 L392 458 L372 456 L360 446 L346 452Z" fill="#e9d6c4" opacity=".55"/>
  <g class="niebla"><rect x="-200" y="500" width="2000" height="120" fill="url(#bruma)"/></g>
  <path d="M0 640 C150 590 260 560 420 590 C560 615 650 540 820 560 C980 580 1060 520 1220 545 C1380 570 1480 600 1600 580 V900 H0Z" fill="url(#medio)"/>
  <g class="niebla" style="animation-duration:52s"><rect x="-200" y="600" width="2000" height="90" fill="url(#bruma)"/></g>
  <path d="M0 740 C200 700 380 690 560 720 C760 752 900 700 1100 712 C1300 724 1460 760 1600 740 V900 H0Z" fill="url(#prado)"/>
  ${rebano}
  <path d="M0 800 C260 780 520 790 800 806 C1080 822 1340 800 1600 790 V900 H0Z" fill="url(#suelo)"/>
</svg>`;
};
