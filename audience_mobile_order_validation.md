# Validación de orden responsive: experiencia previa

El ajuste usa una única regla dentro de `@media (max-width: 680px)`. En ese punto, la retícula de audiencia pasa a ser una columna flexible y el bloque introductorio usa `display: contents` para que sus elementos puedan ordenarse sin duplicar el contenido.

El orden móvil queda: etiqueta de audiencia, título, razones del curso, profesiones y, finalmente, el recuadro “No necesitas experiencia previa”. En escritorio se conserva la retícula original, con el recuadro dentro de la columna de introducción.

Se ejecutaron pruebas automatizadas, revisión de tipos y compilación de producción sin errores. Las capturas móvil y de escritorio confirmaron que la landing mantiene su primer pantallazo y que el escritorio no recibe las reglas del breakpoint móvil.
