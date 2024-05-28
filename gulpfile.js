import * as darSass from "sass"
import gulpSass from "gulp-sass"
import { src, dest, watch, series } from "gulp"
import { glob } from "glob"
import path from "path"
import fs from "fs"
import terser from "gulp-terser"
import sharp from "sharp"

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

//Optimizar imagenes(código js) con sharp. 
export async function crop(done) {
    const inputFolder = 'src/img/gallery/full'
    const outputFolder = 'src/img/gallery/thumb';
    const width = 500;
    const height = 500;
    //Verifica existencia de directorios
    if (!fs.existsSync(outputFolder)) {
        fs.mkdirSync(outputFolder, { recursive: true }) //Crea directorio. 
    }
    //Verificda que sean imagenes las que procesará. 
    const images = fs.readdirSync(inputFolder).filter(file => {
        return /\.(jpg)$/i.test(path.extname(file));
    });
    try {
        images.forEach(file => {
            const inputFile = path.join(inputFolder, file)
            const outputFile = path.join(outputFolder, file)
            sharp(inputFile) 
                .resize(width, height, {
                    position: 'centre'
                })
                .toFile(outputFile)
        });
        done() //Finaliza tarea. 
    } catch (error) {
        console.log(error)
    }
}
//Convertir imagenes a webp y avif
export async function convertirImgs(done) {
    const srcDir = './src/img';
    const buildDir = './build/img';
    const images =  await glob('./src/img/**/*{jpg,png}')

    images.forEach(file => {
        const relativePath = path.relative(srcDir, path.dirname(file));
        const outputSubDir = path.join(buildDir, relativePath);
        procesarImagenes(file, outputSubDir);
    });
    done();
}

function procesarImagenes(file, outputSubDir) {
    if (!fs.existsSync(outputSubDir)) {
        fs.mkdirSync(outputSubDir, { recursive: true })
    }
    const baseName = path.basename(file, path.extname(file))
    const extName = path.extname(file)
    const outputFile = path.join(outputSubDir, `${baseName}${extName}`)
    const outputFileWebp = path.join(outputSubDir, `${baseName}.webp`)
    const outputFileAvif = path.join(outputSubDir, `${baseName}.avif`)

    const options = { quality: 80 }
    sharp(file).jpeg(options).toFile(outputFile)
    sharp(file).webp(options).toFile(outputFileWebp)
    sharp(file).avif().toFile(outputFileAvif)
}

//Estará escuchando constantemente los cambios en los archivos scss y js
export function dev(){
    watch("src/scss/**/*.scss", css)
    watch("src/js/**/*.js", js)
    watch("src/img/**/*.{jpg, png}", convertirImgs)
}

//Series tomará como argumento las tareas que queremos ejecutar de manera secuencial. (con parallel los ejecuta al mismo tiempo). 
export default series(crop, js, css, convertirImgs, dev ) 