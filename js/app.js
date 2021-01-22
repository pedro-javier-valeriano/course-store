//variables
const carrito= document.getElementById('carrito');
const cursos= document.getElementById('lista-cursos');

//listeners
cargarEventListeners();
function cargarEventListeners(){
    //dispera cuando se preciona gregar carrito
    cursos.addEventListener('click', comprarCurso);


} 


//funciones
//funcion que añade el curso al carrito
function comprarCurso(e){
    e.preventDefault();
    //delegaicion para agregar carrito
    if(e.target.classList.contains('agregar-carrito')){
        const curso= e.target.parentElement.parentElement;
        leerDatosCurso(curso);
    }
    
}

//lee los datos del curso
function leerDatosCurso(curso){
    console.log(curso);

}