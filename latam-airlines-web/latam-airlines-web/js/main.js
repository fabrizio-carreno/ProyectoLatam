// Navegación móvil y pequeñas interacciones del sitio de demostración.
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-nav");
if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const opened = navigation.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(opened));
  });
  navigation.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  }));
}

// Animaciones al entrar en pantalla.
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add("visible"));
}

// El buscador es solo una demostración: valida campos y muestra el resumen.
const flightForm = document.querySelector("#flightForm");
if (flightForm) {
  const date = document.querySelector("#departure");
  if (date) date.min = new Date().toISOString().split("T")[0];
  flightForm.addEventListener("submit", event => {
    event.preventDefault();
    const origin = document.querySelector("#origin").value;
    const destination = document.querySelector("#destination").value;
    const departure = date.value;
    const passengers = document.querySelector("#passengers").value;
    const message = document.querySelector("#formMessage");
    if (origin === destination) {
      message.textContent = "Elige ciudades diferentes para continuar.";
      return;
    }
    message.textContent = `Búsqueda de demostración: ${origin} → ${destination}, salida ${departure}, ${passengers}. No se ha realizado ninguna reserva.`;
  });
}

// Formulario de contacto local: no envía ni almacena datos.
const contactForm = document.querySelector("#contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", event => {
    event.preventDefault();
    document.querySelector("#contactMessage").textContent =
      "¡Formulario probado correctamente! Esta demostración no envió ni guardó tus datos.";
    contactForm.reset();
  });
}
