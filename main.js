// Code Header || Footer

// Code Header 
let headerHtml = ` <header>
    <div class="container">
    <nav>
        <a href="index.html" class="logo">نَفَس</a>
        <ul id="main-menu">
        <li><a href="index.html">الرئيسية</a></li>
        <li><a href="about.html">عن العطور</a></li>
        <li><a href="visit.html">زيارتنا</a></li>
        </ul>
        <button
        class="menu-toggle"
        aria-label="القائمة"
        aria-expanded="false"
        aria-controls="main-menu"
        >
            <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            >
            <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
        </button>
        </nav>
    </div>
    </header>`;

// Code Footer
let footerHtml = `<footer>
    <div class="container">
    <div class="copy">نَفَس © 2026</div>
    <div class="adderss">المعرض: العنوان وساعات العمل هنا</div>
    </div>
        </footer>`;



// Inter To Body 
document.getElementById("site-header").innerHTML = headerHtml;
document.getElementById("site-footer").innerHTML = footerHtml;

// Class Active

let pageName = location.pathname.split("/").pop() || "index.html"

document.querySelectorAll("#main-menu a").forEach (function (link) {
    if (link.getAttribute("href") === pageName) {
        link.classList.add("active")
        link.setAttribute("aria-current", "page")
    }  
})

// ===================================================
const menuBtn = document.querySelector(".menu-toggle");
const navList = document.querySelector("header nav ul");

function closeMenu() {
  navList.classList.remove("open");
  menuBtn.setAttribute("aria-expanded", "false");
}

if (menuBtn && navList) {
  menuBtn.addEventListener("click", function () {
    const isOpen = navList.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", isOpen);
  });

  navList.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth >= 992) {
      closeMenu();
    }
  });
}

const filterLinks = document.querySelectorAll(".shop .navbar ul li a");
const products = document.querySelectorAll(".shop .content .box");

function filterProducts(category) {
  products.forEach(function (product) {
    const matches = category === "all" || product.dataset.category === category;

    if (matches) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });
}

filterLinks.forEach(function (link) {
  link.addEventListener("click", function (event) {
    event.preventDefault();

    filterLinks.forEach(function (item) {
      item.classList.remove("active");
    });
    link.classList.add("active");

    filterProducts(link.dataset.filter);
  });
});

const families = {
  wood: "خشبي",
  floral: "زهري",
  fresh: "منعش",
};

const dialog = document.createElement("dialog");
dialog.className = "product-dialog";
document.body.appendChild(dialog);

function openProduct(box) {
  const img = box.querySelector("img");
  const name = box.querySelector("h3").textContent;

  function info(key) {
    return box.dataset[key] || "-";
  }

  dialog.innerHTML = `
    <div class="product-dialog__inner">
    <div class="product-dialog__image">
        <img src="${img.getAttribute("src")}" alt="${img.alt}">
    </div>
    <div class="product-dialog__body">
        <button class="product-dialog__close" aria-label="إغلاق">&times;</button>
        <h3>${name}</h3>
        <p class="product-dialog__family">عائلة ${families[box.dataset.category] || "-"}</p>
        <dl>
        <dt>المقدمة</dt><dd>${info("top")}</dd>
        <dt>القلب</dt><dd>${info("heart")}</dd>
        <dt>القاعدة</dt><dd>${info("base")}</dd>
        <dt>الحجم</dt><dd>${info("size")}</dd>
        </dl>
    </div>
    </div>
`;

  dialog.showModal();
}

products.forEach(function (box) {
  box.setAttribute("tabindex", "0");
  box.setAttribute("role", "button");

  box.addEventListener("click", function () {
    openProduct(box);
  });

  box.addEventListener("keydown", function (event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProduct(box);
    }
  });
});

dialog.addEventListener("click", function (event) {
  const clickedClose = event.target.closest(".product-dialog__close");
  const clickedBackdrop = event.target === dialog;

  if (clickedClose || clickedBackdrop) {
    dialog.close();
  }
});
