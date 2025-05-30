// Archivo: scripts.js
// Descripción: Funcionalidades JavaScript para el portfolio personal, incluyendo desplazamiento suave,
//              validación de formulario, botón "Volver arriba" dinámico y animaciones de aparición en scroll.
// Autor: Oscar Osvaldo Segovia (Adaptado y Mejorado)
// Fecha: 28/05/2025

document.addEventListener('DOMContentLoaded', () => {
    // 1. Implementación de Desplazamiento Suave (Smooth Scrolling)
    // Selecciona todos los enlaces de navegación que apuntan a una sección dentro de la misma página,
    // incluyendo el botón "Volver arriba" y el botón CTA.
    document.querySelectorAll('nav a[href^="#"], .back-to-top-link[href^="#"], .cta-button[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Previene el comportamiento predeterminado del enlace (salto brusco).

            // Obtiene el ID de la sección a la que se debe desplazar (ej. "#sobre-mi" o "#top").
            const targetId = this.getAttribute('href');
            // Encuentra el elemento de la sección correspondiente.
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Utiliza el método scrollIntoView para un desplazamiento suave.
                // 'behavior: smooth' activa la animación de desplazamiento.
                // 'block: start' alinea el inicio del elemento con el inicio del área visible.
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 2. Implementación de Validación de Formulario
    // Selecciona el formulario de contacto por su ID.
    const contactForm = document.getElementById('contact-form');

    // **IMPORTANTE:** Solo intenta añadir el event listener si el formulario existe en la página.
    if (contactForm) {
        // Selecciona los campos de entrada y los elementos para mostrar mensajes de error/éxito.
        const nombreInput = document.getElementById('nombre');
        const apellidoInput = document.getElementById('apellido');
        const emailInput = document.getElementById('email');
        const nombreError = document.getElementById('nombreError');
        const apellidoError = document.getElementById('apellidoError');
        const emailError = document.getElementById('emailError');
        const formMessage = document.getElementById('form-message');

        // Añade un 'event listener' para el evento 'submit' del formulario.
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Previene el envío predeterminado del formulario.

            // Reinicia los mensajes de error y éxito.
            nombreError.textContent = '';
            apellidoError.textContent = '';
            emailError.textContent = '';
            formMessage.textContent = '';
            formMessage.style.display = 'none'; // Oculta el mensaje de éxito inicialmente.
            formMessage.classList.remove('success-message', 'error-message'); // Limpia clases de estilo.

            let isValid = true; // Variable para controlar si el formulario es válido.

            // Validación del campo Nombre
            if (nombreInput.value.trim() === '') {
                nombreError.textContent = 'El nombre es obligatorio.';
                isValid = false;
            }

            // Validación del campo Apellido
            if (apellidoInput.value.trim() === '') {
                apellidoError.textContent = 'El apellido es obligatorio.';
                isValid = false;
            }

            // Validación del campo Email
            if (emailInput.value.trim() === '') {
                emailError.textContent = 'El email es obligatorio.';
                isValid = false;
            } else if (!isValidEmail(emailInput.value.trim())) {
                // Comprueba si el email tiene un formato válido usando una función auxiliar.
                emailError.textContent = 'Por favor, introduce un email válido.';
                isValid = false;
            }

            // Si el formulario es válido, muestra un mensaje de éxito.
            if (isValid) {
                formMessage.textContent = '¡Mensaje enviado con éxito! Gracias por contactarme.';
                formMessage.classList.add('success-message'); // Añade clase de estilo de éxito.
                formMessage.style.display = 'block'; // Muestra el mensaje de éxito.
                contactForm.reset(); // Opcional: Limpia el formulario después del envío exitoso.
            } else {
                // Si el formulario no es válido, puedes añadir una clase de error general si lo deseas.
                // formMessage.textContent = 'Por favor, corrige los errores en el formulario.';
                // formMessage.classList.add('error-message');
                // formMessage.style.display = 'block';
            }
        });
    }


    /**
     * Función auxiliar para validar el formato de un email.
     * @param {string} email - La cadena de texto del email a validar.
     * @returns {boolean} - True si el email es válido, false en caso contrario.
     */
    function isValidEmail(email) {
        // Expresión regular para una validación de email básica.
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // 3. Botón "Volver arriba" dinámico
    // Selecciona el contenedor del botón, ya que este tiene la posición fija y es el que se muestra/oculta.
    const backToTopContainer = document.querySelector('.back-to-top-container');

    // **IMPORTANTE:** Solo intenta añadir el event listener si el contenedor del botón existe en la página.
    if (backToTopContainer) {
        // Muestra u oculta el botón basado en la posición del scroll.
        window.addEventListener('scroll', () => {
            // Si el scroll vertical es mayor a 300px, añade la clase 'show' al contenedor.
            if (window.scrollY > 300) {
                backToTopContainer.classList.add('show');
            } else {
                backToTopContainer.classList.remove('show');
            }
        });
    }


    // 4. Animación de aparición de secciones al hacer scroll (Intersection Observer API)
    // Selecciona todas las secciones que deben animarse.
    const sections = document.querySelectorAll('.section');

    // Opciones para el Intersection Observer.
    const observerOptions = {
        root: null, // El viewport es el root.
        rootMargin: '0px', // No hay margen extra alrededor del root.
        threshold: 0.15 // El 15% de la sección debe ser visible para activar la animación.
    };

    // Crea un nuevo Intersection Observer.
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Si la sección es visible (intersecting), añade la clase 'visible'.
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Deja de observar la sección una vez que se ha hecho visible.
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observa cada sección.
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});
