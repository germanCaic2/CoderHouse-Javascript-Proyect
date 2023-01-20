const URL = "../bbdd/arts.json"
let arte = []
let contentHTML = ""

const uploadContent = async () => {
   try {
      const response = await fetch(URL)
      const data = await response.json()
      arte = data
      arte.forEach(element => {
         collection.push(element)

      });
   } catch (error) {
      console.log("Tu base de datos esta rota.")
   } finally {
      console.log("The fetch was complete")
   }
}

uploadContent()