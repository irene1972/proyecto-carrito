const carrito=document.querySelector('#carrito');
const contenedorCarrito=document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn=document.querySelector('#vaciar-carrito');
const listaCursos=document.querySelector('#lista-cursos');

let articulosCarrito=[];

cargarEventListeners();
function cargarEventListeners(){
    //agrega curso al carrito
    listaCursos.addEventListener('click',agregarCurso);

    //elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    //vaciar el carrito
    vaciarCarritoBtn.addEventListener('click',()=>{
        //e.preventDefault();
        articulosCarrito=[];
        limpiarHTML();
    });
}

function agregarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado=e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

//elimina un curso del carrito
function eliminarCurso(e){
    const enlace=e.target;
    if(enlace.classList.contains('borrar-curso')){
        const id=enlace.getAttribute('data-id');
        
        //borramos el curso con ese id
        articulosCarrito=articulosCarrito.filter(curso=>curso.id!==id);
        carritoHTML();
    }
}

//lee el contenido del html al que le dimos click y extrae la información del curso
function leerDatosCurso(curso){
    //crear un objeto con el contenido del curso actual
    const infoCurso={
        imagen:curso.querySelector('img').src,
        titulo:curso.querySelector('h4').innerText,
        precio:curso.querySelector('.precio span').innerText,
        id:curso.querySelector('a').getAttribute('data-id'),
        cantidad:1
    }

    //revisa si un elemento ya existe en el carrito
    const existe=articulosCarrito.some(curso=>curso.id===infoCurso.id);
    if(existe){
        const cursos=articulosCarrito.map(curso=>{
            if(curso.id===infoCurso.id){
                curso.cantidad++;
                return curso;//retorna el objeto actualizado
            }else{
                return curso;//retorna los objetos que no son los duplicados
            }
        });
        articulosCarrito=[...cursos];
    }else{
        //agrega elementos a la array del carrito
        articulosCarrito=[...articulosCarrito,infoCurso];
    }


    //console.log(articulosCarrito);
    carritoHTML();
}

//muestra el carrito de compras en el html
function carritoHTML(){
    //limpiar el html
    limpiarHTML();

    //recorre el carrito y genera el html
    articulosCarrito.forEach(curso=>{
        const {imagen,titulo,precio,cantidad,id}=curso;
        const row=document.createElement('tr');
        row.innerHTML=`
            <td><img src="${imagen}" width="100"></td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}">X</a>
            </td>
        `;
        //agrega el html del carrito en el tbody
        contenedorCarrito.appendChild(row);
    });
}

function limpiarHTML(){
    //contenedorCarrito.innerHTML='';
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}