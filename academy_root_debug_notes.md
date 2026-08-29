## Verificación de raíz de academia

La raíz publicada `https://academia.ocares.mx/` sigue mostrando la landing de Playa del Carmen aunque el hostname del navegador es exactamente `academia.ocares.mx`. El bundle servido por ese dominio no contiene ni la constante `academia.ocares.mx` ni el texto de la portada neutra, lo que indica que el dominio personalizado está sirviendo una versión previa de los activos o que la publicación aún no alcanzó el dominio.

Después de publicar la versión con página 404, la raíz todavía muestra la portada neutra anterior incluso con un parámetro de consulta para evitar caché del navegador. La publicación de este dominio personalizado está sirviendo la revisión inmediatamente anterior; se requiere volver a publicar y comprobar nuevamente la versión servida.

El dominio predeterminado de Manus carga la landing correctamente. La inspección programática de su bundle desde el navegador falló por un error de carga, por lo que no se usó como evidencia de que la nueva lógica se hubiese publicado. Se mantiene como evidencia principal que el dominio personalizado continúa sirviendo la portada neutra anterior.
