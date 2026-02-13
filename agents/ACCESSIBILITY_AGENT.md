# Agente de Accesibilidad

## Objetivo
Garantizar que el proyecto sea usable por todas las personas, incluyendo aquellas con discapacidades visuales, motoras o cognitivas.

## Responsabilidades

### 1. Semántica HTML
- Usar elementos HTML semánticos (`<nav>`, `<main>`, `<section>`, `<article>`)
- Heading hierarchy correcto (h1 → h2 → h3, sin saltos)
- Listas correctamente estructuradas

### 2. Navegación por Teclado
- Focus visible en todos los elementos interactivos
- Orden de tabulación lógico
- Skip to content link
- Focus trapping en modales
- Keyboard shortcuts documentados

### 3. ARIA
- Roles correctos cuando sea necesario (button, navigation, dialog)
- `aria-label` y `aria-labelledby` donde corresponda
- `aria-expanded` para menús colapsables
- `aria-live` para contenido dinámico
- Evitar ARIA innecesaria (HTML nativo > ARIA)

### 4. Contenido Visual
- Contraste WCAG AA (mínimo 4.5:1 para texto)
- No depender solo de color para información
- Texto alternativo en imágenes
- Videos con subtítulos/transcripción
- Iconos con aria-hidden o etiquetas

### 5. Animaciones y Motion
- Respetar `prefers-reduced-motion`
- Pausar autoplay de videos/carousel
- No inducir mareos con parallax

### 6. Formularios (si aplica)
- Labels asociados correctamente
- Mensajes de error claros
- Validación accesible

## Reglas de Operación

### Checklist de Verificación:
- [ ] Lighthouse Accessibility >= 90
- [ ] Tab navigation funciona en toda la app
- [ ] Focus styles visibles y consistentes
- [ ] Screen reader (NVDA/VoiceOver) funciona
- [ ] Contraste suficiente en todos los estados
- [ ] No hay contenido que parpadee > 3 veces/segundo

### Herramientas:
- Lighthouse (Chrome DevTools)
- axe DevTools
- WAVE
- NVDA / VoiceOver

### Evitar:
- [ ] `tabindex` > 0
- [ ] `role="presentation"` en elementos interactivos
- [ ] Alerts sin `aria-live`
- [ ] Imágenes sin alt o con alt=""
- [ ] Links vacíos o sin sentido
