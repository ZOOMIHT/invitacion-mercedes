document.addEventListener("DOMContentLoaded", () => {
    const btnSello = document.getElementById('btn-sello');
    const pantallaSello = document.getElementById('pantalla-sello');
    const btnAbrir = document.getElementById('btn-abrir');
    const portada = document.getElementById('portada');
    const musica = document.getElementById('musica-fondo');

    document.body.style.overflowY = 'hidden'; // Bloquear scroll al inicio

    // 1. ABRIR EL SELLO (TELÓN DE ENTRADA)
    btnSello.addEventListener('click', () => {
        // Reproducir música desde el inicio para dar la sorpresa
        musica.play().catch(error => console.log("Audio automático bloqueado"));

        // Abrir telón
        pantallaSello.classList.add('abierto');

        // Después de 1 segundo (cuando acabe la animación del telón), quitamos el contenedor y disparamos animaciones
        setTimeout(() => {
            pantallaSello.style.display = 'none';
            portada.classList.add('iniciar-entrada'); // ¡Aquí inicia la magia de los textos apareciendo!
        }, 1000);
    });

    // 2. DESLIZAR PORTADA AL VER INVITACIÓN
    btnAbrir.addEventListener('click', () => {
        if (window.innerWidth > 900) {
            portada.classList.add('animacion-pc'); 
        } else {
            portada.classList.add('animacion-movil'); 
        }
        document.body.style.overflowY = 'auto'; // Permitir hacer scroll
    });

    // 3. EFECTO HOVER EN CELULAR (SIN LAG)
    const observerInteractividad = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('activa-movil');
            } else {
                entry.target.classList.remove('activa-movil');
            }
        });
    }, { 
        threshold: 0.6, 
        rootMargin: "-20% 0px -20% 0px" 
    });

    if (window.innerWidth <= 900) {
        document.querySelectorAll('.card-interactiva').forEach(el => observerInteractividad.observe(el));
    }

    // 4. RELOJ CON ANIMACIÓN 3D
    const fechaMisa = new Date("Jul 18, 2026 12:00:00").getTime();

    function actualizarNumero(idElemento, nuevoValor) {
        const elemento = document.getElementById(idElemento);
        if (elemento.innerText !== nuevoValor) {
            elemento.innerText = nuevoValor;
            elemento.classList.remove('pop-animacion');
            void elemento.offsetWidth; 
            elemento.classList.add('pop-animacion');
        }
    }

    const actualizarReloj = setInterval(() => {
        const ahora = new Date().getTime();
        const distancia = fechaMisa - ahora;

        if (distancia < 0) {
            clearInterval(actualizarReloj);
            document.querySelector(".contador-container").innerHTML = "<h3>¡Llegó el gran día!</h3>";
            return;
        }

        const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

        actualizarNumero("dias", dias < 10 ? "0" + dias : dias.toString());
        actualizarNumero("horas", horas < 10 ? "0" + horas : horas.toString());
        actualizarNumero("minutos", minutos < 10 ? "0" + minutos : minutos.toString());
        actualizarNumero("segundos", segundos < 10 ? "0" + segundos : segundos.toString());

    }, 1000);
});