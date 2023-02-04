const darkmagician = "https://db.ygoprodeck.com/api/v7/cardinfo.php?name=Dark%20Magician"
const allCards = "https://db.ygoprodeck.com/api/v7/cardinfo.php"
const end = ".json"
let arrayOriginal  = []
let copiaArray = []
let cartasGuardadas = []
let segundoArray = []
let hola = []
let codigoCarta = []
let filteredData = []
let filteredArray = []
let listaNueva = []
let cardSets1 = []
let pruebaCursor = []
// var caja = [];
// var carpeta = [];
// var sets = [];
// const indexedDB = window.indexedDB

// const indexedNombre = document.getElementById('enter')
// const indexedGuardar = document.getElementsByClassName('botonPrueba')[0]
// const indexedSelect = document.getElementById('buscadorNombre')

if (indexedDB){
  let db
  const request = indexedDB.open('tasksList', 1)

  request.onsuccess = () => {
    db = request.result
    console.log('OPEN', db)
    // readData()
  }

  request.onupgradeneeded = () => {
    db = request.result
    console.log('Create', db)
    const objectStore = db.createObjectStore('caja', {
      autoIncrement: true
    })
    const objectStore1 = db.createObjectStore('carpeta', {
      autoIncrement: true
    })
    const objectStore2 = db.createObjectStore('sets', {
      autoIncrement: true
    })
    const objectStore3 = db.createObjectStore('arquetipo', {
      autoIncrement: true
    })
    const objectStore4 = db.createObjectStore('vendidas', {
      autoIncrement: true
    })
    const objectStore5 = db.createObjectStore('extra', {
      autoIncrement: true
    })
    const objectStore6 = db.createObjectStore('extra2', {
      autoIncrement: true
    })
    
  }

  request.onerror = (error) => {
    console.log('Error', error)
  }

  const addDataCaja = (data) => {
    const transaction = db.transaction(['caja'],'readwrite')
    const objectStore = transaction.objectStore('caja')
    const request = objectStore.add(data)
  }
  const addDataCarpeta = (data) => {
    const transaction = db.transaction(['carpeta'],'readwrite')
    const objectStore = transaction.objectStore('carpeta')
    const request = objectStore.add(data)
  }
  const addDataSets = (data) => {
    const transaction = db.transaction(['sets'],'readwrite')
    const objectStore = transaction.objectStore('sets')
    const request = objectStore.add(data)
  }
  const addDataArquetipo = (data) => {
    const transaction = db.transaction(['arquetipo'],'readwrite')
    const objectStore = transaction.objectStore('arquetipo')
    const request = objectStore.add(data)
  }

  // const readData = () => {
  //   const transaction = db.transaction(['caja'],'readonly')
  //   const objectStore = transaction.objectStore('caja')
  //   const request = objectStore.openCursor()

  //   request.onsuccess = (e) => {
  //     const cursor = e.target.result
       
  //     if(cursor){
  //       // console.log(cursor.value)
  //       // cursor.continue()
  //       pruebaCursor.push(cursor.value)
  //       cursor.continue()
  //       // console.log(pruebaCursor)
  //     }
  //   }
  // }
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
    mostrarMasCartas(array)
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
    mostrarMasCartas(array)
  }
  
  function filtrarCardSets() {
  let selectElements = document.getElementsByClassName('miSelect1');
  let setRarityValues = [];
  let caja = [];
  let carpeta = [];
  let sets = [];
  let arquetipo = []
  // Obtiene el elemento select correspondiente al botón haciendo clic en él
  let index = event.target.id; // Obtiene el ID del botón haciendo clic en él
  let selectElement = selectElements[index];
  // let repeatCount = buttonParent.querySelector('.contador').value;
  // console.log('choc')
  // console.log(repeatCount)
  for (let i = 0; i < selectElement.options.length; i++) {
  // Verifica si la opción en la posición i tiene un atributo id y es la opción seleccionada
  if (selectElement.options[i].id && selectElement.options[i].selected) {
    setRarityValues.push(selectElement.value, selectElement.options[i].id);
  }
  // console.log(setRarityValues)
}
let cardSet = cardSets1[index];

// verificamos que el array tenga el formato que necesitamos
if (Array.isArray(cardSet.card_sets) && cardSet.card_sets.length > 0) {
  // creamos un nuevo objeto con toda la información del elemento original excepto en la propiedad card_sets
  let filteredCardSet = Object.assign({}, cardSet);
  filteredCardSet.card_sets = [];

  // iteramos sobre el array de card_sets del elemento
  for (let j = 0; j < cardSet.card_sets.length; j++) {
    // obtenemos el elemento del array en la posición j
    let set = cardSet.card_sets[j];
    // comprobamos si el set_rarity del elemento es igual al valor seleccionado en el select
    if (set.set_rarity === setRarityValues[0] && set.set_code === setRarityValues[1])  {
      // si cumple la condición, lo añadimos al array de card_sets del nuevo objeto
      filteredCardSet.card_sets.push(set);
      let buttonParent = event.target.parentNode; // obtiene el elemento padre del botón
      let repeatCount = buttonParent.querySelector('.contador').value
  //     console.log('choc')
  // console.log(repeatCount)
let aGuardarSelect = buttonParent.querySelector('.aGuardar'); // busca el select con clase "aGuardar" dentro del elemento padre
let aGuardar = aGuardarSelect.value; // obtiene el valor del select
      console.log(aGuardar)
      if (aGuardar === "caja") {
        for (let i = 0; i < repeatCount; i++) {
        caja.push(filteredCardSet);
        console.log(caja)
        console.log('caja')
        addDataCaja(caja)
        }
      } else if (aGuardar === "carpeta") {
        for (let i = 0; i < repeatCount; i++) {
        carpeta.push(filteredCardSet);
        console.log(carpeta)
        console.log('carpeta')
        addDataCarpeta(carpeta)
        }
      } else if (aGuardar === "set") {
        for (let i = 0; i < repeatCount; i++) {
        sets.push(filteredCardSet);
        console.log(sets)
        console.log('sets')
        addDataSets(sets)
        }
        // alert('Guardado en: sets')
      } else if (aGuardar === "arquetipo") {
        for (let i = 0; i < repeatCount; i++) {
        arquetipo.push(filteredCardSet);
        console.log(arquetipo)
        console.log('arquetipo')
        addDataArquetipo(arquetipo)
        }
      }
    }
  }
}
}
}
function buscarNombre(){
    let inputvalue = document.getElementById("buscadorNombre").value;
    let listaNueva = copiaArray.filter( carta => { 
      return (carta.name.toLowerCase().indexOf(inputvalue.toLowerCase()) > -1) && (carta.hasOwnProperty('card_sets'));
  });
        
        mostrarMasCartas(listaNueva)

        for (let i = 0; i < listaNueva.length; i++) {
          // obtenemos el elemento del array en la posición i
          let carta = listaNueva[i];
          // verificamos si el elemento tiene el campo card_sets
          if ('card_sets' in carta) {
            // creamos el elemento select
            let select = document.createElement('select');
            select.setAttribute("class", "miSelect1");
            // iteramos sobre el array de card_sets del elemento
            for (let j = 0; j < carta.card_sets.length; j++) {
              // obtenemos el elemento del array en la posición j
              let set = carta.card_sets[j];
              // creamos una opción con el valor del campo set_rarity como el valor de la opción y el contenido de la opción es el mismo valor
              let option = document.createElement('option');
              option.value = `${set.set_rarity}`;
              option.id = set.set_code
              option.textContent = `${set.set_rarity} - ${set.set_code}`;
              // añadimos la opción al select
              select.appendChild(option);
            }
            // obtenemos el elemento con clase correspondiente
            let element = document.getElementsByClassName('miSelect')[i];
            // añadimos el select como HTML al elemento con clase
            element.insertAdjacentHTML('beforeend', select.outerHTML);
          }
        }
        cardSets1.length = 0
  // cardSets1.push(listaNueva)
  cardSets1 = cardSets1.concat(listaNueva);
  console.log(cardSets1)
      }

function buscarDescripcion(){
    let inputvalue = document.getElementById("buscadorDescripcion").value;
    let listaNueva = copiaArray.filter( carta => { 
    return carta.desc.toLowerCase().indexOf(inputvalue.toLowerCase()) > -1; 
        })
        
        mostrarMasCartas(listaNueva)
        
}
function buscarCodigo() {
    let inputvalue = document.getElementById('buscadorCodigo').value.toLowerCase()
    let listaNueva = copiaArray.filter(card => card.card_sets && card.card_sets.some(set => set.set_code.toLowerCase().includes(inputvalue)));
    let cardSets = listaNueva.map(card => {
    let cardSet = card.card_sets.filter(set => set.set_code.toLowerCase() === inputvalue);
    //   console.log(cardSet);
      return {
        // aquí puedes incluir los otros campos del objeto original si deseas
        ...card,
        card_sets: cardSet
      }
    });
let optionsArray = [];
  // iteramos sobre el array de card_sets
  for (let i = 0; i < cardSets.length; i++) {
    // obtenemos el elemento del array en la posición i
    let set = cardSets[i];
    // iteramos sobre el array de card_sets del elemento
    for (let j = 0; j < set.card_sets.length; j++) {
      // creamos un objeto para cada opción con el nombre de set_rarity como el contenido de la opción y el valor de set_rarity como el valor de la opción
      let option = {
        name: `${set.card_sets[j].set_rarity} - ${set.card_sets[j].set_name}`,
        value: set.card_sets[j].set_rarity,
        id: set.card_sets[j].set_code
      };
      // añadimos la opción al array de opciones
      optionsArray.push(option);
      console.log(optionsArray)
    }
  }
  // crea el elemento select
  let select = document.createElement('select');
  select.setAttribute("class", "miSelect1");
  // iteramos sobre el array de opciones
  for (let i = 0; i < optionsArray.length; i++) {
    // obtenemos el elemento del array en la posición i
    let option = optionsArray[i];
    // creamos una opción con el valor del campo value como el valor de la opción y el contenido de la opción es el valor del campo name
    let optionElement = document.createElement('option');
    optionElement.value = option.value;
    optionElement.textContent = option.name;
    optionElement.id = option.id
    // añadimos la opción al select
    select.appendChild(optionElement);
  }
  mostrarMasCartas(cardSets);
  document.getElementById('miSelect0').appendChild(select);
  // console.log(cardSets);
  // let cardSets1 = [cardSets]
  cardSets1.length = ""
  cardSets1.push(cardSets[0])
  console.log(cardSets1)
  }

function mostrarMasCartas(array){
    let htmlcontenttoAppend = ""
    // let añadir = ""
    for(i = 0; i < array.length; i++){
        htmlcontenttoAppend += `
        <tr class="borrar1">
        <td class="prueba" >
        <div class="card mb-3" style="max-width: 50%; max-height: 50%">
        <div class="row no-gutters">
        <div class="col-md-4">
        <img class="cartasYugi" src="${array[i].card_images[0].image_url}">
        </div>
        <div class="col-md-8">
        <div class="card-body">
        <h4 class="card-title">${array[i].name}</h4>
        <p class="card-text">${array[i].desc}</p>
        <div id="miSelect0" class="miSelect">
        
        </div>
        <div>
        <br>
        Sitio a guardar: <select class="aGuardar">
        
        <option value="caja">Caja</option>
        <option value="carpeta">Carpeta</option>
        <option value="set">Set</option>
        <option value="arquetipo">Arquetipo</option>
        </select>
        </div>
        <br>
        Cantidad: <input type="number" class="contador" value=1 min="1" size="3">
        <br>
        <br>
        <button type="button" class="btn btn-primary botonPrueba" onclick='filtrarCardSets()' id="${i}">Guardar carta</button>
        </div>
        </div>
        </div>
        </div>
        </td>
        </tr>
        
        `
        //onclick='filtrarCardSets()'
        // onclick='probando(${(array[i].id)})'
        // <p onclick="${cartasGuardadas.push(array[i])}"> </p>
        // ${setId(array[i].name)}
    }
    document.getElementById('contenedor').innerHTML = htmlcontenttoAppend
}

function datatable(){
        $(document).ready(function(){
            
            $('#contenedor').after('<div class="borrar" id="nav"></div>');
            var rowsShown = 10;
            var rowsTotal = $('#contenedor tbody tr').length;
            var numPages = rowsTotal/rowsShown;
            for(i = 0;i < numPages;i++) {
                var pageNum = i + 1;
                
                $('#nav').append('<a href="#" rel="'+i+'">'+pageNum+'</a> ');
            }
            
            $('#contenedor tbody tr').hide();
                $('#contenedor tbody tr').slice(0, rowsShown).show();
                $('#nav a:first').addClass('active');
                $('#nav a').bind('click', function(){
                    
                    $('#nav a').removeClass('active');
                    $(this).addClass('active');
                    var currPage = $(this).attr('rel');
                    var startItem = currPage * rowsShown;
                    var endItem = startItem + rowsShown;
                    $('#contenedor tbody tr').css('opacity','0.0').hide().slice(startItem, endItem).
                    css('display','table-row').animate({opacity:1}, 300);
                });
            });
}


document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(allCards).then(function(resultObj){
        if (resultObj.status === "ok"){
            allCartas = resultObj.data
            copiaArray = allCartas.data
            console.log(allCartas)
            
          }
          if (localStorage.getItem('ids') === "" || localStorage.getItem('ids') === null){
            hola = []
          } else {
            hola = JSON.parse(localStorage.getItem('ids'))
            cartasGuardadas = cartasGuardadas.concat(hola)
          }
        })
        document.getElementById('enter').addEventListener('click', ()=>{
          if (document.getElementById('buscadorNombre').value !== ""){
            $("div").remove( ".borrar" );
          // document.getElementById('buscadorCodigo').value = ""
          buscarNombre()
          datatable()
          } else {
            alert('Rellene el campo')
          }
      })
        document.getElementById('enter2').addEventListener('click', ()=>{
          if (document.getElementById('buscadorDescripcion').value !== ""){
            $("div").remove( ".borrar" );
            // document.getElementById('buscadorCodigo').value = ""
            buscarDescripcion()
            datatable()
          } else {
            alert('Rellene el campo')
          }
          })
          document.getElementById('enter3').addEventListener('click', ()=>{
            if (document.getElementById('buscadorCodigo').value !== ""){
            $("div").remove( ".borrar" );
            buscarCodigo()
            datatable()
            } else {
              alert('Rellene el campo')
            }
          })
          $("#buscadorDescripcion").on("keydown",function search1(e) {
            if(e.keyCode == 13 && document.getElementById('buscadorDescripcion').value !== "") {
              $("div").remove( ".borrar" );
              // document.getElementById('buscadorCodigo').value = ""
              buscarDescripcion()
              datatable()
            }
          });
          $("#buscadorNombre").on("keydown",function search2(e) {
            if(e.keyCode == 13 && document.getElementById('buscadorNombre').value !== "") {
              $("div").remove( ".borrar" );
              // document.getElementById('buscadorCodigo').value = ""
              buscarNombre()
              datatable()
            
            }
          });
          $("#buscadorCodigo").on("keydown",function search3(e) {
            if(e.keyCode == 13 && document.getElementById('buscadorCodigo').value !== "") {
              $("div").remove( ".borrar" );
              buscarCodigo()
            datatable()
          }
        });
        // document.getElementById('abc1').addEventListener('click', ()=>{
        //   sortByName(cardSets1)
        //   })
        //   document.getElementById('zyx1').addEventListener('click', ()=>{
        //     sortByNameOpuesto(cardSets1)
        //     })
        //   document.addEventListener('click', (event) => {
        //     if (event.target.classList.contains('botonPrueba')) {
        //       filtrarCardSets();
        //     }
        // })
      })
    // getJSONData(darkmagician).then(function(resultObj){
        //     if (resultObj.status === "ok"){
    //         arrayOriginal = resultObj.data
    //         // copiaArray = arrayOriginal.data
           
    //         // console.log(arrayOriginal.data)
    //         // mostrarCartas(arrayOriginal.data)
            
    //     }
    // })

