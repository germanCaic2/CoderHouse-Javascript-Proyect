//valida los datos del formulario
const formValue = () => {
   if (formName.value != "" && formEmail.value != "" && formMsg.value != "") {
      return true
   } else {
      return false
   }
}

// array que filtra las arts disponibles 
function artForSale() {
   let artForSale = collection.filter(art => art.disponibility == true)
   clearCard()
   addCard(artForSale)
}

//filtrado por keypress
function artsFilter() {
   inputFilter.value = inputFilter.value.trim().toUpperCase()
   if (inputFilter.value !== "") {
      const filter = collection.filter(art => art.name.toUpperCase().includes(inputFilter.value))
      if (filter.length === 0) {
         clearCard()
         addCard(collection)
      } else {
         clearCard()
         addCard(filter)
      }
   } else {
      clearCard()
      addCard(collection)
   }
}

//asignacion de items al localStorage
function saveData() {
   localStorage.setItem("name", formName.value)
   localStorage.setItem("email", formEmail.value)
   localStorage.setItem("msg", formMsg.value)
}

//Recupera datos del localStorage
function fetchData() {
   formName.value = localStorage.getItem("name")
   formEmail.value = localStorage.getItem("email")
   formMsg.value = localStorage.getItem("msg")
}

//Evento de botones de compra
function eventButtom() {
   collection.forEach(art => {
      if (art.disponibility == true) {
         const btn = document.querySelector(`#btn${art.id}`)
         btn.addEventListener("click", () => {
            const swalWithBootstrapButtons = Swal.mixin({
               customClass: {
                  confirmButton: 'btn btn-success',
                  cancelButton: 'btn btn-danger'
               },
               buttonsStyling: false
            })

            swalWithBootstrapButtons.fire({
               title: 'Are you sure?',
               text: "to add to cart",
               icon: 'success',
               showCancelButton: true,
               confirmButtonText: 'Yes, buy now!',
               cancelButtonText: 'No, cancel',
               reverseButtons: true
            }).then((result) => {

               if (result.isConfirmed) {
                  swalWithBootstrapButtons.fire(
                     'Added to cart',
                     'Lets good',
                     'success'
                  )
                  addToCart(`${art.id}`)
               } else if (
                  /* Read more about handling dismissals below */
                  result.dismiss === Swal.DismissReason.cancel
               ) {
                  swalWithBootstrapButtons.fire(
                     'Cancelled',
                     'In other moment',
                     'error'
                  )
               }
            })
         })
      }
   })
}

//push de elementos al cart
function addToCart(id) {
   const artToCart = collection.find(art => art.id == id)
   console.log("add to cart")
   cart.push(artToCart)
   localStorage.setItem("cart", JSON.stringify(cart))
   artDisable(id)
}

//recupera los datos del carritos
const fetchCart = () => { localStorage.getItem("cart") ? cart = JSON.parse(localStorage.getItem("cart")) : console.log("cart is empty") }
fetchCart()

//sweetalert para  subir las card
function UploadNewArt() {
   Swal.fire({
      title: 'Upload new Art',
      html: `<form class="">
                    <div class="form-group">
                        <label for="exampleFormControlInput1">Art Name</label>
                        <input type="text" class="form-control " id="artName" placeholder="Art" tabindex="1"
                            value="gato">
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlInput1">Autor</label>
                        <input type="text" class="form-control" id="artAutor" placeholder="Autor name" tabindex="2"
                            value="German Caicedo">
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlInput1">Owner</label>
                        <input type="text" class="form-control" id="artOwner" placeholder="Owner name" tabindex="3"
                            value="Pablo gutierrez">
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlInput1">Price</label>
                        <input type="text" class="form-control" id="artPrice" placeholder="" tabindex="4" value="123">
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlSelect1"></label>
                        <select class="form-control" id="artDisponibility">
                            <option value="true">Enable</option>
                            <option value="false">Disable</option>
                        </select>
                    </div>
                    
                </form>`,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Upload Art',
   }).then((result) => {
      if (result.isConfirmed) {
         newArt()
         Swal.fire(
            'New Art',
            'Your Art has been upload',
            'success'
         )
         addCard(collection)
         document.addEventListener("DOMContentLoaded", eventButtom())
    document.addEventListener("DOMContentLoaded", btnEnable())
      }
   })

}

//boton para habilitar las arts desactivadas
function btnEnable() {
   collection.forEach(art => {
      if (art.disponibility == false) {
         const btn = document.querySelector(`#btnEnable${art.id}`)
         btn.addEventListener("click", () => {
            artEnable(`${art.id}`)
            enable(`${art.id}`)
         })
      }
   })
}

//habilita las arts desactivadas
function artEnable(id) {
   const artEnable = collection.find(art => art.id == id)
   artEnable.disponibility == false ? artEnable.disponibility = true : console.warn("Art enable")
   console.log("enable")
   clearCard()
   addCard(collection)
}

//habilita las arts desactivadas
function artDisable(id) {
   const artDisable = collection.find(art => art.id == id)
   artDisable.disponibility == true ? artDisable.disponibility = false : console.warn("Art Disable")
   console.log("Art Disable")
   clearCard()
   addCard(collection)
}
