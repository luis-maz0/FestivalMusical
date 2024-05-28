document.addEventListener("DOMContentLoaded", function(){ 
    fijarHeader();
    crearGaleria();
    resaltarEnlacesNav();
    crearSmoothScroll();
})
function fijarHeader(){
    const header = document.querySelector(".header");
    const sobreFestival = document.querySelector(".sobre-festival");

    document.addEventListener("scroll", ()=>{
        if( sobreFestival.getBoundingClientRect().bottom < 1 ){
            header.classList.add("fixed");
        }else{
            header.classList.remove("fixed");
        }
    })
}
function crearGaleria(){
    const galeria = document.querySelector(".galeria-imgs");
    const numImagenes = 5; 
    for (let i = 1; i <= numImagenes; i++) {
        const picture = document.createElement("PICTURE");
        picture.innerHTML = `<source srcset="build/img/gallery/thumb/galeria${i}.avif" type="image/avif">
                            <source srcset="build/img/gallery/thumb/galeria${i}.webp" type="image/webp">
                            <img loading="lazy" width="200" height="300" src="build/img/gallery/thumb/galeria${i}.jpg" alt="imagen galeria">`;

        //EVENT HANDLER
        picture.onclick = function(){
            mostrarImagen(i)
        }
        galeria.appendChild(picture);
    }
}
function mostrarImagen(indiceImg){
    //Crear una pictura y agregar atributos
    const picture = document.createElement("PICTURE");
    picture.classList.add("modal-img");
    picture.innerHTML = `<source srcset="build/img/gallery/full/galeria${indiceImg}.avif" type="image/avif">
                        <source srcset="build/img/gallery/full/galeria${indiceImg}.webp" type="image/webp">
                        <img loading="lazy" width="200" height="300" src="build/img/gallery/thumb/galeria${indiceImg}.jpg" alt="imagen galeria">`;

    //General fondo o modal de img
    const modal = document.createElement("DIV");
    modal.classList.add("modal");
    modal.appendChild(picture);
    
    //Creación boton cierre modal
    const btn = document.createElement("BUTTON"); 
    btn.textContent = "X";
    btn.classList.add("btn-cerrar"); 
    btn.addEventListener("click", removerModal);
    modal.appendChild(btn);

    //Agregar al body
    const body = document.querySelector("body");
    body.classList.add("overflow-hidden");
    body.appendChild(modal);
    
    
    //Handler para sacar modal
    modal.addEventListener("click", ()=>{
        removerModal();
        body.classList.remove("overflow-hidden");
    });
}

function removerModal(){
    const modal = document.querySelector(".modal");
    modal.classList.add("modal-fadeOut");
    //Retrasamos el tiempo para la ejecución del bloque del setTimeOut. 
    setTimeout(() => {
        modal.remove();
    }, 500);
}
function resaltarEnlacesNav(){
    document.addEventListener("scroll", ()=>{
        const sections = document.querySelectorAll("section"); 
        const navLinks = document.querySelectorAll(".nav-principal a");
        let actual = ""; 

        sections.forEach(section => {
            const sectionTop = section.offsetTop; //Toma la medida del top del section con el elemento padre (body)
            const sectionHeight = section.clientHeight //Medida de la section (alto). 
            if( window.scrollY >= (sectionTop - (sectionHeight / 3))){ //Con dicha cuente definimos cuanto queremos ver de la section. 
                actual = section.id; 
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if(link.getAttribute("href") === "#" + actual){
                link.classList.add("active"); 
            }
        })

    })
}
function crearSmoothScroll(){
    const navLinks = document.querySelectorAll(".nav-principal a");
    navLinks.forEach( link => {
        link.addEventListener("click", (e)=>{
            e.preventDefault(); 
            const sectionScroll = e.target.getAttribute("href");
            const section = document.querySelector(sectionScroll);
            section.scrollIntoView({ behavior: "smooth"});
        });
    })
}