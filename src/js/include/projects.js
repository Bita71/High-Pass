let rowsAndProjects = [];

function createRowsProjects(rowsCount = 2) {
  rowsAndProjects = [];
  const allProjects = document.querySelectorAll(".projects-works-item");

  if (window.screen.width <= 460) {
    let firstIndex = 0;
    let lastIndex = rowsCount;

    while (true) {
      if (lastIndex > allProjects.length) break;

      let row = [];

      for (let i = firstIndex; i < lastIndex; i++) {
        row.push(allProjects[i]);
      }

      rowsAndProjects.push(row);
      firstIndex += rowsCount;
      lastIndex += rowsCount;
    }

    return;
  }

  const gridProjects = document.querySelector(".projects-works");
  const pageSize =
    (parseInt($(gridProjects).css("grid-auto-rows").split(" ")[0]) +
      parseInt($(gridProjects).css("gap"))) *
    rowsCount;

  allProjects.forEach((item) => item.classList.remove("close"));

  let rowPosition = 0;

  while (true) {
    let row = [];

    let interval = {
      min: $(gridProjects).offset().top + rowPosition,
      max: $(gridProjects).offset().top + pageSize + rowPosition,
    };
    allProjects.forEach((item) => {
      if (
        $(item).offset().top >= interval.min &&
        $(item).offset().top < interval.max
      ) {
        row.push(item);
      }
    });

    if (!row.length) break;

    rowsAndProjects.push(row);
    rowPosition += pageSize;
  }
}

function createPagesButtons(pagesCount) {
  const btnPagesList = document.querySelector(".projects-pages");
  btnPagesList.innerHTML = "";

  for (let i = 1; i <= pagesCount; i++) {
    let item = document.createElement("li");
    item.classList.add("projects-pages-item");

    let btn = document.createElement("button");
    btn.classList.add("projects-pages-item-btn");

    btn.textContent = i;
    btn.setAttribute("type", "button");

    btn.addEventListener("click", () => {
      openPage(btn.textContent);
      toggleActiveBtn(btn.textContent);
    });

    btn.addEventListener("mousedown", () =>
      btnPagesList.classList.add("mousedown")
    );

    window.addEventListener("mouseup", () =>
      btnPagesList.classList.remove("mousedown")
    );

    item.append(btn);
    btnPagesList.append(item);
  }
}

function toggleActiveBtn(activePage = 1) {
  document.querySelectorAll(".projects-pages-item-btn").forEach((btn) => {
    btn.classList.remove("active");
    btn.disabled = false;

    if (btn.textContent == activePage) {
      btn.classList.add("active");
      btn.disabled = true;
    }
  });
}

function openPage(activePage = 1) {
  const allProjects = document.querySelectorAll(".projects-works-item");
  allProjects.forEach((item) => item.classList.add("close"));

  rowsAndProjects[activePage - 1].forEach((item) => {
    item.classList.remove("close");
  });
}

function countOfRows() {
  let screenWidth = window.screen.width;

  if (screenWidth <= 460) return 7;
  else if (screenWidth <= 900) return 4;
  else if (screenWidth <= 1200) return 3;

  return 2;
}

function createProjectsList() {
  createRowsProjects(countOfRows());
  createPagesButtons(rowsAndProjects.length);
  openPage();
  toggleActiveBtn();
}

window.addEventListener("resize", () => createProjectsList());
createProjectsList();
