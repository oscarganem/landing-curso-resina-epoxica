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
