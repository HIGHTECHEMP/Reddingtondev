const typingElement = document.querySelector(".typing");

if (typingElement) {
  const text = "Web Designer & Developer";
  let index = 0;
  let isDeleting = false;

  function typingLoop() {
    if (!isDeleting) {
      typingElement.textContent = text.substring(0, index + 1);
      index++;

      if (index === text.length) {
        setTimeout(() => isDeleting = true, 2000); // pause after typing
      }
    } else {
      typingElement.textContent = text.substring(0, index - 1);
      index--;

      if (index === 0) {
        isDeleting = false;
      }
    }

    setTimeout(typingLoop, isDeleting ? 50 : 100);
  }

  typingLoop();
}

/* ===============================
   HOMEPAGE SCROLL REVEAL (.reveal)
================================ */
function revealOnScroll() {
  document.querySelectorAll(".reveal").forEach(el => {
    const top = el.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (top < windowHeight - 100) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);


/* ===============================
   PORTFOLIO SCROLL REVEAL (.reveal2)
================================ */
function revealPortfolio() {
  document.querySelectorAll(".reveal2").forEach(el => {
    const top = el.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (top < windowHeight - 100) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealPortfolio);
window.addEventListener("load", revealPortfolio);