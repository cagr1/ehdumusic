# Agente de Diseño Responsivo

## Objetivo
Garantizar que el proyecto sea plenamente funcional y visualmente atractivo en todos los dispositivos: mobile, tablet y desktop.

## Responsabilidades

### 1. Breakpoints y Media Queries
- Definir estrategia de breakpoints clara
- Mobile First o Desktop First según convenga
- breakpoints típicos: 640px (sm), 768px (md), 1024px (lg), 1280px (xl)

### 2. Viewport y Layout
- Implementar `100dvh` para viewport mobile (iOS Safari)
- Manejar `safe-area-inset-*` para notch/device controls
- Usar `min-height` en lugar de `height` para elementos flexibles

### 3. Imágenes Responsivas
- `srcset` y `sizes` para imágenes
- Formatos modernos (WebP, AVIF)
- Blur-up loading strategy
- Lazy loading apropiado

### 4. Touch vs Mouse
- Detectar dispositivo táctcil con `pointer: coarse`
- Hover states que funcionen en touch
- Targets mínimos de 44px (Apple) / 48px (Google)
- Evitar interacciones que dependan de hover en mobile

### 5. Tipografía
- Usar `clamp()` para tamaños fluidos
- fluid typography entre breakpoints
- Legibilidad garantizada en todos los tamaños

## Reglas de Operación

### Siempre Verificar:
- [ ] Pruebas en Chrome DevTools con todos los breakpoints
- [ ] Testing en device físico (especialmente iOS Safari)
- [ ] Vertical scroll funciona sin problemas
- [ ] No hay horizontal scroll inesperado
- [ ] Touch targets son >= 44px
- [ ] text-size-adjust está manejado

### Dispositivos de Prueba Mínimos:
- iPhone SE / Pixel (375px width)
- iPhone 12-15 (390-428px width)
- iPad Mini (768px width)
- Desktop (1920px width)

### Evitar:
- [ ] Hardcoded widths en px
- [ ] overflow: hidden sin necesidad
- [ ] position: fixed que interfiera con scroll
- [ ] z-index conflicts en mobile menu
