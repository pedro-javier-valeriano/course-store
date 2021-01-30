//variables
const carrito= document.getElementById('carrito');
const cursos= document.getElementById('lista-cursos');
const listaCursos= document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
//listeners
cargarEventListeners();
function cargarEventListeners(){
    //dispera cuando se preciona gregar carrito
    cursos.addEventListener('click', comprarCurso);

    //cuando se elimina un curso del carrito
    carrito.addEventListener('click', eliminarCurso);
    //al vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito)
    // al cargar el documento mostar el local storage
    document.addEventListener('DOMContentLoaded', leerLocalStorage);    
} 


//funciones
//funcion que añade el curso al carrito
function comprarCurso(e){
    e.preventDefault();
    //delegaicion para agregar carrito
    if(e.target.classList.contains('agregar-carrito')){
        const curso= e.target.parentElement.parentElement;
        //enviamos el curso seleccionado para tomar sus datos
        leerDatosCurso(curso);
    }
    
}

//lee los datos del curso
function leerDatosCurso(curso){
    const infoCurso={
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id')

    }
    insertarCarrito(infoCurso);
}

//muestra el curso seleccionado en el carrito
function insertarCarrito(curso){
    const row= document.createElement('tr');
    row.innerHTML=`
    <td>
        <img src="${curso.imagen}"width=100/>
    <td/>
    <td>${curso.titulo}</td>
    <td>${curso.precio}</td>
    <td>
        <a href="#" class="borrar-curso" data-id="${curso.id}">x</a>
    </td>
    `;
    listaCursos.appendChild(row);
    guardarCursoLocalStorage(curso);
}
//elimina el curso del carrito del dom
function eliminarCurso(e){
    e.preventDefault();
    let curso ,
    cursoId;
    if (e.target.classList.contains('borrar-curso')){
        e.target.parentElement.parentElement.remove();
        curso= e.target.parentElement.parentElement;
        cursoId= curso.querySelector('a').getAttribute('data-id');
    }
    eliminarCursoLocalStorage(cursoId);
}
//elimina todos los cursos 
function vaciarCarrito(){
    while(listaCursos.firstChild){
        listaCursos.removeChild(listaCursos.firstChild);
    }
    
    //vaciar localStorage

    vaciarLocalStorage();
    return false;

}
//almacena cursos en el carrito en local storage
function guardarCursoLocalStorage(curso){
  let cursos;
  cursos = obtenerCursosLocalStorage();
    //el curso seleccionado se agrega al arreglo
  cursos.push(curso);

  localStorage.setItem('cursos', JSON.stringify(cursos));
}
//comprurba que haya elmentos en local strage
function obtenerCursosLocalStorage(){
 let cursosLs;

 //compravamos si hay algo en local storage
if (localStorage.getItem('cursos')=== null){
    cursosLs=[];
    }
    else {
        cursosLs= JSON.parse(localStorage.getItem('cursos'));
    }
    return cursosLs;

}

//imprime los cursos de local storage en el carrito
function leerLocalStorage(){
    let cursosLs;

    cursosLs = obtenerCursosLocalStorage();

    cursosLs.forEach(function(curso){
        const row= document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src="${curso.imagen}" width=100>
        </td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}">x</a>
        </td>
        `;
        listaCursos.appendChild(row);
    });
}
//elimina el curso del local storage

function eliminarCursoLocalStorage(curso){
    let cursosLs;
    //obtenemos el arreglo de cursos
    cursosLs = obtenerCursosLocalStorage();
    //comparamos el id  del curso con el del local storage
     cursosLs.forEach(function(cursoLs, index){
        if (cursoLs.id=== curso){
            cursosLs.splice(index, 1);
        }
     });
     //añadimos el arreglo al storage
     localStorage.setItem('cursos', JSON.stringify(cursosLs));
}
 //elimina todos los cursos del local storage
  function vaciarLocalStorage(){
      localStorage.clear();
  }