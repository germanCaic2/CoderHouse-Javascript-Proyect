let cart = JSON.parse(localStorage.getItem("cart"))

//Genera los datos del carrito haciendo un fetch al localStorage
function fetchCart() {
   let card = document.querySelector("#cartContainer")
   cart.forEach(art => {
      let cardCart = `<div class="col-lg-12 d-flex justify-content-between align-items-center py-2">
                           <div class="col-lg-2">
                              <img src="../source/img/${art.name}.jpg" class="w-100">
                           </div>
                           <div class="col-lg-4">
                              <h4 class="text-light">${art.name}</h4>
                           </div>
                           <div class="col-lg-4">
                              <h4 class="text-light">Price: $ ${art.price} </h4>
                           </div>
                           <div class="col-lg-2">
                              <buttom id="btnDelete${art.id}" class="btn btn-danger text-light"><ion-icon name="trash-outline"></ion-icon></buttom>
                           </div>
                     </div>`
      card.innerHTML += cardCart
   })
   document.addEventListener("DOMContentLoaded", deleteButtom())
   document.addEventListener("DOMContentLoaded", totalPrice())
   document.addEventListener("DOMContentLoaded", btnBuyAll())
}
fetchCart()

//muestra el precio total de las arts
function totalPrice() {
   let total = document.querySelector("#total")
   let totalPric = 0
   cart.forEach(art => {
      totalPric += art.price
   })
   let totalCart = `<div class="col-lg-12 d-flex justify-content-around align-items-center py-2">
                        <h4 class="text-light"> TOTAL: ${totalPric}</h4>
                     <button id="btnBuy" class="btn btn-success justify-content-end item animation m-3">Buy All</button>`
   total.innerHTML = totalCart

}

// Cart empty 
function cartEmpty(){
      let totalCart = `<div class="col-lg-12 d-flex justify-content-around align-items-center py-2">
                        <h4 class="text-light"> The cart is empty. You can add arts to buy it.</h4>
                     </div>`
      total.innerHTML = totalCart
}

//borra elementos del localStorage
const clearLocalStorage = () => localStorage.clear()

//borra elementos del cart
const clearCart = () => {
   clear = ""
   cartContainer.innerHTML = clear
}

//boton que borra elementos del cart
const btnDeleteAll = document.querySelector("#btnDeleteAll")
btnDeleteAll.addEventListener("click", () => {
   clearLocalStorage()
   clearCart()
})

//boton de finalizar compra
function btnBuyAll() {
   const btnBuy = document.querySelector("#btnBuy")
   btnBuy.addEventListener("click", () => {
      const swalWithBootstrapButtons = Swal.mixin({
         customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
         },
         buttonsStyling: false
      })

      swalWithBootstrapButtons.fire({
         title: 'Are you sure?',
         text: "Continue whit the buy",
         icon: 'info',
         showCancelButton: true,
         confirmButtonText: 'Yes, buy it!',
         cancelButtonText: 'No, cancel!',
         reverseButtons: true
      }).then((result) => {
         if (result.isConfirmed) {
            swalWithBootstrapButtons.fire(
               'bought! 😍',
               'Your arts has been bought',
               'success'
            )
            clearLocalStorage()
            clearCart()
            cartEmpty()
         } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
         ) {
            swalWithBootstrapButtons.fire(
               'Cancelled',
               'ok, you can buy it later:)',
               'error'
            )
         }
      })
   })

}
//Boton de borrar
function deleteButtom() {
   cart.forEach(art => {
      const btnDelete = document.querySelector(`#btnDelete${art.id}`)
      btnDelete.addEventListener("click", () => deleteToCart(`${art.id}`))
   })
}

//Borra cart
function deleteToCart(id) {
   deleteIt = cart.find(art => art.id == id)
   let n = cart.indexOf(deleteIt)
   cart.splice(n, 1)
   console.table(cart)
   clearCart()
   fetchCart()
   clearLocalStorage()
   localStorage.setItem("cart", JSON.stringify(cart))
}