# Línea base de PageSpeed Insights — móvil

Fecha del informe: 29 de agosto de 2026, 19:29 UTC. URL evaluada: `https://academia.ocares.mx/curso-playadelcarmen-sep26`.

| Métrica | Resultado |
|---|---:|
| Rendimiento | 68/100 |
| First Contentful Paint | 2.3 s |
| Largest Contentful Paint | 6.5 s |
| Total Blocking Time | 190 ms |
| Cumulative Layout Shift | 0 |
| Speed Index | 5.0 s |
| Time to Interactive | 6.6 s |

## Oportunidades detectadas

1. PageSpeed identifica 480 ms de ahorro potencial en la hoja de estilo principal que bloquea el renderizado.
2. Identifica 191 KiB de JavaScript no usado y tres tareas largas en el hilo principal.
3. Señala 487 KiB de ahorro estimado al mejorar la entrega de imágenes, incluyendo logotipo y fotografías de técnicas.
4. Señala 205 KiB de recursos con vida de caché mejorable, principalmente scripts de terceros como Meta Pixel y analítica. Estos recursos son externos y no se eliminarán porque el píxel es un requisito de conversión recién configurado.

La primera optimización debe priorizar separar código de rutas y diferir la carga de la interfaz del formulario hasta que el usuario la solicite; esto reduce JavaScript inicial sin alterar la experiencia de la landing. La segunda debe consistir en revisar únicamente imágenes por debajo del primer pantallazo para bajar sus bytes sin afectar el hero ni la conversión.

## Optimización aplicada para medición posterior

La actualización publicada en la versión `bc72e20a` difiere la descarga de Meta Pixel hasta que el navegador termina la carga inicial y queda disponible, o hasta un máximo de 2.5 segundos. Si el visitante envía el formulario antes, el evento Lead inicializa el píxel de inmediato y conserva la conversión. Además, las secciones móviles posteriores al primer pantallazo usan `content-visibility: auto` para aplazar su pintura inicial sin ocultar contenido ni modificar la estructura visible.

Se inició una nueva auditoría móvil de PageSpeed para comparar los resultados publicados. 

## Resultado posterior y verificación de bundle

La auditoría posterior obtuvo 70/100 de rendimiento, frente a 68/100 en la línea base. El FCP bajó de 2.3 s a 2.1 s, el TBT de 190 ms a 118 ms y el Speed Index de 5.0 s a 4.5 s. El LCP del laboratorio varió de 6.5 s a 7.5 s; como el informe no registra datos de usuarios reales y ambas mediciones son de una sola ejecución, se considera variación de laboratorio y no se harán cambios visuales agresivos que pongan en riesgo conversión.

La separación del formulario y rutas secundarias redujo el bundle inicial de 195.78 KiB gzip a 182.32 KiB gzip. El formulario ahora se entrega como un chunk de 11.45 KiB gzip únicamente al solicitarlo; las rutas de agradecimiento, 404 y raíz de academia también se cargan bajo demanda.

La landing de campaña y el formulario diferido fueron comprobados en el navegador. La landing sigue mostrando el primer pantallazo sin cambios y el modal carga al pulsar el CTA, mantiene sus tres campos y conserva el CTA de envío. El logotipo del hero cambió de la imagen PNG de 395 KiB a una versión WebP de 16 KiB con las mismas dimensiones de presentación.

## Medición final publicada

La auditoría final de PageSpeed Insights para móvil, posterior a la versión `f71c5fe4`, alcanzó 79/100. Frente a la línea base de 68/100, el FCP pasó de 2.3 s a 2.2 s, el LCP de 6.5 s a 4.3 s, el TBT de 190 ms a 171 ms y el Speed Index de 5.0 s a 3.6 s. El CLS se mantuvo en 0. La puntuación de rendimiento mejoró 11 puntos sin cambios visuales en el primer pantallazo ni en el flujo de registro.

Las oportunidades restantes de PageSpeed se concentran en la duración de caché de recursos de terceros y en imágenes por debajo del primer pantallazo. No se aplicaron cambios adicionales porque podrían comprometer medición, prueba social o contenido comercial, y el objetivo inicial era mejorar de forma conservadora.

## Verificación del formulario diferido

Después de aislar las dependencias de tRPC y React Query dentro del modal cargado bajo demanda, se comprobó en navegador que la landing sigue cargando en la ruta de campaña y que el CTA abre el formulario con los campos, beneficios y botón de envío intactos. Meta Pixel no fue modificado durante este ajuste.

La compilación confirmó que el formulario y su cliente de conversión ahora se entregan en el chunk diferido `WaitlistModal`, separado del bundle principal de la landing. La auditoría posterior de PageSpeed se inició en producción, pero la interfaz devolvió “Introduce una URL válida” pese a usar la URL de campaña ya publicada; por ello no se tomará esa ejecución como una métrica comparable.

## Comparación reproducible del JavaScript inicial

Con una visita limpia a `academia.ocares.mx/curso-playadelcarmen-sep26` sin abrir el formulario, Performance Resource Timing registró un único archivo JavaScript propio inicial de 90,345 bytes transferidos (303,153 bytes descomprimidos). La medición anterior de PageSpeed atribuía 102.1 KiB al recurso JavaScript propio de la landing. El aislamiento del cliente de conversión redujo la transferencia inicial propia aproximadamente un 12%, sin modificar Meta Pixel, Facebook ni el evento Lead.

Después de diferir el acordeón de preguntas frecuentes, se verificó en navegador que los diez desplegables aparecen al aproximarse a la sección y que el primer pantallazo de la landing conserva su composición. La compilación reduce el bundle principal de 556.03 KiB a 520.67 KiB sin comprimir, y entrega el acordeón en el chunk diferido `FaqList` de 24.01 KiB.

La primera comprobación de `academia.ocares.mx` tras publicar la optimización todavía sirvió el bundle anterior `index-U6J8AO9d.js` de 90,045 bytes codificados. La verificación de producción queda pendiente de la propagación del despliegue del dominio personalizado; no se atribuirá ese resultado a la versión nueva.

Una nueva publicación ya sirve el bundle actualizado `index-DzS55eag.js` en `academia.ocares.mx/curso-playadelcarmen-sep26`. En una visita limpia y sin abrir el formulario, el JavaScript propio inicial bajó de 90,045 a 83,607 bytes codificados, una reducción adicional de 6,438 bytes (7.1%) y de 303,153 a 281,617 bytes descomprimidos. Los únicos recursos externos de JavaScript presentes siguen siendo Umami y Meta Pixel; Meta/Facebook no se modificaron.

La comprobación en producción confirmó que `window.fbq` permanece disponible y que no se emite un Lead durante la carga inicial. Las pruebas automatizadas existentes confirman que el evento Lead se dispara dentro del manejador de registro exitoso, por lo que la conversión mantiene su comportamiento sin enviar eventos de prueba a la cuenta de producción.

Para la validación final autorizada por el propietario, se abrió una visita limpia de producción y se inició una captura temporal de llamadas a `fbq` en `sessionStorage`. La captura se encontraba vacía antes de abrir o enviar el formulario, confirmando que la carga inicial no produjo un evento Lead.

La prueba autorizada de producción completó el formulario, confirmó el guardado y redirigió a `/curso-playadelcarmen-sep26/gracias`. Tras la redirección, la captura temporal registró exactamente una llamada `track, Lead`. Con ello queda comprobado el comportamiento de extremo a extremo: no hay Lead en carga inicial y se emite un Lead después de un registro exitoso confirmado.
