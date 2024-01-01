function toggleText() {
  const btn = document.querySelector(".toggle-text-button");
  const text =  document.querySelector("#text");

  btn.addEventListener("click", (event) => {
    (text.hidden === false) ? text.hidden = true : text.hidden = false;
  })
}
