# Sistema de Agentes Especializados - EHDU Project

## Visión General

Este directorio contiene agentes especializados para mantener la calidad del proyecto de landing page premium para un productor de melodic techno. Cada agente tiene responsabilidades específicas y puede ser invocado cuando se necesiten optimizaciones en su área.

## Agentes Disponibles

### 1. [`ANIMATION_AGENT.md`](ANIMATION_AGENT.md)
**Responsable de:** Animaciones y efectos visuales

- GSAP ScrollTrigger
- Framer Motion
- Optimización de efectos
- Modo lite / reduced-motion

### 2. [`RESPONSIVE_AGENT.md`](RESPONSIVE_AGENT.md)
**Responsable de:** Diseño responsivo

- Breakpoints y media queries
- Viewport mobile (100dvh, safe-area)
- Touch vs mouse
- Targets mínimos

### 3. [`ACCESSIBILITY_AGENT.md`](ACCESSIBILITY_AGENT.md)
**Responsable de:** Accesibilidad

- Navegación por teclado
- ARIA labels
- Screen readers
- WCAG compliance

### 4. [`PERFORMANCE_AGENT.md`](PERFORMANCE_AGENT.md)
**Responsable de:** Rendimiento

- Code splitting
- Lazy loading
- Core Web Vitals
- Optimización de bundles

### 5. [`SECURITY_AGENT.md`](SECURITY_AGENT.md)
**Responsable de:** Seguridad

- Headers de seguridad
- CSP
- Validación de inputs
- Dependencias seguras

### 6. [`SEO_AGENT.md`](SEO_AGENT.md)
**Responsable de:** SEO

- Meta tags
- Open Graph
- Sitemap
- Schema.org

### 7. [`I18N_AGENT.md`](I18N_AGENT.md)
**Responsable de:** Internacionalización

- Multiidioma
- Traducciones
- SEO multiidioma

---

## Cómo Usar Estos Agentes

### En Kilo Code

Cuando necesites trabajar en una tarea específica, puedes:

1. **Invocar al agente apropiado** antes de hacer cambios:
   ```
   "Antes de agregar animaciones, consulta el Animation Agent"
   ```

2. **Antes de hacer un feature completo**, ejecuta el agente relevante:
   ```
   "El Responsive Agent verificó que mobile funciona correctamente"
   ```

3. **Durante code review**, cada agente puede verificar su área:
   ```
   "El Performance Agent revisó el bundle y está OK"
   ```

---

## Orquestación con Un Solo Prompt (Automática)

Este proyecto usa un **modo multi‑rol interno** que decide qué agentes activar con un solo prompt. La idea es **no invocar todos los agentes** por defecto, solo los relevantes al cambio.

### Roles Internos

- **ARCHITECTURE_PERFORMANCE**: presupuesto de performance y estructura.
- **VISUAL_ANIMATION**: calidad de motion y consistencia visual.
- **SEO_ACCESSIBILITY**: semántica, a11y y SEO.

### Reglas de Orquestación

- Activar **solo** roles relevantes al request.
- Evitar repetir recomendaciones ya validadas.
- Ser conciso y técnico.
- No reescribir componentes completos si no es necesario.

### Formato de Salida (Obligatorio)

```
1) Activated Roles:
[List only the roles used]

2) Critical Issues (if any):
[Bullet points]

3) Recommended Action:
[Concrete steps or code if required]

4) Performance Impact:
[Short explanation of impact]

Checklist:
[Concise actionable checklist]
```

---

## CLI Local: `npm run agents`

Este comando toma un prompt por **stdin** y genera:

1. Un **template estructurado** con el formato obligatorio.
2. Una **checklist concisa** de validaciones.
3. Un **registro append‑only** en [`agents/checklist.md`](checklist.md).

### Uso

```bash
# Con pipe (stdin)
echo "Actualizar la animación del Hero" | npm run agents

# Con argumento posicional
npm run agents "Actualizar la animación del Hero"
```

### Con foco de archivo

```bash
npm run agents "Optimizar el Hero" -- --file=components/sections/HeroSection.tsx
```

### Qué se guarda en `agents/checklist.md`

- Timestamp (UTC)
- Proyecto
- Rama git
- Archivo en foco (si aplica)
- Extracto del prompt (primeras 20 líneas)
- Formato estructurado + checklist

---

## Guía de Ahorro de Tokens

- Reutilizar el checklist previo cuando ya se validó una sección.
- Evitar re‑invocar agentes si no hay cambios en su área.
- Escribir prompts con contexto mínimo y **archivo en foco**.
- Registrar validaciones en [`agents/checklist.md`](checklist.md) para no repetir.

### Flujo de Trabajo Recomendado

```
1. Planificar tarea
       ↓
2. Identificar agente(s) relevante(s)
       ↓
3. Consultar guidelines del agente
       ↓
4. Implementar con las restricciones del agente
       ↓
5. Verificar con checklist del agente
       ↓
6. Continuar con siguiente área si aplica
```

---

## Estándares del Proyecto

### Targets de Calidad

| Área | Target |
|------|--------|
| Lighthouse Performance | >= 90 |
| Lighthouse Accessibility | >= 90 |
| Lighthouse SEO | >= 90 |
| Lighthouse Best Practices | >= 90 |
| First Contentful Paint | < 1.5s |
| Time to Interactive | < 3.5s |
| Cumulative Layout Shift | < 0.1 |
| First Input Delay | < 100ms |

### Breakpoints del Proyecto

| Breakpoint | Width |
|------------|-------|
| xs | < 640px |
| sm | 640px - 767px |
| md | 768px - 1023px |
| lg | 1024px - 1279px |
| xl | >= 1280px |

### Dispositivos de Prueba

- Mobile: iPhone SE, iPhone 12-15, Pixel
- Tablet: iPad Mini, iPad Pro
- Desktop: 1366px, 1920px, 2560px

---

## Notas

- Los agentes son **guías**, no reglas estrictas
- En proyectos reales, puede haber trade-offs
- Siempre priorizar **experiencia de usuario** sobre métricas
- Mantener comunicación con el equipo sobre decisiones importantes

---

## Extender el Sistema

Para agregar nuevos agentes:

1. Crear archivo `{AGENT_NAME}.md` en esta carpeta
2. Incluir:
   - Objetivo
   - Responsabilidades
   - Checklist de verificación
   - Herramientas recomendadas
   - Cosas a evitar
3. Actualizar este README con el nuevo agente
