// Cabecera y pie comunes de Casa Manjavacas.
// Uso: <header data-cabecera="publica|ganadero"></header> y <footer data-pie></footer> en cada página.
(function () {
  const pagina = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  const LOGO = `<svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="18.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 15c3 4 7 5 12 5s9-1 12-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M10 29l6-8 4 4 4-6 6 10z" fill="currentColor"/></svg>`;
  const MENUS = {
    publica: {
      clase: "cab-oscura",
      sub: "",
      enlaces: [["la-carne.html", "La carne"], ["club.html", "Club"], ["restaurantes.html", "Restaurantes"], ["ficha.html?id=CM-001", "Trazabilidad"]],
      cta: ["inversores.html", "Inversores"]
    },
    ganadero: {
      clase: "cab-clara",
      sub: "Área del ganadero",
      enlaces: [["panel.html", "Panel"], ["registrar.html", "Registrar"], ["etiquetas.html", "Etiquetas"], ["precios.html", "Precios"]],
      cta: ["index.html", "Ver la web"]
    },
    inversores: {
      clase: "cab-clara",
      sub: "Sala de inversores",
      enlaces: [["#promotor", "Promotor"], ["#negocio", "Negocio"], ["#simulador", "Simulador"], ["#mercado", "Mercado"], ["#riesgos", "Riesgos"], ["#ruta", "Hoja de ruta"]],
      cta: ["Casa_Manjavacas_Dossier_Inversores.pdf", "Descargar dossier"]
    }
  };
  const esActivo = href => href.split("?")[0].toLowerCase() === pagina;

  document.querySelectorAll("header[data-cabecera]").forEach(h => {
    const m = MENUS[h.dataset.cabecera] || MENUS.publica;
    h.className = "cabecera " + m.clase;
    h.innerHTML = `<div class="cab-in">
      <a class="cab-logo" href="index.html" aria-label="Casa Manjavacas, inicio">${LOGO}<span>Casa Manjavacas${m.sub ? `<small>${m.sub}</small>` : ""}</span></a>
      <button class="cab-menu" type="button" aria-expanded="false" aria-controls="cab-nav"><span></span><span></span><span></span><b>Menú</b></button>
      <nav id="cab-nav" aria-label="Principal">
        ${m.enlaces.map(([href, t]) => `<a href="${href}"${esActivo(href) ? ' aria-current="page"' : ""}>${t}</a>`).join("")}
        <a class="cab-cta" href="${m.cta[0]}"${esActivo(m.cta[0]) ? ' aria-current="page"' : ""}>${m.cta[1]}</a>
      </nav>
    </div>`;
    const b = h.querySelector(".cab-menu");
    b.addEventListener("click", () => {
      const abierto = h.classList.toggle("abierta");
      b.setAttribute("aria-expanded", abierto ? "true" : "false");
    });
    h.querySelectorAll("nav a").forEach(a => a.addEventListener("click", () => { h.classList.remove("abierta"); b.setAttribute("aria-expanded", "false"); }));
    addEventListener("keydown", e => { if (e.key === "Escape") { h.classList.remove("abierta"); b.setAttribute("aria-expanded", "false"); } });
    addEventListener("scroll", () => h.classList.toggle("con-sombra", scrollY > 8), { passive: true });
  });

  // Aparición suave de las secciones
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll(".revela").forEach(el => io.observe(el));
  } else document.querySelectorAll(".revela").forEach(el => el.classList.add("visible"));

  document.querySelectorAll("footer[data-pie]").forEach(f => {
    const nota = f.dataset.nota || "Proyecto en desarrollo. Los animales y fechas de la web son ejemplos.";
    f.className = "pie-web";
    f.innerHTML = `<div class="pie-in">
      <div class="pie-marca">
        <a class="cab-logo" href="index.html">${LOGO}<span>Casa Manjavacas</span></a>
        <p>Buey de ceba extensiva de raza Rubia Gallega, criado unos cinco años en la Montaña Palentina y madurado en seco.</p>
      </div>
      <div class="pie-col"><h4>La casa</h4><a href="la-carne.html">La carne</a><a href="ficha.html?id=CM-001">Trazabilidad</a><a href="club.html">Club de fundadores</a><a href="restaurantes.html">Para restaurantes</a></div>
      <div class="pie-col"><h4>El proyecto</h4><a href="inversores.html">Sala de inversores</a><a href="presentacion.html">Presentación</a><a href="Casa_Manjavacas_Dossier_Inversores.pdf">Dossier en PDF</a><a href="panel.html">Área del ganadero</a></div>
    </div>
    <div class="pie-legal"><span>© ${new Date().getFullYear()} Casa Manjavacas · Montaña Palentina</span><span>${nota}</span></div>`;
  });
})();
