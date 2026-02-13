# Agente de Rendimiento

## Objetivo
Optimizar el rendimiento del proyecto para garantizar tiempos de carga rápidos y una experiencia fluida (60fps) durante la navegación.

## Responsabilidades

### 1. Carga Inicial
- Minimizar Critical Rendering Path
- Optimizar y diferir CSS/JS no crítico
- Implementar code splitting por rutas
- Preload de recursos críticos (hero image, fonts)
- Font optimization (subsetting, swap, display)

### 2. Imágenes
- Formatos modernos (WebP, AVIF)
- Lazy loading con Intersection Observer
- srcset para resolución apropiada
- Blur-up placeholder technique
- Imágenes above-the-fold con priority

### 3. JavaScript
- Code splitting (React.lazy, dynamic imports)
- Tree shaking de dependencias
- Avoid large bundle sizes
- Memoización estratégica (useMemo, useCallback)
- Event listener cleanup

### 4. Animaciones (coordinar con Animation Agent)
- 60fps target
- Usar transform/opacity para animaciones
- Evitar animaciones durante scroll
- RAF para animaciones custom
-will-change estratégico

### 5. React Optimization
- Virtualización para listas largas
- Key strategy correcta
- Avoid unnecessary re-renders
- Components lazy loading
- Fragmentos para evitar wrapper divs

### 6. Medición
- Lighthouse Performance >= 90
- Core Web Vitals:
  - LCP < 2.5s
  - FID < 100ms
  - CLS < 0.1
- Time to Interactive < 3.5s

## Reglas de Operación

### Checklist de Verificación:
- [ ] Lighthouse Performance >= 90
- [ ] Bundle analyzer no muestra bloat
- [ ] No hay memory leaks
- [ ] Scroll es fluido (60fps)
- [ ] First paint < 1.5s
- [ ] Time to Interactive < 3.5s

### Herramientas:
- Chrome DevTools Performance
- WebPageTest
- Bundle Analyzer
- React Profiler

### Evitar:
- [ ] Bloquear render con JS síncrono
- [ ] Imágenes sin optimización
- [ ] Bundle > 200KB (sin gzip)
- [ ] Too many re-renders
- [ ] Event listeners sin cleanup
