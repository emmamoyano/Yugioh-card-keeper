const darkmagician = "https://db.ygoprodeck.com/api/v7/cardinfo.php?name=Dark%20Magician"
const allCards = "https://db.ygoprodeck.com/api/v7/cardinfo.php"
const end = ".json"
let cartitas = []
let segundaCopiaArray = []
let cartasPorId = []
let indexedCaja = []
let indexedCarpeta = []
let indexedSets = []
let indexedArquetipo = []
let indexedvendidas2 = []
let borrar = document.getElementsByName('borrar');
let arrayParaFiltrar = []
let pruebaArray = []


if (indexedDB){
    let db
    const request = indexedDB.open('tasksList', 1)
  
    request.onsuccess = () => {
      db = request.result
      console.log('OPEN', db)
      readDataCaja()
      readDataCarpeta()
      readDataSets()
      readDataArquetipo()
      readDatavendidas()
      
    }
    request.onerror = (error) => {
      console.log('Error', error)
    }
    const readDataCaja = () => {
      const transaction = db.transaction(['caja'],'readonly')
      const objectStore = transaction.objectStore('caja')
      const request = objectStore.openCursor()
      request.onsuccess = (e) => {
        const cursor = e.target.result
        if (cursor) {
          // Crea un nuevo objeto a partir del elemento del array cursor.value y le asigna el valor de cursor.key como un atributo
          const obj = { ...cursor.value[0], key: cursor.key, sitio: 'caja' };
          indexedCaja.push(obj);  // Añade el nuevo objeto al array indexedArquetipo
          cursor.continue();
        }
      }
    }
    const readDataCarpeta = () => {
      const transaction = db.transaction(['carpeta'],'readonly');
      const objectStore = transaction.objectStore('carpeta');
      const request = objectStore.openCursor(); 
      request.onsuccess = (e) => {
        const cursor = e.target.result;
        if (cursor) {
          // Crea un nuevo objeto a partir del elemento del array cursor.value y le asigna el valor de cursor.key como un atributo
          const obj = { ...cursor.value[0], key: cursor.key, sitio: 'carpeta' };
          indexedCarpeta.push(obj);  // Añade el nuevo objeto al array indexedArquetipo
          cursor.continue();
        }
      }
  };  
      const readDataSets = () => {
        const transaction = db.transaction(['sets'],'readonly')
        const objectStore = transaction.objectStore('sets')
        const request = objectStore.openCursor()
        request.onsuccess = (e) => {
          const cursor = e.target.result
          if (cursor) {
            // Crea un nuevo objeto a partir del elemento del array cursor.value y le asigna el valor de cursor.key como un atributo
            const obj = { ...cursor.value[0], key: cursor.key, sitio: 'sets' };
            indexedSets.push(obj);  // Añade el nuevo objeto al array indexedArquetipo
            cursor.continue();
          }
        }
      }
      //es casi perfecto, necesito que key quede adentro de los arrays de cursor.value
      // const readDataArquetipo = () => {
      //   const transaction = db.transaction(['arquetipo'],'readonly')
      //   const objectStore = transaction.objectStore('arquetipo')
      //   const request = objectStore.openCursor()
      //   request.onsuccess = (e) => {
      //     const cursor = e.target.result
      //     if (cursor) {
      //       // Crea un nuevo objeto a partir de cursor.value y le asigna el valor de cursor.key como un atributo
      //       const obj = { ...cursor.value, key: cursor.key };
      //       indexedArquetipo.push(obj);  // Añade el nuevo objeto al array indexedArquetipo
      //       cursor.continue();
      //     }
      //   }
      // }
      const readDataArquetipo = () => {
        const transaction = db.transaction(['arquetipo'],'readonly')
        const objectStore = transaction.objectStore('arquetipo')
        const request = objectStore.openCursor()
        request.onsuccess = (e) => {
          const cursor = e.target.result
          if (cursor) {
            // Crea un nuevo objeto a partir del elemento del array cursor.value y le asigna el valor de cursor.key como un atributo
            const obj = { ...cursor.value[0], key: cursor.key, sitio: 'arquetipo' };
              indexedArquetipo.push(obj);  // Añade el nuevo objeto al array indexedArquetipo
              cursor.continue();
          }
        }
      }
      const readDatavendidas = () => {
        const transaction = db.transaction(['vendidas'],'readonly')
        const objectStore = transaction.objectStore('vendidas')
        const request = objectStore.openCursor()
        request.onsuccess = (e) => {
          const cursor = e.target.result
          if (cursor) {
            const newObj = { ...cursor.value[0], sitio: 'vendidas', sitioAnterior: cursor.value[0].sitioAnterior};
            cursor.value[0] = newObj;
            // Crea un nuevo objeto a partir del elemento del array cursor.value y le asigna el valor de cursor.key como un atributo
            // const obj = { ...cursor.value[0], key: cursor.key, sitio: 'vendidas', sitioAnterior: cursor.value.sitioAnterior};
            const obj = { ...cursor.value[0], key: cursor.key}
            indexedvendidas2.push(obj);  // Añade el nuevo objeto al array indexedArquetipo
            cursor.continue();
          }
        }
      }
const deleteKeyCaja = (key) => {
  console.log(`La clave recibida es: ${key}`)
  // Abre una transacción en modo "readwrite" sobre la object store "tasks"
  const transaction = db.transaction(["caja"], "readwrite");
  const objectStore = transaction.objectStore("caja");
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
const deleteKeyCarpeta = (key) => {
  console.log(`La clave recibida es: ${key}`)
  // Abre una transacción en modo "readwrite" sobre la object store "tasks"
  const transaction = db.transaction(["carpeta"], "readwrite");
  const objectStore = transaction.objectStore("carpeta");

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
const deleteKeySets = (key) => {
  console.log(`La clave recibida es: ${key}`)
  // Abre una transacción en modo "readwrite" sobre la object store "tasks"
  const transaction = db.transaction(["sets"], "readwrite");
  const objectStore = transaction.objectStore("sets");

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
const deleteKeyArquetipo = (key) => {
  console.log(`La clave recibida es: ${key}`)
  // Abre una transacción en modo "readwrite" sobre la object store "tasks"
  const transaction = db.transaction(["arquetipo"], "readwrite");
  const objectStore = transaction.objectStore("arquetipo");

  // Elimina la clave especificada de la object store
  const request = objectStore.get(key);
  request.onsuccess = () => {
    // Verifica si existe el valor asociado a la clave
    if (request.result) {
      // Elimina la clave de la object store
      objectStore.delete(key);
      request.onsuccess = () => {
        console.log('exito')
      }
      } else {
      console.error(`La clave ${key} no existe en la object store`);
      }
    };
  };
  const addDatavendidas = (data) => {
    const transaction = db.transaction(['vendidas'],'readwrite')
    const objectStore = transaction.objectStore('vendidas')
    const request = objectStore.add(data)
  }
  function handleFile() {
    let file = document.getElementById("file-input").files[0];
    let reader = new FileReader();
    reader.onload = function(e) {
      let data = new Uint8Array(e.target.result);
      let workbook = XLSX.read(data, {type: "array"});
      let firstSheetName = workbook.SheetNames[0];
      let worksheet = workbook.Sheets[firstSheetName];
      let array = XLSX.utils.sheet_to_json(worksheet);
      
      array.forEach(element => {
        // element.card_images = JSON.parse(element.card_images);
        element.card_sets = JSON.parse(element.card_sets);
      });
      console.log(array);
      pruebaArray = [...array]
    };
    reader.readAsArrayBuffer(file);
  }
  
  function cambiarDatos(){
    pruebaArray.forEach((element) => {
      let id = element.id;
      let card = segundaCopiaArray.filter(card => card.id === id)[0];
      let temp = Object.assign({}, element);
      Object.assign(element, card);
      element.card_sets = temp.card_sets;
  });
  }

  function clearObjectStores() {
    let objectStores = ["caja", "carpeta", "sets", "arquetipo", "vendidas"];
    objectStores.forEach((store) => {
      let objectStore = db.transaction(store, "readwrite").objectStore(store);
      objectStore.clear();
    });
  }
  // function reemplazarDatos(){
  //   clearObjectStores()
  //   pruebaArray.forEach((element) => {
  //     let objectStore = db.transaction(element.sitio, "readwrite").objectStore(element.sitio);
  //     let request = objectStore.put(element);
  //     request.onsuccess = function() {
  //       console.log("Elemento reemplazado en la object store " + element.sitio);
  //     };
  //     request.onerror = function() {
  //       console.error("Error al reemplazar el elemento en la object store " + element.sitio);
  //     };
  //   });
  // }
  function reemplazarDatos() {
    // console.log(pruebaArray)
    clearObjectStores();
    pruebaArray.forEach((element) => {
      if (element.sitioAnterior === "undefined") {
        delete element.sitioAnterior;
      }
      let newArray = [element];
      let objectStore = db.transaction(element.sitio, "readwrite").objectStore(element.sitio);
      let request = objectStore.put(newArray);
      request.onsuccess = function() {
        console.log("Elemento reemplazado en la object store " + element.sitio);
        console.log(newArray)
      };
      request.onerror = function() {
        console.error("Error al reemplazar el elemento en la object store " + element.sitio);
      };
    });
  }
// esta es la funcion showCards que anda
//   function showCards(array){
//     let htmlcontenttoAppend = ""
//     // let añadir = ""
//     for(i = 0; i < array.length; i++){
//       htmlcontenttoAppend += `
//       <tr>
//         <th scope="row">${i + 1}</th>
//         <td class="tdTabla"><img class="cartasYugiTable" src="${array[i].card_images[0].image_url}"></td>
//         <td>${array[i].name}</td>
//         <td>${array[i].card_sets[0].set_rarity}</td>
//         <td>${array[i].card_sets[0].set_code}</td>
//         <td>${array[i].card_sets[0].set_name}</td>
//         <td><button type="button" class="botonPrueba3 btn btn-warning" data-key="${array[i].key}" name="borrar">Vender carta</button></td>
        
//         </tr>

//         <div class="modal fade modalImg" tabindex="-1" role="dialog" aria-labelledby="modalImgLabel" aria-hidden="true">
//           <div class="modal-dialog">
//             <div class="modal-content bg-dark">
//               <div class="modal-body">
//                 <img class="img-fluid">
//               </div>
              
//                 <button type="button" class="btn btn-secondary close" data-dismiss="modal">Cerrar</button>
              
//             </div>
//           </div>
//         </div>
//         `
//         // <p onclick="${cartasGuardadas.push(array[i])}"> </p>
//         // ${setId(array[i].name)}
//       }
      
//       document.getElementById('myBodyAlmacen').innerHTML = htmlcontenttoAppend;
//       let imgs = document.getElementsByClassName('cartasYugiTable');
// for (let i = 0; i < imgs.length; i++) {
//     imgs[i].addEventListener('click', function() {
//       document.getElementsByClassName("modalImg")[0].classList.remove("d-none");
//         document.getElementsByClassName("modalImg")[0].classList.add("d-block", "show");
//         document.getElementsByClassName('img-fluid')[0].src=this.src;
//     });
// }
// let closeButton = document.getElementsByClassName("close")[0];
// closeButton.addEventListener('click', function() {
//   document.getElementsByClassName("modalImg")[0].classList.remove("d-block", "show");
//   document.getElementsByClassName("modalImg")[0].classList.add("d-none");
// });
//               let borro = document.getElementsByClassName('botonPrueba3');
//               for (let i=0; i< array.length; i++){
//                   borro[i].addEventListener('click',()=>{
//                     eliminar(array[i]);
//                   })
//                 }
// } 

//este showCards se fija en card_name para hacer el contador, necesito que se fije en set_Rarity y set_code
// function showCards(array) {
//   let htmlcontenttoAppend = "";
//   let cardMap = {};
//   for (let i = 0; i < array.length; i++) {
//     let card = array[i];
//     if (!cardMap[card.name]) {
//       cardMap[card.name] = {
//         card: card,
//         count: 1
//       };
//     } else {
//       cardMap[card.name].count++;
//     }
//   }

//   for (let cardName in cardMap) {
//     let cardData = cardMap[cardName];
//     htmlcontenttoAppend += `
//       <tr>
//         <th scope="row">${cardData.count}</th>
//         <td class="tdTabla"><img class="cartasYugiTable" src="${cardData.card.card_images[0].image_url}"></td>
//         <td>${cardData.card.name}</td>
//         <td>${cardData.card.card_sets[0].set_rarity}</td>
//         <td>${cardData.card.card_sets[0].set_code}</td>
//         <td>${cardData.card.card_sets[0].set_name}</td>
//         <td><button type="button" class="botonPrueba3 btn btn-warning" data-key="${cardData.card.key}" name="borrar">Vender carta</button></td>
//       </tr>
//       <div class="modal fade modalImg" tabindex="-1" role="dialog" aria-labelledby="modalImgLabel" aria-hidden="true">
//         <div class="modal-dialog">
//           <div class="modal-content bg-dark">
//             <div class="modal-body">
//               <img class="img-fluid">
//             </div>
//             <button type="button" class="btn btn-secondary close" data-dismiss="modal">Cerrar</button>
//           </div>
//         </div>
//       </div>
//     `;
//   }

//   document.getElementById('myBodyAlmacen').innerHTML = htmlcontenttoAppend;
//   let imgs = document.getElementsByClassName('cartasYugiTable');
//   for (let i = 0; i < imgs.length; i++) {
//     imgs[i].addEventListener('click', function() {
//       document.getElementsByClassName("modalImg")[0].classList.remove("d-none");
//       document.getElementsByClassName("modalImg")[0].classList.add("d-block", "show");
//       document.getElementsByClassName('img-fluid')[0].src = this.src;
//     });
//   }
//   let closeButton = document.getElementsByClassName("close")[0];
// closeButton.addEventListener('click', function() {
//   document.getElementsByClassName("modalImg")[0].classList.remove("d-block", "show");
//   document.getElementsByClassName("modalImg")[0].classList.add("d-none");
// });
//               let borro = document.getElementsByClassName('botonPrueba3');
//               for (let i=0; i< array.length; i++){
//                   borro[i].addEventListener('click',()=>{
//                     eliminar(array[i]);
//                   })
//                 }
// }
function showCards(array){
  let htmlcontenttoAppend = "";
let uniqueCards = [];

for (const card of array) {
  let cardIsUnique = true;
  for (const uniqueCard of uniqueCards) {
    if (
      card.card_sets[0].set_rarity === uniqueCard.card_sets[0].set_rarity &&
      card.card_sets[0].set_code === uniqueCard.card_sets[0].set_code
    ) {
      uniqueCard.count++;
      uniqueCard.keys.push(card.key);
      cardIsUnique = false;
      break;
    }
  }
  if (cardIsUnique) {
    uniqueCards.push({ ...card, count: 1, keys: [card.key] });
  }
}

for (const uniqueCard of uniqueCards) {
  htmlcontenttoAppend += `
  <tr>
    <th scope="row">${uniqueCard.count}</th>
    <td class="tdTabla"><img class="cartasYugiTable" src="${
      uniqueCard.card_images[0].image_url
    }"></td>
    <td>${uniqueCard.name}</td>
    <td>${uniqueCard.card_sets[0].set_rarity}</td>
    <td>${uniqueCard.card_sets[0].set_code}</td>
    <td>${uniqueCard.card_sets[0].set_name}</td>
    <td><button type="button" class="botonPrueba3 btn btn-warning" data-keys='${JSON.stringify(
      uniqueCard.keys
    )}' name="borrar">Vender carta</button></td>
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
  `;
}
document.getElementById("myBodyAlmacen").innerHTML = htmlcontenttoAppend;
let imgs = document.getElementsByClassName('cartasYugiTable');
  for (let i = 0; i < imgs.length; i++) {
    imgs[i].addEventListener('click', function() {
      document.getElementsByClassName("modalImg")[0].classList.remove("d-none");
      document.getElementsByClassName("modalImg")[0].classList.add("d-block", "show");
      document.getElementsByClassName('img-fluid')[0].src = this.src;
    });
  }
  let closeButton = document.getElementsByClassName("close")[0];
closeButton.addEventListener('click', function() {
  document.getElementsByClassName("modalImg")[0].classList.remove("d-block", "show");
  document.getElementsByClassName("modalImg")[0].classList.add("d-none");
});
}
      
  //   function showCardsTodas(array){
  //             let htmlcontenttoAppend = ""
  //             // let añadir = ""
  //             for(i = 0; i < array.length; i++){
  //               htmlcontenttoAppend += `
  //               <tr>
  //                 <th scope="row">${i + 1}</th>
  //                 <td class="tdTabla"><img class="cartasYugiTable" src="${array[i].card_images[0].image_url}"></td>
  //                 <td>${array[i].name}</td>
  //                 <td>${array[i].card_sets[0].set_rarity}</td>
  //                 <td>${array[i].card_sets[0].set_code}</td>
  //                 <td>${array[i].card_sets[0].set_name}</td>
  //                 <td>${array[i].sitio}</td>
                  
  //                 </tr>
          
  //                 <div class="modal fade modalImg" tabindex="-1" role="dialog" aria-labelledby="modalImgLabel" aria-hidden="true">
  //                   <div class="modal-dialog">
  //                     <div class="modal-content bg-dark">
  //                       <div class="modal-body">
  //                         <img class="img-fluid">
  //                       </div>
                       
  //                         <button type="button" class="btn btn-secondary close" data-dismiss="modal">Cerrar</button>
                       
  //                     </div>
  //                   </div>
  //                 </div>
  //                 `
  //                 // <p onclick="${cartasGuardadas.push(array[i])}"> </p>
  //                 // ${setId(array[i].name)}
  //               }
                
  //               document.getElementById('myBodyAlmacen').innerHTML = htmlcontenttoAppend;
  //               let imgs = document.getElementsByClassName('cartasYugiTable');
  //         for (let i = 0; i < imgs.length; i++) {
  //             imgs[i].addEventListener('click', function() {
  //               document.getElementsByClassName("modalImg")[0].classList.remove("d-none");
  //                 document.getElementsByClassName("modalImg")[0].classList.add("d-block", "show");
  //                 document.getElementsByClassName('img-fluid')[0].src=this.src;
  //             });
  //         }
  //         let closeButton = document.getElementsByClassName("close")[0];
  //         closeButton.addEventListener('click', function() {
  //           document.getElementsByClassName("modalImg")[0].classList.remove("d-block", "show");
  //           document.getElementsByClassName("modalImg")[0].classList.add("d-none");
  //         });
  //  } 
  function showCardsTodas(array){
    let htmlcontenttoAppend = ""
    let uniqueCards = [];

    for (const card of array) {
        let cardIsUnique = true;
        for (const uniqueCard of uniqueCards) {
            if (card.card_sets[0].set_rarity === uniqueCard.card_sets[0].set_rarity && card.card_sets[0].set_code === uniqueCard.card_sets[0].set_code && card.sitio === uniqueCard.sitio) {
                uniqueCard.count++;
                cardIsUnique = false;
                break;
            }
        }
        if (cardIsUnique) {
            uniqueCards.push({...card, count: 1});
        }
    }

    for (const uniqueCard of uniqueCards) {
        htmlcontenttoAppend += `
        <tr>
          <th scope="row">${uniqueCard.count}</th>
          <td class="tdTabla"><img class="cartasYugiTable" src="${uniqueCard.card_images[0].image_url}"></td>
          <td>${uniqueCard.name}</td>
          <td>${uniqueCard.card_sets[0].set_rarity}</td>
          <td>${uniqueCard.card_sets[0].set_code}</td>
          <td>${uniqueCard.card_sets[0].set_name}</td>
          <td>${uniqueCard.sitio}</td>
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
        `;
    }

    document.getElementById('myBodyAlmacen').innerHTML = htmlcontenttoAppend;
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
}
            let currentState;


  document.getElementById('botonTodas').addEventListener('click', () => {
              $("div").remove(".borrar");
              if (currentState !== 'todas'){
                currentState = 'todas'
              }
              document.getElementById('theadGuardados').hidden = false
              document.getElementById('tablaBorrarTexto').innerHTML = "Sitio"
              getTodas()
              // showCards(arrayParaFiltrar)
            });

document.getElementById('botonArquetipo').addEventListener('click', () => {
    $("div").remove(".borrar");
    document.getElementById('theadGuardados').hidden = false
    document.getElementById('tablaBorrarTexto').innerHTML = "Borrar"
    arrayParaFiltrar = [].concat.apply([], indexedArquetipo);
    getArquetipo();
    showCards(arrayParaFiltrar)
    if (currentState !== 'arquetipo') {
        currentState = 'arquetipo';
        document.getElementById("contenedor2").removeEventListener("click", deleteCaja);
        document.getElementById("contenedor2").removeEventListener("click", deleteCarpeta);
        document.getElementById("contenedor2").removeEventListener("click", deleteSets);
        document.getElementById("contenedor2").addEventListener("click", deleteArquetipo);
    }
});
document.getElementById('botonCaja').addEventListener('click', () => {
  $("div").remove(".borrar");
  document.getElementById('theadGuardados').hidden = false
  document.getElementById('tablaBorrarTexto').innerHTML = "Borrar"
  arrayParaFiltrar = [].concat.apply([], indexedCaja);
  getCaja();
  showCards(arrayParaFiltrar)
  // datatable2();
  // Verificar si el estado actual es diferente al nuevo estado
  if (currentState !== 'caja') {
      currentState = 'caja';
      // Remover el event listener anterior
      document.getElementById("contenedor2").removeEventListener("click", deleteArquetipo);
      document.getElementById("contenedor2").removeEventListener("click", deleteCarpeta);
      document.getElementById("contenedor2").removeEventListener("click", deleteSets);
      // Agregar un nuevo event listener
      document.getElementById("contenedor2").addEventListener("click", deleteCaja);
  }
});
document.getElementById('botonCarpeta').addEventListener('click', () => {
  $("div").remove(".borrar");
  document.getElementById('theadGuardados').hidden = false
  document.getElementById('tablaBorrarTexto').innerHTML = "Borrar"
  arrayParaFiltrar = [].concat.apply([], indexedCarpeta);
  getCarpeta();
  showCards(arrayParaFiltrar)
  // Verificar si el estado actual es diferente al nuevo estado
  if (currentState !== 'carpeta') {
      currentState = 'carpeta';
      // Remover el event listener anterior
      document.getElementById("contenedor2").removeEventListener("click", deleteArquetipo);
      document.getElementById("contenedor2").removeEventListener("click", deleteCaja);
      document.getElementById("contenedor2").removeEventListener("click", deleteSets);
      // Agregar un nuevo event listener
      document.getElementById("contenedor2").addEventListener("click", deleteCarpeta);
  }
});
document.getElementById('botonSets').addEventListener('click', () => {
  $("div").remove(".borrar");
  document.getElementById('theadGuardados').hidden = false
  document.getElementById('tablaBorrarTexto').innerHTML = "Borrar"
  arrayParaFiltrar = [].concat.apply([], indexedSets);
  getSets();
  showCards(arrayParaFiltrar)
  // Verificar si el estado actual es diferente al nuevo estado
  if (currentState !== 'sets') {
      currentState = 'sets';
      // Remover el event listener anterior
      document.getElementById("contenedor2").removeEventListener("click", deleteArquetipo);
      document.getElementById("contenedor2").removeEventListener("click", deleteCaja);
      document.getElementById("contenedor2").removeEventListener("click", deleteCarpeta);
      // Agregar un nuevo event listener
      document.getElementById("contenedor2").addEventListener("click", deleteSets);
  }
});

document.getElementById('buscadorNombre2').addEventListener('input', ()=>{
  $("div").remove( ".borrar" );
  // if (currentState === "caja" || currentState === "carpeta" || currentState === "sets" || currentState === "arquetipo"){
    buscarNombre(arrayParaFiltrar)
    // datatable2()
  //  }
})
document.getElementById('buscadorDescripcion2').addEventListener('input', ()=>{
      $("div").remove( ".borrar" );
      buscarDescripcion(arrayParaFiltrar)
      // datatable2()
    })
    document.getElementById('abc').addEventListener('click', () =>{
      sortByName(arrayParaFiltrar)
    })
    document.getElementById('zyx').addEventListener('click', () =>{
      sortByNameOpuesto(arrayParaFiltrar)
    })
    document.getElementById('buscadorCodigo2').addEventListener('input', ()=>{
            $("div").remove( ".borrar" );
  
            buscarCodigo(arrayParaFiltrar)
            // datatable2()
        })  

// function deleteArquetipo(e) {
//   if (currentState !== 'arquetipo') return;
//   if (e.target.classList.contains("botonPrueba3")) {
//       const key = Number(e.target.dataset.key);
//       deleteKeyArquetipo(key);
//       const updatedIndexedArquetipo = indexedArquetipo.filter((item) => item.key !== key);
//       indexedArquetipo = updatedIndexedArquetipo;
//   }
// }
function deleteArquetipo(e) {
  if (currentState !== "arquetipo") return;
  if (e.target.classList.contains("botonPrueba3")) {
    const keys = JSON.parse(e.target.dataset.keys);
    for (const key of keys) {
      let keyDeleted = false;
      for (const item of indexedArquetipo) {
        if (item.key === key) {
          const [elementoEliminado] = indexedArquetipo.filter((item) => item.key === key);
          elementoEliminado.sitioAnterior = "arquetipo"
          elementoEliminado.sitio = "vendidas";
addDatavendidas([elementoEliminado]);
indexedvendidas2.push(elementoEliminado);
          deleteKeyArquetipo(key);
          const updatedIndexedArquetipo = indexedArquetipo.filter((item) => item.key !== key);
          indexedArquetipo = updatedIndexedArquetipo;
          showCards(indexedArquetipo)
          keyDeleted = true;
          break;
        }
      }
      if (keyDeleted) {
        break;
      }
    }
  }
}
// function deleteCaja(e) {
//   if (currentState !== 'caja') return;
//   if (e.target.classList.contains("botonPrueba3")) {
//       const key = Number(e.target.dataset.key);
//       deleteKeyCaja(key);
//       const updatedIndexedCaja = indexedCaja.filter((item) => item.key !== key);
//       indexedCaja = updatedIndexedCaja;
//   }
// }
function deleteCaja(e) {
  if (currentState !== "caja") return;
  if (e.target.classList.contains("botonPrueba3")) {
    const keys = JSON.parse(e.target.dataset.keys);
    for (const key of keys) {
      let keyDeleted = false;
      for (const item of indexedCaja) {
        if (item.key === key) {
          const [elementoEliminado] = indexedCaja.filter((item) => item.key === key);
          elementoEliminado.sitioAnterior = "caja"
          elementoEliminado.sitio = "vendidas";
addDatavendidas([elementoEliminado]);
indexedvendidas2.push(elementoEliminado);
          deleteKeyCaja(key);
          const updatedIndexedCaja = indexedCaja.filter((item) => item.key !== key);
          indexedCaja = updatedIndexedCaja;
          showCards(indexedCaja)
          keyDeleted = true;
          break;
        }
      }
      if (keyDeleted) {
        break;
      }
    }
  }
}
// function deleteCarpeta(e) {
//   if (currentState !== 'carpeta') return;
//   if (e.target.classList.contains("botonPrueba3")) {
//       const key = Number(e.target.dataset.key);
//       deleteKeyCarpeta(key);
//       const updatedIndexedCarpeta = indexedCarpeta.filter((item) => item.key !== key);
//       indexedCarpeta = updatedIndexedCarpeta;
//   }
// }
function deleteCarpeta(e) {
  if (currentState !== "carpeta") return;
  if (e.target.classList.contains("botonPrueba3")) {
    const keys = JSON.parse(e.target.dataset.keys);
    for (const key of keys) {
      let keyDeleted = false;
      for (const item of indexedCarpeta) {
        if (item.key === key) {
          const [elementoEliminado] = indexedCarpeta.filter((item) => item.key === key);
          elementoEliminado.sitioAnterior = "carpeta"
          elementoEliminado.sitio = "vendidas";
addDatavendidas([elementoEliminado]);
indexedvendidas2.push(elementoEliminado);
          deleteKeyCarpeta(key);
          const updatedIndexedCarpeta = indexedCarpeta.filter((item) => item.key !== key);
          indexedCarpeta = updatedIndexedCarpeta;
          showCards(indexedCarpeta)
          keyDeleted = true;
          break;
        }
      }
      if (keyDeleted) {
        break;
      }
    }
  }
}
// function deleteSets(e) {
//   if (currentState !== 'sets') return;
//   if (e.target.classList.contains("botonPrueba3")) {
//       const key = Number(e.target.dataset.key);
//       deleteKeySets(key);
//       const updatedIndexedSets = indexedSets.filter((item) => item.key !== key);
//       indexedSets = updatedIndexedSets;
//   }
// }
function deleteSets(e) {
  if (currentState !== "sets") return;
  if (e.target.classList.contains("botonPrueba3")) {
    const keys = JSON.parse(e.target.dataset.keys);
    for (const key of keys) {
      let keyDeleted = false;
      for (const item of indexedSets) {
        if (item.key === key) {
          const [elementoEliminado] = indexedSets.filter((item) => item.key === key);
          elementoEliminado.sitioAnterior = "sets"
          elementoEliminado.sitio = "vendidas";
addDatavendidas([elementoEliminado]);
indexedvendidas2.push(elementoEliminado);
          deleteKeySets(key);
          const updatedIndexedSets = indexedSets.filter((item) => item.key !== key);
          indexedSets = updatedIndexedSets;
          showCards(indexedSets)
          keyDeleted = true;
          break;
        }
      }
      if (keyDeleted) {
        break;
      }
    }
  }
}
function sortByName(array) {
  array.sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();

    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
  if (currentState === "caja" || currentState === "carpeta" || currentState === "sets" || currentState === "arquetipo"){
    showCards(array)
  
  } else if (currentState === "todas") {
    showCardsTodas(array)
  }
}

function sortByNameOpuesto(array) {
  array.sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();

    if (nameA < nameB) {
      return 1;
    }
    if (nameA > nameB) {
      return -1;
    }
    return 0;
  });
  if (currentState === "caja" || currentState === "carpeta" || currentState === "sets" || currentState === "arquetipo"){
    showCards(array)
  
  } else if (currentState === "todas") {
    showCardsTodas(array)
  }
 
} 
function buscarNombre(array){
    let inputvalue = document.getElementById("buscadorNombre2").value;
    let listaNueva = array.filter( carta => { 
  return carta.name.toLowerCase().indexOf(inputvalue.toLowerCase()) > -1 
})
if (currentState === "caja" || currentState === "carpeta" || currentState === "sets" || currentState === "arquetipo"){
  showCards(listaNueva)

} else if (currentState === "todas") {
  showCardsTodas(listaNueva)
}
}
function buscarDescripcion(array){
  let inputvalue = document.getElementById("buscadorDescripcion2").value;
  let listaNueva = array.filter( carta => { 
  return carta.desc.toLowerCase().indexOf(inputvalue.toLowerCase()) > -1; 
      })
      if (currentState === "caja" || currentState === "carpeta" || currentState === "sets" || currentState === "arquetipo"){
        showCards(listaNueva)
      
      } else if (currentState === "todas") {
        showCardsTodas(listaNueva)
      }
      
}

function buscarCodigo(array) {
  let inputvalue = document.getElementById('buscadorCodigo2').value.toLowerCase()
  let listaNueva = array.filter(card => card.card_sets && card.card_sets.some(set => set.set_code.toLowerCase().includes(inputvalue)));
  if (currentState === "caja" || currentState === "carpeta" || currentState === "sets" || currentState === "arquetipo"){
    showCards(listaNueva)
  
  } else if (currentState === "todas") {
    showCardsTodas(listaNueva)
  }
}
  // function datatable2(){
  // $(document).ready(function(){
  //     $('#contenedor2').after('<div class="borrar" id="nav"></div>');
  //     var rowsShown = 10;
  //     var rowsTotal = $('#contenedor2 tbody tr').length;
  //     var numPages = rowsTotal/rowsShown;
  //     for(i = 0;i < numPages;i++) {
  //         var pageNum = i + 1;
          
  //         $('#nav').append('<a href="#" rel="'+i+'">'+pageNum+'</a> ');
  //     }
      
  //     $('#contenedor2 tbody tr').hide();
  //         $('#contenedor2 tbody tr').slice(0, rowsShown).show();
  //         $('#nav a:first').addClass('active');
  //         $('#nav a').bind('click', function(){
              
  //             $('#nav a').removeClass('active');
  //             $(this).addClass('active');
  //             var currPage = $(this).attr('rel');
  //             var startItem = currPage * rowsShown;
  //             var endItem = startItem + rowsShown;
  //             $('#contenedor2 tbody tr').css('opacity','0.0').hide().slice(startItem, endItem).
  //             css('display','table-row').animate({opacity:1}, 300);
  //           });
  //         });
  //       }

  

    //esta es la funcion eliminar que hasta ahora andaba bien, voy a probar cambiar unas cosas
  //   function eliminar(objeto) {
  //     const {sitio} = objeto;
  //     const posicion = arrayParaFiltrar.indexOf(objeto);
  //     const [elementoEliminado] = arrayParaFiltrar.splice(posicion, 1);
  //     elementoEliminado.sitioAnterior = sitio;
  //     addDatavendidas([elementoEliminado]);
  //     elementoEliminado.sitio = "vendidas"
  //     indexedvendidas2.push(elementoEliminado);

  //     showCards(arrayParaFiltrar);
  // }
  //no elimina correctamente
  // function eliminar(objeto) {
  //   const posicion = arrayParaFiltrar.indexOf(objeto);
  //   const [elementoEliminado] = arrayParaFiltrar.splice(posicion, 1);
  //   elementoEliminado.sitioAnterior = objeto.sitio;
  //   addDatavendidas([elementoEliminado]);
  //   elementoEliminado.sitio = "vendidas"
  //   indexedvendidas2.push(elementoEliminado);
  
  //   showCards(arrayParaFiltrar);
  // }
function eliminar(id) {
  const posicion = arrayParaFiltrar.findIndex(objeto => objeto.id === id);
  if (posicion === -1) {
    return; // No se encontró el objeto
  }

  const [elementoEliminado] = arrayParaFiltrar.splice(posicion, 1);
  addDatavendidas([elementoEliminado]);
  indexedvendidas2.push(elementoEliminado);

  showCards(arrayParaFiltrar);
}

      
    function saveFile(blob, filename){
      if (window.navigator.msSaveOrOpenBlob){
        window.navigator.msSaveOrOpenBlob(blob, filename)
      } else {
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        document.body.appendChild(a)
        a.href = url
        a.download = filename
        a.click();
        setTimeout(()=>{
          window.URL.revokeObjectURL(url)
          document.body.removeChild(a);
        }, 0)
      }
    }
    
    //       let csvContent = "Nombre;Codigo;Rareza;Nombre del set;Sitio guardado;Cantidad\n";
    //       let arrayCompleto = [...indexedCaja, ...indexedCarpeta, ...indexedSets, ...indexedArquetipo];
    //       let contador = new Map();
        
    //       function compararElementos(elemento1, elemento2) {
    //         // Aquí debes comparar los campos del elemento que desees
    //         return elemento1.name === elemento2.name && elemento1.card_sets[0].set_code === elemento2.card_sets[0].set_code
    //         && elemento1.card_sets[0].set_rarity === elemento2.card_sets[0].set_rarity && elemento1.sitio === elemento2.sitio ;
    //       }
        
    //       arrayCompleto.forEach((elemento) => {
    //         let elementoKey = JSON.stringify(elemento);
    //         if (!contador.has(elementoKey)) {
    //           contador.set(elementoKey, { elemento: elemento, contador: 0 });
    //         }
    //         contador.get(elementoKey).contador += 1;
    //       });
    //       let arraySinDuplicados = arrayCompleto.filter((elemento, indice, array) => {
    //         return array.findIndex(elem => compararElementos(elem, elemento)) === indice;
    //       });
    
    //       arraySinDuplicados.forEach((carta)=>{
    //           let row = carta.name + ";" + carta.card_sets[0].set_code + ";" + carta.card_sets[0].set_rarity + ";" + carta.card_sets[0].set_name + ";" + carta.sitio + ";" + carta.contador + "\n"
    //           csvContent += row 
    //         })
    // var data = new Blob([csvContent], { type: 'text/csv' });
    // saveFile(data, "text.csv");
    function createCsv(){
      
      let csvContent = "Nombre;Codigo;Rareza;Set;Sitio guardado;Cantidad\n"
      let arrayCompleto = [...indexedCaja, ...indexedCarpeta, ...indexedSets, ...indexedArquetipo, ...indexedvendidas2];
      function compararElementos(elemento1, elemento2) {
          // Aquí debes comparar los campos del elemento que desees
          return elemento1.name === elemento2.name && elemento1.card_sets[0].set_code === elemento2.card_sets[0].set_code
          && elemento1.card_sets[0].set_rarity === elemento2.card_sets[0].set_rarity && elemento1.sitio === elemento2.sitio ;
        }
      arrayCompleto.forEach((elemento) => {
        let elementosIguales = arrayCompleto.filter(elem => compararElementos(elem, elemento));
        elemento.cantidad = elementosIguales.length;
      });
      
      let arraySinDuplicados = arrayCompleto.filter((elemento, indice, array) => {
        return array.findIndex(elem => compararElementos(elem, elemento)) === indice;
      });
      
      arraySinDuplicados.forEach((carta) => {
        let row = carta.name + ";" + carta.card_sets[0].set_code + ";" + carta.card_sets[0].set_rarity + ";" + carta.card_sets[0].set_name + ";" + carta.sitio + ";" + carta.cantidad + "\n"
        csvContent += row;
      });
      var data = new Blob([csvContent], { type: 'text/csv'});
      saveFile(data, "text.csv")
      // let csvContent = "Nombre;Codigo;Rareza;Nombre del set;Sitio guardado;Cantidad\n"
      // let arrayCompleto = [...indexedCaja, ...indexedCarpeta, ...indexedSets, ...indexedArquetipo];
      // function compararElementos(elemento1, elemento2) {
      //   // Aquí debes comparar los campos del elemento que desees
      //   return elemento1.name === elemento2.name && elemento1.card_sets[0].set_code === elemento2.card_sets[0].set_code
      //   && elemento1.card_sets[0].set_rarity === elemento2.card_sets[0].set_rarity && elemento1.sitio === elemento2.sitio ;
      // }

      // let arraySinDuplicados = arrayCompleto.filter((elemento, indice, array) => {
      //   return array.findIndex(elem => compararElementos(elem, elemento)) === indice;
      // });


      // arraySinDuplicados.forEach((carta)=>{
      //   let row = carta.name + ";" + carta.card_sets[0].set_code + ";" + carta.card_sets[0].set_rarity + ";" + carta.card_sets[0].set_name + ";" + carta.sitio + "\n"
      //   csvContent += row 
      // })
      // var data = new Blob([csvContent], { type: 'text/csv'});
      // saveFile(data, "text.csv")
    }
    function recuperarExcel(){
      
      let csvContent = "card_sets;id;key;name;sitio;sitioAnterior\n"
let arrayCompleto = [...indexedCaja, ...indexedCarpeta, ...indexedSets, ...indexedArquetipo, ...indexedvendidas2];

arrayCompleto.forEach((carta) => {
  let card_sets_json = JSON.stringify(carta.card_sets);
  // let card_images_json = JSON.stringify(carta.card_images);
  let row =  card_sets_json + ";" + carta.id + ";" + carta.key + ";" + carta.name + ";" + carta.sitio + ";" + carta.sitioAnterior + "\n"
  csvContent += row;
});
      var data = new Blob([csvContent], { type: 'text/csv'});
      saveFile(data, "recuperar.csv")
    }
    document.getElementById('descargarExcel').addEventListener('click', () => {
      createCsv();
      recuperarExcel();
        });
  }

  // let csvContent = "archetype;atk;attribute;card_images;card_prices;card_sets;def;desc;frameType;id;key;level;name;race;sitio;type\n"
  // arrayCompleto.forEach((carta) => {
  //   let row = carta.archetype + ";" + carta.atk + ";" + carta.attribute + ";" + carta.card_images[0] + ";" + carta.card_prices[0] + ";" + carta.card_sets[0] + ";" + carta.def + ";" + carta.desc + ";" + carta.frameType + ";" + carta.id + carta.key + ";" + carta.level + ";" + carta.name + ";" + carta.race + ";" + carta.sitio + ";" + carta.type + "\n"
  //   csvContent += row;
  // });
  function getTodas(){
    let arrayTodas = [...indexedCaja, ...indexedCarpeta, ...indexedSets, ...indexedArquetipo]
    arrayParaFiltrar = arrayTodas
    console.log(arrayTodas)
    showCardsTodas(arrayParaFiltrar)
  }
      
    function getCaja(){
      let datosCaja = [].concat.apply([], indexedCaja);
      console.log(datosCaja);
      
      showCards(datosCaja)
    }
    function getCarpeta(){
      let datosCarpeta = [].concat.apply([], indexedCarpeta);
    console.log(datosCarpeta);

    showCards(datosCarpeta)
}
function getSets(){
    let datosSets = [].concat.apply([], indexedSets);
    console.log(datosSets);
    showCards(datosSets)
}
function getArquetipo(){
  let datosArquetipo = [].concat.apply([], indexedArquetipo);
  console.log(datosArquetipo);
  showCards(datosArquetipo)
}

// function sortByName(array) {
//     array.sort((a, b) => {
//       const nameA = a.name.toLowerCase();
//       const nameB = b.name.toLowerCase();
  
//       if (nameA < nameB) {
//         return -1;
//       }
//       if (nameA > nameB) {
//         return 1;
//       }
//       return 0;
//     });
//     showCards(array)
//   }

//   function sortByNameOpuesto(array) {
//     array.sort((a, b) => {
//       const nameA = a.name.toLowerCase();
//       const nameB = b.name.toLowerCase();
  
//       if (nameA < nameB) {
//         return 1;
//       }
//       if (nameA > nameB) {
//         return -1;
//       }
//       return 0;
//     });
//     showCards(array)
//   } 
// function buscarNombre(array){
//       let inputvalue = document.getElementById("buscadorNombre2").value;
//       let listaNueva = array.filter( carta => { 
//     return carta.name.toLowerCase().indexOf(inputvalue.toLowerCase()) > -1 
//   })
//   if (currentState === "caja" || currentState === "carpeta" || currentState === "sets" || currentState === "arquetipo"){
//     showCards(listaNueva)

//   } else {
//     showCardsTodas(listaNueva)
//   }
// }
// function buscarDescripcion(array){
//     let inputvalue = document.getElementById("buscadorDescripcion2").value;
//     let listaNueva = array.filter( carta => { 
//     return carta.desc.toLowerCase().indexOf(inputvalue.toLowerCase()) > -1; 
//         })
        
//         showCards(listaNueva)
// }

// function buscarCodigo(array) {
//     let inputvalue = document.getElementById('buscadorCodigo2').value.toLowerCase()
//     let listaNueva = array.filter(card => card.card_sets && card.card_sets.some(set => set.set_code.toLowerCase().includes(inputvalue)));
//     showCards(listaNueva)
// }



document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(allCards).then(function(resultObj){
        if (resultObj.status === "ok"){
            allCartas = resultObj.data
            segundaCopiaArray = allCartas.data
        }
    })
    document.getElementById('file-input').addEventListener('change', ()=>{
      handleFile()
    })
    document.getElementById('actualizarDatos').addEventListener('click', ()=>{
      if (document.getElementById('file-input').files.length > 0) {
        handleFile()
        cambiarDatos()
        reemplazarDatos()
        // location.reload()
        alert('Datos actualizados. Importante: Presione "ACEPTAR" y luego reinicia la pagina (sin usar F5), hasta que desaparezca el nombre del archivo cargado. Si no lo haces en ese orden, los archivos quedan mal guardados.')
      } else {
        alert('Debe cargar un archivo');
      }
    })
    document.getElementById("buscadorNombre2").addEventListener("focus", function() {
      this.select();
    });
    document.getElementById("buscadorDescripcion2").addEventListener("focus", function() {
      this.select();
    });
    document.getElementById("buscadorCodigo2").addEventListener("focus", function() {
      this.select();
    });
    // document.getElementById('descargarExcel').addEventListener('click', () => {
    //   location.reload();
    //   createCsv();
    //   recuperarExcel();
    //     });

    
    // document.getElementById('buscadorNombre2').addEventListener('input', ()=>{
      //     $("div").remove( ".borrar" );
    //     if (currentState === "caja" || currentState === "carpeta" || currentState === "sets" || currentState === "arquetipo"){
    //       buscarNombre(arrayParaFiltrar)
    //       // datatable2()
    //      }
    // })
    // document.getElementById('buscadorDescripcion2').addEventListener('input', ()=>{
    //         $("div").remove( ".borrar" );
    //         buscarDescripcion(arrayParaFiltrar)
    //         // datatable2()
    //       })
    //       document.getElementById('abc').addEventListener('click', () =>{
    //         sortByName(arrayParaFiltrar)
    //       })
    //       document.getElementById('zyx').addEventListener('click', () =>{
    //         sortByNameOpuesto(arrayParaFiltrar)
    //       })
    //       document.getElementById('buscadorCodigo2').addEventListener('input', ()=>{
    //               $("div").remove( ".borrar" );
        
    //               buscarCodigo(arrayParaFiltrar)
    //               // datatable2()
    //           })  
        })

        
        // `
        // <tr class="borrar1">
        // <td class="prueba" >
        // <div class="card mb-3" style="max-width: 50%; max-height: 10%">
        // <div class="row no-gutters">
        // <div class="col-md-4">
        // <img class="cartasYugi2" src="${array[i].card_images[0].image_url}">
        // </div>
        // <div class="col-md-8">
        // <div class="card-body">
        // <h4 class="card-title">${array[i].name}</h4>
        // <p class="card-text">${array[i].desc}</p>
        // <p class="card-text">${array[i].card_sets[0].set_rarity}</p>
        //           <p class="card-text">${array[i].card_sets[0].set_code}</p>
        //           <p class="card-text">${array[i].card_sets[0].set_name}</p>
        //           <button type="button" class="botonPrueba3 btn btn-danger" data-key="${array[i].key}" name="borrar">Carta vendida</button>
        //           <div class="alert-success"></div>
        //           </div>
        //           </div>
        //           </div>
        //           </div>
        //           </td>
        //           </tr>
        //           `

// function datatable2(){
//     $(document).ready(function(){
        
//         $('#contenedor2').after('<div class="borrar" id="nav"></div>');
//         var rowsShown = 10;
//         var rowsTotal = $('#contenedor2 tbody tr').length;
//         var numPages = rowsTotal/rowsShown;
//         for(i = 0;i < numPages;i++) {
//             var pageNum = i + 1;
            
//             $('#nav').append('<a href="#" rel="'+i+'">'+pageNum+'</a> ');
//         }
        
//         $('#contenedor2 tbody tr').hide();
//             $('#contenedor2 tbody tr').slice(0, rowsShown).show();
//             $('#nav a:first').addClass('active');
//             $('#nav a').bind('click', function(){
                
//                 $('#nav a').removeClass('active');
//                 $(this).addClass('active');
//                 var currPage = $(this).attr('rel');
//                 var startItem = currPage * rowsShown;
//                 var endItem = startItem + rowsShown;
//                 $('#contenedor2 tbody tr').css('opacity','0.0').hide().slice(startItem, endItem).
//                 css('display','table-row').animate({opacity:1}, 300);
//             });
//             var table = $('#contenedor2').DataTable();
//         });
// }

// document.getElementById('botonArquetipo').addEventListener('click', ()=>{
      //   $("div").remove( ".borrar" );
      //   arrayParaFiltrar = [].concat.apply([], indexedArquetipo)
      //   getArquetipo()
      //   datatable2()
      //   const boton4 = document.querySelector('.botonPrueba3');
      //   if (boton4 !== null) {
      //     document.getElementById('comodin').value = 1
      //     document.getElementById("contenedor2").addEventListener("click", (e) => {
      //       if (e.target.classList.contains("botonPrueba3")) {
      //         const key = Number(e.target.dataset.key);
      //         deleteKeyArquetipo(key);
      //         const updatedIndexedArquetipo = indexedArquetipo.filter((item) => item.key !== key);
      //         indexedArquetipo = updatedIndexedArquetipo;
      //       }
      //     });
      //   }
      // })
      // document.getElementById('botonCaja').addEventListener('click', ()=>{
      //  $("div").remove( ".borrar" );
      //  arrayParaFiltrar = [].concat.apply([], indexedCaja)
      //  getCaja()
      //  datatable2()
      //  const boton4 = document.querySelector('.botonPrueba3');
      //   if (boton4 !== null) {
      //     document.getElementById("contenedor2").addEventListener("click", (e) => {
      //       if (e.target.classList.contains("botonPrueba3")) {
      //         const key = Number(e.target.dataset.key);
      //         deleteKeyCaja(key);
      //         const updatedIndexedCaja = indexedCaja.filter((item) => item.key !== key);
      //         indexedCaja = updatedIndexedCaja;
      //       }
      //     });
      //   }
      // })
      // document.getElementById('botonCarpeta').addEventListener('click', ()=>{
      //  $("div").remove( ".borrar" );
      //  // arrayParaFiltrar.length = 0
      //  document.getElementById('comodin').value = 2
      //  console.log(document.getElementById('comodin').value)
      //  arrayParaFiltrar = [].concat.apply([], indexedCarpeta)
      //  getCarpeta()
      //  datatable2()
      //  const boton4 = document.querySelector('.botonPrueba3');
      //   if (boton4 !== null && document.getElementById('comodin').value === "2") {
      //     document.getElementById("contenedor2").addEventListener("click", (e) => {
      //       if (e.target.classList.contains("botonPrueba3")) {
      //         const key = Number(e.target.dataset.key);
      //         deleteKeyCarpeta(key);
      //         const updatedIndexedCarpeta = indexedCarpeta.filter((item) => item.key !== key);
      //         indexedCarpeta = updatedIndexedCarpeta;
      //       }
      //     });
      //   }
      // })
      // document.getElementById('botonSets').addEventListener('click', ()=>{
      //  $("div").remove( ".borrar" );
      //  document.getElementById('comodin').value = 3
      //  console.log(document.getElementById('comodin').value)
      //  arrayParaFiltrar = [].concat.apply([], indexedSets)
      //  getSets()
      //  datatable2()
      //  const boton4 = document.querySelector('.botonPrueba3');
      //   if (boton4 !== null && document.getElementById('comodin').value === "3") {
      //     document.getElementById("contenedor2").addEventListener("click", (e) => {
      //       if (e.target.classList.contains("botonPrueba3")) {
      //         const key = Number(e.target.dataset.key);
      //         deleteKeySets(key);
      //         const updatedIndexedSets = indexedSets.filter((item) => item.key !== key);
      //         indexedSets = updatedIndexedSets;
      //       }
      //     });
      //   }
      // })