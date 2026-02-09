# Rediseño MediaSection - Análisis UX/UI & Propuesta

## Problemas Identificados

### 1. Títulos Animados vs No Animados
**Análisis:**
- El **Contact Section** usa el componente `Section.tsx` que tiene una animación GSAP de `backgroundSize` en el título (línea subrayada que crece)
- Las otras secciones (Latest, Tour, Media) usan títulos estáticos sin animación
- Esto crea **inconsistencia visual** - el usuario percibe que solo una sección tiene "vida"

**Solución:** Unificar todos los títulos con la misma animación o aplicar animaciones diferentes pero coherentes en todas las secciones.

---

### 2. Videos de Demo vs Videos Reales del Artista
**Análisis:**
- Actualmente los videos son placeholders de `picsum.photos` con URLs de YouTube genéricas
- Los videos reales del artista son:
  1. https://www.youtube.com/watch?v=3obwB1wVJPo (Polyptych - Savia Park)
  2. https://www.youtube.com/watch?v=DH-Gv98_bi0 (Too Many Rules)
  3. https://www.youtube.com/watch?v=6uz0PjRR__0

**Propuesta de Estructura:**

```
┌─────────────────────────────────────────────────────────────┐
│  MEDIA / VISUALS                                            │
│  Ecos Visuales                                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                                                     │   │
│  │           VIDEO DESTACADO (Principal)               │   │
│  │     ┌─────────────────────────────────────┐        │   │
│  │     │                                     │        │   │
│  │     │    [Thumbnail con Play Overlay]     │        │   │
│  │     │                                     │        │   │
│  │     └─────────────────────────────────────┘        │   │
│  │                                                     │   │
│  │  "Live Performance - Polyptych | Savia Park"       │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────┐  ┌─────────────────────┐          │
│  │   VIDEO 2           │  │   VIDEO 3           │          │
│  │   [Thumbnail]       │  │   [Thumbnail]       │          │
│  │   "Too Many Rules"  │  │   "Track Name"      │          │
│  └─────────────────────┘  └─────────────────────┘          │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  GALLERY                                                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐       │
│  │  Foto 1  │ │  Foto 2  │ │  Foto 3  │ │  Foto 4  │       │
│  │ Gallery1 │ │ Gallery2 │ │ gallery3 │ │ gallery4 │       │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

### 3. Mejoras UX/UI Propuestas

#### A. Jerarquía Visual Clara
- **Video Principal**: El video más importante (Polyptych) en tamaño grande (full width o 2/3)
- **Videos Secundarios**: Grid de 2 columnas debajo
- **Galería de Fotos**: Grid masonry o uniforme al final

#### B. Identificación Clara del Artista
- Agregar badges/etiquetas: "Official Video", "Live Performance", "Studio Session"
- Usar thumbnails reales de YouTube en lugar de imágenes genéricas
- Mostrar duración del video

#### C. Interacciones Impactantes
- **Hover en videos**: Escalado sutil + glow cyan + mostrar título
- **Lightbox**: Al hacer click, abrir video en modal fullscreen
- **Lazy loading**: Cargar iframes solo al hacer click (performance)

#### D. Animaciones Consistentes
Aplicar en TODOS los títulos de sección:
```typescript
// Opción 1: Línea subrayada animada (como Contact)
gsap.fromTo(titleRef, 
  { backgroundSize: '0% 2px' },
  { backgroundSize: '100% 2px', duration: 1.2 }
);

// Opción 2: Reveal de texto letra por letra
// Opción 3: Fade + slide up
```

---

### 4. Estructura de Datos Actualizada (constants.ts)

```typescript
export const MEDIA_GALLERY: MediaItem[] = [
  {
    id: 'v1',
    type: 'video',
    category: 'live',
    title: 'Polyptych | Savia Park',
    description: 'Live Performance',
    url: 'https://www.youtube.com/embed/3obwB1wVJPo',
    thumbnail: '/images/video-thumb-1.jpg', // Extraer de YouTube
    duration: '6:42',
    featured: true,
  },
  {
    id: 'v2',
    type: 'video',
    category: 'official',
    title: 'Too Many Rules',
    description: 'Official Video',
    url: 'https://www.youtube.com/embed/DH-Gv98_bi0',
    thumbnail: '/images/video-thumb-2.jpg',
    duration: '4:15',
    featured: false,
  },
  {
    id: 'v3',
    type: 'video',
    category: 'official',
    title: 'Track Title',
    description: 'Official Video',
    url: 'https://www.youtube.com/embed/6uz0PjRR__0',
    thumbnail: '/images/video-thumb-3.jpg',
    duration: '5:30',
    featured: false,
  },
];

export const PHOTO_GALLERY = [
  { id: 'p1', src: '/images/Gallery1.jpg', alt: 'Live Performance' },
  { id: 'p2', src: '/images/Gallery2', alt: 'Studio Session' },
  { id: 'p3', src: '/images/gallery3', alt: 'Backstage' },
  { id: 'p4', src: '/images/gallery4', alt: 'Festival' },
];
```

---

### 5. Implementación Recomendada

1. **Crear VideoCard component** reutilizable
2. **Crear VideoModal** para lightbox
3. **Actualizar MediaSection** con nueva estructura
4. **Agregar PhotoGallery** sub-sección
5. **Unificar animaciones** de títulos en todas las secciones
6. **Extraer thumbnails** de YouTube o usar imágenes locales

---

### 6. Checklist de Implementación

- [ ] Extraer thumbnails de videos de YouTube
- [ ] Renombrar archivos de galería (Gallery2, gallery3 sin extensión)
- [ ] Crear componente VideoCard
- [ ] Crear componente VideoModal/Lightbox
- [ ] Actualizar constants.ts con URLs reales
- [ ] Rediseñar MediaSection layout
- [ ] Agregar PhotoGallery grid
- [ ] Unificar animaciones de títulos
- [ ] Testear responsive
