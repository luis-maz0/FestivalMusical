document.addEventListener("DOMContentLoaded", ()=>{ crearGaleria()})

function crearGaleria(){
    const galeria = document.querySelector(".galeria-imgs");
    const numImagenes = 5; 
    for (let i = 1; i <= numImagenes; i++) {
        const img = document.createElement("IMG");
        img.src = `src/img/galeria${i}.jpg`; // Ajusta la ruta y nombre de las imágenes según tu caso
        img.alt = `imagen galeria ${i}`;
        galeria.appendChild(img);
    }
}