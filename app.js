document.addEventListener('DOMContentLoaded', () => {
  let contenedor = JSON.parse(localStorage.getItem('carrito')) || [];
  const renderizarProductos = () => {
    url = 'https://dummyjson.com/products/category/groceries';
    //url = 'https://dummyjson.com/products?limit=10';
    fetch(url)
    .then(response => response.json())
    .then(data => {
            let contenedorProducto = document.getElementById('contenedor-piezas');
            for (const producto of data.products) {  
                 const articulo = document.createElement('article');
                 articulo.classList.add('piezas');

                let imagen = document.createElement('img');
                imagen.src = producto.images[0];
                imagen.alt = producto.description;

                 let tituloProducto = document.createElement('h2');
                 tituloProducto.textContent = producto.title;
                 articulo.appendChild(tituloProducto);
                 contenedorProducto.appendChild(articulo);

                 let precioProducto = document.createElement('p');
                 precioProducto.textContent = `$${producto.price}`;


                let botonAgregar = document.createElement('button');
                botonAgregar.textContent = 'Agregar al carrito';

                botonAgregar.addEventListener('click', () => {
                    alert(`Producto ${producto.title} agregado al carrito`);
                    agregarProductoAlCarrito(producto);
                    actualizarAgregados()
                });

                articulo.appendChild(imagen);
                articulo.appendChild(tituloProducto);
                articulo.appendChild(precioProducto);
                articulo.appendChild(botonAgregar);

                contenedorProducto.appendChild(articulo);
            }
        })
    .catch((err) => console.error("Error:", err));
  }

  const agregarProductoAlCarrito = (producto) => {
    contenedor.push(producto);
    localStorage.setItem('carrito', JSON.stringify(contenedor));
  }

  const actualizarAgregados = () => {
    const contenedorAgregados = document.getElementById('contenedor-agregados');
    contenedorAgregados.textContent = contenedor.length;
  }

    renderizarProductos();
    actualizarAgregados();


});




