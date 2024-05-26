import * as darSass from "sass"
import gulpSass from "gulp-sass"
import {src, dest, watch, series} from "gulp"
import terser from "gulp-terser"

const sass = gulpSass(darSass) 


//Con export ya puede usarse desde el package.json
export function css (done){
    src("src/scss/app.scss",{sourcemaps: true}) //Buscamos el archivo a compilar
        //Pasamos como argumento de la función sass outputStype para minificar la hoja de estilos(ganamos bytes)
        .pipe( sass({ outputStyle: "compressed"}).on("error", sass.logError)) //Ejecuta esta función con una determinada tarea con el archivo. Con este pipe indicamos que compile. En caso de que ocurra un error lo atrapamos y visualizamos con on. 
        .pipe( dest("build/css",{sourcemaps: true})) //Establecemos el destino del archivo compilado. 
        //Con sourcemaps nos mostrará la linea de código NO del css sino del scss
        //(Visto desde devtools)
    done() //termina la tarea. 
}

//Genera una función que mande nuestro js al directorio build.
export function js( done ){
    src("src/js/app.js")
        .pipe(terser())
        .pipe(dest("build/js"))
    done()
}

//Estará escuchando constantemente los cambios en los archivos scss y js
export function dev(){
    watch("src/scss/**/*.scss", css)
    watch("src/js/**/*.js", js)
}

export default series( js, css, dev ) //Series tomará como argumento las tareas que queremos ejecutar de manera secuencial. (con parallel los ejecuta al mismo tiempo). 

