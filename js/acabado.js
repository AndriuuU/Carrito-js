// Variables
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];

// Cargar los datos de LocalStorage
document.addEventListener('DOMContentLoaded', () => {
  articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
  carritoHTML();
});

// Cargar Event Listeners
cargarEventListeners();
function cargarEventListeners() {
  // Cuando agregas un curso presionando "Añadir al carrito"
  listaCursos.addEventListener('click', agregarCurso);

  // Elimina cursos del carrito
  carrito.addEventListener('click', eliminarCurso);

  // Vaciar el carrito
  vaciarCarritoBtn.addEventListener('click', () => {
    articulosCarrito = []; // Reseteamos el arreglo
    limpiarHTML(); // Eliminamos todo el HTML
  });
}

// Funciones

// Agrega el curso al carrito
function agregarCurso(e) {
  e.preventDefault();
  if (e.target.classList.contains('agregar-carrito')) {
    const cursoSeleccionado = e.target.parentElement.parentElement;
    leerDatosCurso(cursoSeleccionado);
  }
}

// Elimina un curso del carrito
function eliminarCurso(e) {
  if (e.target.classList.contains('borrar-curso')) {
    const cursoId = e.target.getAttribute('data-id');
    
    // Eliminar del arreglo de articulosCarrito por el data-id
    articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

    carritoHTML(); // Iterar sobre el carrito y mostrar su HTML
  }
}

// Lee el contenido del HTML al que le dimos click y extrae la información del curso
function leerDatosCurso(curso) {
  // Crear un objeto con el contenido del curso actual
  const infoCurso = {
    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('h4').textContent,
    precio: curso.querySelector('.precio span').textContent,
    id: curso.querySelector('a').getAttribute('data-id'),
    cantidad: 1
  };

  // Revisa si un curso ya existe en el carrito
  const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
  if (existe) {
    // Actualizamos la cantidad
    const cursos = articulosCarrito.map(curso => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso; // retorna el objeto actualizado
      } else {
        return curso; // retorna los objetos que no son duplicados
      }
    });
    articulosCarrito = [...cursos];
  } else {
    // Agrega elementos al arreglo de carrito
    articulosCarrito = [...articulosCarrito, infoCurso];
  }

  carritoHTML();
}

// Muestra el carrito de compras en el HTML
function carritoHTML() {
  // Limpiar el HTML
  limpiarHTML();

  // Recorre el carrito y genera el HTML
  articulosCarrito.forEach(curso => {
    const { imagen, titulo, precio, cantidad, id } = curso;
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><img src="${imagen}" width="100"></td>
      <td>${titulo}</td>
      <td>${precio}</td>
      <td>${cantidad}</td>
      <td>
        <a href="#" class="borrar-curso" data-id="${id}">X</a>
      </td>
    `;

    // Agrega el HTML del carrito en el tbody
    contenedorCarrito.appendChild(row)
    sincronizarStorage()
    
  });
 
}

// Almacena los cursos en LocalStorage
function sincronizarStorage() {
  localStorage.setItem("carrito", JSON.stringify(articulosCarrito));
}

// Elimina los cursos del tbody
function limpiarHTML() {

  // Forma rápida
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}
