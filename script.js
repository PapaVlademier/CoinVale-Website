const serverIp = "play.coinvale.net";

document.documentElement.classList.add("js-ready");

const navToggle = document.querySelector("[data-nav-toggle]");
const navPanel = document.querySelector("[data-nav-panel]");

if (navToggle && navPanel) {
  navToggle.addEventListener("click", () => {
    const isOpen = navPanel.dataset.open === "true";
    navPanel.dataset.open = String(!isOpen);
    navToggle.setAttribute("aria-expanded", String(!isOpen));
  });

  navPanel.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navPanel.dataset.open = "false";
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      navPanel.dataset.open = "false";
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    const helper = document.createElement("textarea");
    helper.value = text;
    helper.setAttribute("readonly", "");
    helper.style.position = "fixed";
    helper.style.opacity = "0";
    document.body.appendChild(helper);
    helper.select();

    let copied = false;

    try {
      copied = document.execCommand("copy");
    } catch (fallbackError) {
      copied = false;
    }

    helper.remove();
    return copied;
  }
}

document.querySelectorAll("[data-copy-ip]").forEach((button) => {
  button.dataset.defaultLabel = button.textContent.trim();

  button.addEventListener("click", async () => {
    const copied = await copyText(serverIp);
    button.textContent = copied ? "Copied: play.coinvale.net" : "Copy failed";

    window.setTimeout(() => {
      button.textContent = button.dataset.defaultLabel;
    }, 2200);
  });
});

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && revealItems.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
