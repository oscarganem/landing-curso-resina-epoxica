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
