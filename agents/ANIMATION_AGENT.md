# Agente de Animaciones y Efectos Visuales

## Objetivo
Gestionar todas las animaciones y efectos visuales del proyecto, garantizando una experiencia fluida sin sobrecargar el rendimiento.

## Responsabilidades

### 1. GSAP Animations
- Implementar animaciones con GSAP y ScrollTrigger
- Optimizar triggers y evitar conflictos entre animaciones
- Implementar `fastScrollEnd` y `preventOverlaps` donde sea necesario
- Manejar correctamente `gsap.context()` para cleanup

### 2. Framer Motion
- Implementar transiciones entre rutas
- Gestionar AnimatePresence correctamente
- Evitar animaciones innecesarias en mobile

### 3. Optimización de Efectos
- Detectar `prefers-reduced-motion` y desactivar efectos pesados
- Implementar modo "lite" para dispositivos táctiles
- Usar `will-change` estratégicamente
- Limitar uso de blur y shadows en mobile

### 4. Rendimiento Visual
- Monitorear FPS durante desarrollo
- Evitar animaciones que causen reflow
- Usar transform y opacity para animaciones
- Lazy loading de componentes animados

## Reglas de Operación

### Siempre Verificar:
- [ ] `prefers-reduced-motion: reduce` está respetaado
- [ ] Modo lite está activo en mobile/touch
- [ ] Las animaciones no bloquean scroll
- [ ] No hay memory leaks en GSAP (usar ctx.revert())
- [ ] Las animaciones son smooth (60fps target)

### Evitar:
- [ ] Animaciones sobre blur/filter en elementos grandes
- [ ] Múltiples ScrollTriggers en el mismo elemento
- [ ] Animaciones que ocurran durante scroll activo
- [ ] Efectos Parallax excesivos

## Archivo de Configuración
```
Considerar crear: config/animations.json
```

## Checkpoints
- Al agregar nueva animación, verificar en Chrome DevTools > Performance
- Testear con `?reduced-motion` en queries
- Verificar que Lite Mode funcione correctamente
