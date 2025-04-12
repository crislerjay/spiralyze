function logSubmit(event) {
  log.textContent = `Form Submitted! Timestamp: ${event.timeStamp}`;
  event.preventDefault();
}

const form = document.querySelector(".form")
form.addEventListener("submit", logSubmit);



// const errorField = document.querySelector("#errorField input");
// errorField.addEventListener("blur", () => {
//   const parent = errorField.parentElement;
//   if (errorField.value.trim() === "") {
//     parent.classList.add("error");
//   } else {
//     parent.classList.remove("error");
//   }
// });