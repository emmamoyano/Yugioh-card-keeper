const allCards = "https://db.ygoprodeck.com/api/v7/cardinfo.php"
let copiaArray = []
let pruebaArray = []
function safeParse(jsonString) {
  try {
    return JSON.parse(jsonString);
  } catch (e) {
    return undefined;
  }
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
      let card = copiaArray.filter(card => card.id === id)[0];
      let temp = Object.assign({}, element);
      Object.assign(element, card);
      element.card_sets = temp.card_sets;
  });
  }

document.addEventListener('DOMContentLoaded', function(e){
    getJSONData(allCards).then(function(resultObj){
        if (resultObj.status === "ok"){
            allCartas = resultObj.data
            copiaArray = allCartas.data
            console.log(allCartas)
            alert('cargada la pagina, continue')
          }
        })

    document.getElementById('file-input').addEventListener('change', ()=>{
      handleFile()
    })
    document.getElementById('actualizarDatos').addEventListener('click', ()=>{
      cambiarDatos()
    })
})