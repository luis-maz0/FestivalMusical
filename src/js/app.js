document.addEventListener("DOMContentLoaded", ()=>{ crearGaleria()})

function crearGaleria(){
    const galeria = document.querySelector(".galeria-imgs");
    const numImagenes = 5; 
    for (let i = 1; i <= numImagenes; i++) {
        const img = document.createElement("IMG");
        img.className = "galeria-img"
        img.src = `src/img/galeria${i}.jpg`; // Ajusta la ruta y nombre de las imágenes según tu caso
        img.alt = `imagen galeria ${i}`;

        //EVENT HANDLER
        img.onclick = function(){
            mostrarImagen(i)
        }
        galeria.appendChild(img);
    }
}
function mostrarImagen(indiceImg){
    const img = document.createElement("IMG");
    img.className = "modal-img"
    img.src = `src/img/galeria${indiceImg}.jpg`;
    img.alt = `imagen galeria ${indiceImg}`;

    //General fondo o modal de img
    const modal = document.createElement("DIV");
    modal.classList.add("modal");
    modal.appendChild(img);
    
    //Creación boton cierre modal

    const btn = document.createElement("BUTTON"); 
    btn.textContent = "X";
    btn.classList.add("btn-cerrar"); 
    btn.onclick = function(){
        removerModal();
    } 
    modal.appendChild(btn);

    //Agregar al body
    const body = document.querySelector("body");
    body.classList.add("overflow-hidden");
    body.appendChild(modal);
    
    
    //Handler para sacar modal
    modal.onclick = function(){
        removerModal();
        body.classList.remove("overflow-hidden");
    }
}

function removerModal(){
    const modal = document.querySelector(".modal");
    modal.classList.add ("modal-fadeOut");
    //Retrasamos el tiempo para la ejecución del bloque del setTimeOut. 
    setTimeout(() => {
        modal.remove();
    }, 500);
}