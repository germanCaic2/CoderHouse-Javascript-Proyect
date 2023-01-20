// Crea una ID numerica aleatorio
const newID = () => parseInt(Math.random() * 1000000)

// constructor con metodos
class art {
   constructor(id, name, autor, owner, disponibility, price) {
      this.id = id
      this.name = name
      this.autor = autor
      this.owner = owner
      this.disponibility = disponibility
      this.price = price
   }
   enable() {
      this.disponibility == false ? this.disponibility = true : console.warn("Art enable")
   }
   disable() {
      this.disponibility == true ? this.disponibility = false : console.warn("Art disable")
   }
}

// hardcodeo de objetos
let art1 = new art(newID(), "Rockefeller", "German Caicedo", "Lorena Suarez", false, 250)
let art2 = new art(newID(), "Demon-motherfucker", "Deimer Diaz", "Robin acosta", true, 333)
let art3 = new art(newID(), "eggflower", "German Caicedo", "", true, 255)
let art4 = new art(newID(), "Carnage", "Deimer Diaz", "", false, 230)
let art5 = new art(newID(), "padrinos", "Deimer Diaz", "Leider", false, 220)
let art6 = new art(newID(), "Lorito", "Deimer Diaz", "", true, 190)
let art7 = new art(newID(), "rose-uwu", "Deimer Diaz", "Rose", false, 230)
let art8 = new art(newID(), "material", "German Caicedo", "", true, 500)

const collection = []  // Array de arts{}

let cart = []   // Array de carrito
cart.length === 0 && console.log("Cart is empty")

// metodo push para subir objetos al array collection
collection.push(art1, art2, art3, art4, art5, art6, art7, art8)

// Permite crear un new art ingresando valores
function newArt() {
   let newId = newID()
   let newName = document.getElementById("artName").value
   let newAutor = document.getElementById("artAutor").value
   let newOwner = document.getElementById("artOwner").value
   let newDisponibility = document.getElementById("artDisponibility").value
   let newPrice = document.getElementById("artPrice").value
   let createdArt = new art(newId, newName, newAutor, newOwner, newDisponibility, newPrice)
   collection.push(createdArt)
   clearCard()
}

// agrega las card art
function addCard(array) {
   let card = ""
   array.forEach(art => {

      forSale = ""
      if (art.disponibility == true) {
         forSale = `<span class="text-green">for sale<span>`
         button = `btn btn-success item animation`
         text = `Buy now`
         textColor = `text-green`
         disable = ``
         enable = ``
      } else {
         button = `btn-noSale`
         text = `No sale`
         textColor = `text-red`
         disable = `disable`
         enable = `<button type="submit" id="btnEnable${art.id}" class="btn btn-success item animation mt-2">enable</button>`
      }

      card = `<div class="col-lg-3 text-center scale py-4 ">
                    <img src="./source/img/${art.name}.jpg" class="card-img img-fluid">
                    <h4 class="text-light">${art.name} </h4>
                    <p class="text-muted mb-0">autor: ${art.autor}</p>
                    <p class="text-muted mb-0">owner: ${art.owner} ${forSale}</p>
                    <p class="${textColor} mb-0">Price: ${art.price} </p>
                    <button type="submit" id="btn${art.id}" class="btn ${button} mt-2" ${disable}> ${text}</button>
                    ${enable}
                    </div>`

      cardContainer.innerHTML += card
   })
   document.addEventListener("DOMContentLoaded", eventButtom())
   document.addEventListener("DOMContentLoaded", btnEnable())
}

//Limpia cardContainer
const clearCard = () => {
   clear = ""
   cardContainer.innerHTML = clear
}