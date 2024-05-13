import * as darSass from "sass"
import gulpSass from "gulp-sass"
import {src, dest, watch} from "gulp"

const sass = gulpSass(darSass) 

//Con export ya puede usarse desde el package.json
export function css (done){
    src("src/scss/app.scss") //Buscamos el archivo a compilar
        .pipe( sass().on("error", sass.logError)) //Ejecuta esta función con una determinada tarea con el archivo. Con este pipe indicamos que compile. En caso de que ocurra un error lo atrapamos y visualizamos con on. 
        .pipe( dest("build/css")) //Establecemos el destino del archivo compilado. 
    done()
}

export function dev(){
    watch("src/scss/**/*.scss", css)
}