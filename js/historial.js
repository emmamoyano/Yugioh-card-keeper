let indexedHistorial = []

if (indexedDB){
    let db
    const request = indexedDB.open('tasksList', 1)
    request.onsuccess = () => {
        db = request.result
        console.log('OPEN', db)
       readDataVendidas()
      }

      request.onerror = (error) => {
        console.log('Error', error)
      }

      const readDataVendidas = () => {
        const transaction = db.transaction(['vendidas'],'readonly')
        const objectStore = transaction.objectStore('vendidas')
        const request = objectStore.openCursor()
        request.onsuccess = (e) => {
          const cursor = e.target.result
          if (cursor) {
            // Crea un nuevo objeto a partir del elemento del array cursor.value y le asigna el valor de cursor.key como un atributo
            const obj = { ...cursor.value[0], key: cursor.key };
            // sitio: cursor.value.sitio
            indexedHistorial.push(obj);  // Añade el nuevo objeto al array indexedArquetipo
            cursor.continue();
          }

        showHistorial(indexedHistorial)
      }
    }
    let borro = document.getElementsByClassName('borrarTable');
      function showHistorial(array){
          let htmlcontenttoAppend = ""
          for(i = 0; i < array.length; i++){

          htmlcontenttoAppend +=`
        <tr>
        <th scope="row">${i + 1}</th>
        <td class="tdTabla"><img class="cartasYugiTable" src="${array[i].card_images[0].image_url}"></td>
        <td>${array[i].name}</td>
        <td>${array[i].card_sets[0].set_rarity}</td>
        <td>${array[i].card_sets[0].set_code}</td>
        <td>${array[i].card_sets[0].set_name}</td>
        <td>${array[i].sitioAnterior}</td>
        <td><button type="button" class="borrarTable btn btn-danger" data-key="${array[i].key}" >Eliminar carta</button></td>
        </tr>

        <div class="modal fade modalImg" tabindex="-1" role="dialog" aria-labelledby="modalImgLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content bg-dark">
              <div class="modal-body">
                <img class="img-fluid">
              </div>
             
                <button type="button" class="btn btn-secondary close" data-dismiss="modal">Cerrar</button>
             
            </div>
          </div>
        </div>
        `
          }
          // <div class="modal-footer">
          // </div>
          document.getElementById('myBody').innerHTML = htmlcontenttoAppend
          let imgs = document.getElementsByClassName('cartasYugiTable');
for (let i = 0; i < imgs.length; i++) {
    imgs[i].addEventListener('click', function() {
      document.getElementsByClassName("modalImg")[0].classList.remove("d-none");
        document.getElementsByClassName("modalImg")[0].classList.add("d-block", "show");
        document.getElementsByClassName('img-fluid')[0].src=this.src;
    });
}
let closeButton = document.getElementsByClassName("close")[0];
closeButton.addEventListener('click', function() {
  document.getElementsByClassName("modalImg")[0].classList.remove("d-block", "show");
  document.getElementsByClassName("modalImg")[0].classList.add("d-none");
});
          for (let i=0; i< indexedHistorial.length; i++){
              borro[i].addEventListener('click',()=>{
                  eliminar(i);
              })
        }
    }
  
    const deleteKeyHistorial = (key) => {
      console.log(`La clave recibida es: ${key}`)
      // Abre una transacción en modo "readwrite" sobre la object store "tasks"
      const transaction = db.transaction(["vendidas"], "readwrite");
      const objectStore = transaction.objectStore("vendidas");
      // Elimina la clave especificada de la object store
      const request = objectStore.get(key);
      request.onsuccess = () => {
        // Verifica si existe el valor asociado a la clave
        if (request.result) {
          // Elimina la clave de la object store
          objectStore.delete(key);
          request.onsuccess = () => {
            document.querySelector('.alert-success').innerHTML = `La clave ${key} se ha eliminado correctamente`;
          };
          } else {
          console.error(`La clave ${key} no existe en la object store`);
          }
        };
      };
      
      function deleteHistorial(e) {
        // if (currentState !== 'arquetipo') return;
        
        if (e.target.classList.contains("borrarTable")) {
            const key = Number(e.target.dataset.key);
            deleteKeyHistorial(key);
            const updatedIndexedHistorial = indexedHistorial.filter((item) => item.key !== key);
            indexedHistorial = updatedIndexedHistorial;
        }
      }
      function eliminar(posicion){
            
            indexedHistorial.splice(posicion,1);
            showHistorial(indexedHistorial);
        } 
  }


    function filtradorNombre(array) {
        let busqueda = document.getElementById('buscadorNombreTabla').value;
        let resultados = array.filter(function(elem) {
        return elem.name.toLowerCase().includes(busqueda.toLowerCase());
        });
         showHistorial(resultados);
      }

      function filtradorCodigo(array) {
        let busqueda = document.getElementById('buscadorCodigoTabla').value.toLowerCase()
        let listaNueva = array.filter(card => card.card_sets && card.card_sets.some(set => set.set_code.toLowerCase().includes(busqueda)))
         showHistorial(listaNueva);
      }

      function filtradorRareza(array) {
        let busqueda = document.getElementById('buscadorRarezaTabla').value.toLowerCase();
        let listaNueva = array.filter(card => card.card_sets && card.card_sets.some(set => set.set_rarity.toLowerCase().includes(busqueda)));
         showHistorial(listaNueva);
      }


    document.addEventListener("DOMContentLoaded", function(e){

    document.getElementById('buscadorNombreTabla').addEventListener('input', ()=>{
        filtradorNombre(indexedHistorial)
    })
    document.getElementById('buscadorCodigoTabla').addEventListener('input', ()=>{
        filtradorCodigo(indexedHistorial)
    })
    document.getElementById('buscadorRarezaTabla').addEventListener('input', ()=>{
        filtradorRareza(indexedHistorial)
    })
    document.getElementById("contenedor3").addEventListener("click", deleteHistorial);
  })

