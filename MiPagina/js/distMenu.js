// Función principal para cargar la página y gestionar eventos dinámicos
function fmenu(page) {
    fetch(`${page}.html`) // Corrección en la sintaxis
        .then(response => response.text())
        .then(data => {
            // Insertar el contenido de la página cargada
            document.getElementById('cuerpoPag').innerHTML = data;

            // Inicializar Parsley y asignar eventos después de cargar el contenido
            if (page === 'contactanos') {
                inicializarParsleyContacto(); // Para el formulario de contacto
            } else if (page === 'registro') {
                inicializarParsley(); // Para el formulario de registro
            } else if (page === 'login') {
                inicializarParsleyLogin(); // Para el formulario de inicio de sesión
            } else if (page === 'miPerfil') {
                inicializarParsley(); // Para el formulario de perfil
                inicializarEventosPerfil(); // Inicializar eventos del perfil
            }

            asignarEventos(); // Asignar otros eventos dinámicos si es necesario
        })
        .catch(error => console.log('Error al cargar la página', error));
}

// Función para inicializar Parsley en el formulario de registro
function inicializarParsley() {
    const registroForm = $('#registroForm');
    if (registroForm.length) {
        registroForm.parsley({ trigger: 'input' });
    }
}

// Función para inicializar Parsley en el formulario de inicio de sesión
function inicializarParsleyLogin() {
    const loginForm = $('#loginForm');
    if (loginForm.length) {
        loginForm.parsley()
            .on('form:validate', function (formInstance) {
                if (!formInstance.isValid()) {
                    alert('Por favor, corrige los errores antes de iniciar sesión.');
                }
            });
    }
}

// Función para inicializar Parsley en el formulario de contacto
function inicializarParsleyContacto() {
    const contactForm = $('#contactForm');
    if (contactForm.length) {
        // Eliminar eventos previos para evitar duplicidad
        contactForm.off();

        // Inicializar Parsley
        contactForm.parsley()
            .on('form:validate', function (formInstance) {
                if (!formInstance.isValid()) {
                    alert('Por favor, corrige los errores antes de enviar el formulario.');
                }
            });

        // Manejar el evento 'submit' para evitar recarga
        contactForm.on('submit', function (e) {
            e.preventDefault(); // Prevenir recarga de la página
            const parsleyForm = contactForm.parsley();
            if (parsleyForm.isValid()) {
                alert('Formulario enviado correctamente.');
                parsleyForm.reset(); // Reiniciar estado de Parsley
                contactForm[0].reset(); // Reiniciar el formulario
            }
        });
    }
}

// Función para inicializar eventos del perfil
function inicializarEventosPerfil() {
    // Botón "Editar Perfil"
    document.getElementById('editarPerfilBtn').addEventListener('click', () => {
        const inputs = document.querySelectorAll('#registroForm input');
        inputs.forEach(input => input.removeAttribute('disabled'));

        // Habilitar el botón de "Guardar Cambios"
        document.getElementById('guardarPerfilBtn').removeAttribute('disabled');
    });

    // Botón "Guardar Cambios"
    document.getElementById('guardarPerfilBtn').addEventListener('click', () => {
        const inputs = document.querySelectorAll('#registroForm input');

        // Validar el formulario usando Parsley
        if ($('#registroForm').parsley().isValid()) {
            alert('Tus datos se actualizaron correctamente.');

            // Deshabilitar los campos nuevamente
            inputs.forEach(input => input.setAttribute('disabled', 'disabled'));

            // Deshabilitar el botón de "Guardar Cambios"
            document.getElementById('guardarPerfilBtn').setAttribute('disabled', 'disabled');
        } else {
            alert('Por favor, verifica los datos ingresados.');
        }
    });
}