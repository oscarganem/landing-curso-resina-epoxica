## Ruta oficial para administrar DNS en Neubox

La guía oficial de Neubox indica que el administrador DNS requiere que el dominio use los nameservers de administración DNS de Neubox: `ns301.cloud-mx-ns.net`, `ns302.cloud-mx-ns.net`, `ns303.cloud-mx-ns.net`, `ns304.cloud-mx-ns.net` y `ns305.cloud-mx-ns.net`. Este cambio puede afectar los registros existentes de web y correo, por lo que deben documentarse antes de realizarlo.

Una vez propagados esos nameservers, la ruta para habilitar el complemento es: Panel de Clientes → Dominios → Gestionar el dominio → Administrar → Complementos → Administrador DNS → “¡Adquiero GRATIS!”. Neubox indica que entonces estará disponible la sección “Registros DNS”.

Para crear un CNAME, la ruta es: Panel de Clientes → Dominios → Registros DNS → Editar Zona → Agregar registro → CNAME. Para el dominio raíz, Neubox ejemplifica el uso de `@` en el campo Nombre; los cambios se guardan desde el administrador DNS.

Cuando no está disponible el complemento Administrador DNS en el panel de dominios, Neubox documenta una ruta alternativa desde la cuenta de hosting: cPanel → sección Dominios → Editor de zonas → Administrar el dominio → Añadir registro → tipo CNAME. Esta alternativa permite crear el subdominio requerido sin cambiar los nameservers existentes, siempre que la zona actual esté alojada en ese cPanel.

Fuente adicional:
- https://neubox.com/tutoriales/base-de-conocimientos/editar-registros-dns-desde-cpanel/

## Verificación del registro creado

El registro mostrado en cPanel está correctamente configurado como `academia.ocares.mx.` con tipo `CNAME`, TTL `14400` y destino `cname.manus.space`. No modifica el dominio raíz, `www` ni el subdominio existente `app.ocares.mx`.

Fuentes consultadas:
- https://neubox.com/tutoriales/base-de-conocimientos/como-activar-la-administacion-dns-de-dominio-en-tu-panel-de-clientes-neubox/
- https://neubox.com/tutoriales/base-de-conocimientos/como-crear-modificar-y-eliminar-registros-en-la-administracion-dns-de-mi-dominio/
- https://neubox.com/tutoriales/base-de-conocimientos/como-cambiar-los-dns-de-tu-dominio/
