# Yugioh-card-keeper

Un poco mas de información sobre este proyecto. Tanto yo como un familiar, coleccionamos cartas de Yugioh, y el al tener una gran cantidad de estas, que cada tanto compra o vende alguna de las suyas, se olvida de cuales tiene, por lo que una pagina que tenga todas las cartas que el tiene en fisico le viene muy bien. 
Es mi segundo proyecto y el primero que hago sin supervisión de un profesor, pero tuve la gran ayuda de GPT-3 que me salvó la vida muchas veces en cosas nuevas que no entendia.

Usando la API de https://ygoprodeck.com/api-guide/ , puedo acceder a toda la informacion de las cartas que existen en TCG, con unas funcionalidades para poder elegir la carta, ya sea por codigo o que al buscar por nombre te salgan todas sus rarezas, puedas guardar la carta exacta que tienes en fisico.
Contiene 3 lugares a los que acceder: 
1) el primero que es el buscador principal para buscar las cartas a añadir
2) Colección, que es donde salen las cartas guardadas segun en donde elegiste, con la opcion de apretar en "todas", para que efectivamente, salgan todas las cartas añadidas
3) Vendidas, que es el lugar donde van las cartas eliminadas, para asi saber de donde salieron.

En Colección, hay un añadido que es el poder descargar todos tus datos de cartas guardadas a un Excel. Esto te descarga 2 Exceñ, uno llamado "text", que es el el destinado a que el usuario lo vea para ver mas facil los datos, que por ejemplo si una carta exactamente igual guardada en el mismo sitio está 3 veces repetida, en "text" te saldria con un contador al lado marcando esto, sin repetir la carta 3 veces.
El segundo Excel llamado "recuperar", es para suplantar los datos que tiene el navegador por esos del excel. Con unas funciones de find y filter, consigo que esos pocos datos guardados se conviertan en datos completos. Esta fue una de las partes mas complicadas de hacer y no es perfecta, tuve un bug que duplicaba todos los datos pero no pude replicarlo, por lo que desconozco como arreglarlo. Igualmente eso sucedió de 30 veces quizá una y hasta menos que eso.

Hasta ahora con mi primer proyecto solo sabia usar localStorage y sessionStorage, pero para una pagina que guarda muchos datos busqué una alternativa, y una opcion rapida de aprender lo basico fue indexedDB, que es la que usé.

No es un trabajo perfecto, en muchos momentos tuve que duplicar codigo y hacer malas practicas para terminar lo principal de la pagina rapido, pero igualmente me siento muy satisfecho con el trabajo conseguido y con saber que al cliente tambien le gustó es mas que suficiente :).

