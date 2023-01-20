const cardContainer = document.getElementById("cardContainer")
const btnContact = document.querySelector("#btnContact")
const inputs = document.querySelectorAll("input")
const btnShow = document.querySelector("#btnShow")
const btnUp = document.querySelector("#btnUp")
const msgContact = document.querySelector("#msgContact")
const btnDisponibility = document.querySelector("#btnDisponibility")
const inputFilter = document.querySelector("#inputFilter")
const formName = document.querySelector("#formName")
const formEmail = document.querySelector("#formEmail")
const formMsg = document.querySelector("#formMsg")

// envia informacion del formulario
btnContact.addEventListener("click", () => {
   if (formValue() == true) {
      Swal.fire(
         'The message was sent',
         'thank you :D',
         'success'
      )
      saveData()
      event.preventDefault()
   } else
      Swal.fire(
         'sorry',
         'fill in all the fields D:',
         'error'
      )
   event.preventDefault();

})

// Agrega clases a los inputs de la seccion contacto
inputs.forEach(input => {
   input.addEventListener("focus", () => input.className = "form-control border-input")
   input.addEventListener("blur", () => input.className = "form-control")
})

//Boton que agrega las cards 
btnShow.addEventListener("click", () => {
   clearCard()
   addCard(collection)
})

//boton que sube cards
btnUp.addEventListener("click", () => UploadNewArt())

//boton que filtra por disponibilidad
btnDisponibility.addEventListener("click", () => artForSale())

//filtro por nombre
inputFilter.addEventListener("input", () => artsFilter())

