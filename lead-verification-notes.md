# Verificación técnica de Lead

- La landing de campaña cargó en la vista previa en `/curso-playadelcarmen-sep26`.
- El formulario mostró nombre, correo y WhatsApp con prefijo fijo `+52`.
- Se envió un registro técnico autorizado con los datos proporcionados previamente por el propietario.
- Tras el envío, la aplicación redirigió directamente a `/curso-playadelcarmen-sep26/gracias`.
- La página de gracias mostró el flujo esperado: `01 Registro — Completado`, `02 WhatsApp — Próximo paso`, `03 Clase online — Próximo paso`.
- El código vigente consume la señal `sessionStorage` antes de intentar enviar `Lead`; por diseño, una visita directa, recarga o regreso del navegador no encuentra la señal.
- La observación visual confirmó la página de destino, pero la interfaz disponible no expuso directamente el panel de Meta Pixel Helper; la verificación automatizada cubre la lógica de una sola consumición y la compilación del flujo.
- Fecha de la prueba: 2026-09-01.

La visita posterior directa a la ruta de gracias cargó el contenido normalmente. Al simular Atrás en la vista previa, la URL permaneció en la página de gracias y no apareció ningún formulario ni señal adicional; esto es consistente con la eliminación inmediata de la clave de sesión.
