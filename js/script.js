document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = themeToggle.querySelector("i");
  const year = document.getElementById("year");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectItems = document.querySelectorAll(".project-item");
  const form = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  year.textContent = new Date().getFullYear();

  const savedTheme = localStorage.getItem("portfolio-theme");
  if (savedTheme === "light") {
    body.classList.add("light-mode");
    themeIcon.className = "bi bi-sun-fill";
  }

  themeToggle.addEventListener("click", () => {
    body.classList.toggle("light-mode");
    const isLight = body.classList.contains("light-mode");
    localStorage.setItem("portfolio-theme", isLight ? "light" : "dark");
    themeIcon.className = isLight ? "bi bi-sun-fill" : "bi bi-moon-stars-fill";
  });

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
      const filter = button.dataset.filter;

      projectItems.forEach(item => {
        const matches = filter === "all" || item.dataset.category === filter;
        item.classList.toggle("is-hidden", !matches);
      });
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    formStatus.textContent = "";
    formStatus.className = "form-status mt-3";

    if (!form.checkValidity()) {
      event.stopPropagation();
      form.classList.add("was-validated");
      formStatus.textContent = "Please correct the highlighted fields.";
      formStatus.classList.add("text-warning");
      return;
    }

    form.classList.remove("was-validated");
    formStatus.textContent = "Message validated successfully. This portfolio form is client-side only and does not send email.";
    formStatus.classList.add("text-success");
    form.reset();
  });

  // Close the mobile navbar after selecting a section.
  document.querySelectorAll(".navbar .nav-link").forEach(link => {
    link.addEventListener("click", () => {
      const menu = document.getElementById("mainNav");
      if (menu.classList.contains("show")) {
        bootstrap.Collapse.getOrCreateInstance(menu).hide();
      }
    });
  });
});
