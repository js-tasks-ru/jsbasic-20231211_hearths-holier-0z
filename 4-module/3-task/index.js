function highlight(table) {
  let tableRow = table.querySelectorAll('tr');

  for (let row of tableRow) {
    let status = row.lastElementChild;
    let gender = status.previousElementSibling;
    let age = gender.previousElementSibling;

    if (status.dataset.available === "true") {
      row.classList.add("available");
    } else if (status.dataset.available === "false") {
      row.classList.add("unavailable");
    }
    (status.dataset.available) ?? (row.hidden = true);

    if(gender.textContent === "m") {
      row.classList.add("male");
    } else if (gender.textContent === "f") {
      row.classList.add("female");
    }

    if(age.textContent < 18) {
      row.style.textDecoration = "line-through";
    }
  }
}
