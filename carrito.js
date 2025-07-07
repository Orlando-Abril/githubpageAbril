document.addEventListener('DOMContentLoaded', () => {

    const renderizarProductos = () => {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        productosEnCarrito(carrito);

        let seccionProductos = document.getElementById('contenedor-productos');
        seccionProductos.innerHTML = '';

        if (carrito.length === 0) {
            let mensajeCarrito = document.createElement('p');
            mensajeCarrito.classList.add('mensaje-carrito');
            mensajeCarrito.textContent = 'No hay productos en el carrito.';
            seccionProductos.appendChild(mensajeCarrito);
        } else {
            carrito.forEach((producto) => {
                let tarjetaProducto = document.createElement('article');
                tarjetaProducto.classList.add('piezas');

                let imagen = document.createElement('img');
                imagen.src = producto.images[0];

                let tituloProducto = document.createElement('h3');
                tituloProducto.textContent = producto.title;

                let precioProducto = document.createElement('p');
                precioProducto.textContent = `$${producto.price}`;

                tarjetaProducto.appendChild(imagen);
                tarjetaProducto.appendChild(tituloProducto);
                tarjetaProducto.appendChild(precioProducto);

                seccionProductos.appendChild(tarjetaProducto);
            });

            renderizarBotones();
        }
    };

    const renderizarBotones = () => {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        let divacciones = document.getElementById('acciones-carrito');
        divacciones.innerHTML = '';

        if (carrito.length > 0) {
            let btnVacias = document.createElement('button');
            btnVacias.textContent = 'Vaciar carrito';
            btnVacias.addEventListener('click', () => {
                vaciarCarrito();
            });

            let btnFinalizar = document.createElement('button');
            btnFinalizar.textContent = 'Finalizar compra';
            btnFinalizar.addEventListener('click', () => {
                if (confirm('¿Estás seguro de finalizar la compra?')) {
                    alert('Compra finalizada con éxito');
                    localStorage.removeItem('carrito');
                    window.location.href = "../index.html";
                }
            });

            divacciones.appendChild(btnVacias);
            divacciones.appendChild(btnFinalizar);
        }
    };

    const productosEnCarrito = (carrito) => {
        let contenedorAgregados = document.getElementById('contenedor-agregados');
        if (contenedorAgregados) {
            contenedorAgregados.textContent = carrito.length;
        }
    };

    const vaciarCarrito = () => {
        localStorage.removeItem('carrito');
        alert('Carrito vaciado');
        renderizarProductos();
    };

    renderizarProductos();
});
