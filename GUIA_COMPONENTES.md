# 🎵 EHDU - Melodic Techno Landing Page
## Guía de Componentes y Uso

### 📦 Componentes Disponibles

#### **Componentes de Animación**

1. **PageLoader**
   ```tsx
   import PageLoader from './components/PageLoader';
   <PageLoader />
   ```
   - Loader animado al cargar página
   - Anillos giratorios con glow effect
   - Se auto-desaparece después de 2 segundos

2. **DynamicBackground**
   ```tsx
   import DynamicBackground from './components/DynamicBackground';
   <DynamicBackground />
   ```
   - Fondo dinámico con 3 orbs
   - Responden al movimiento del mouse
   - Efecto parallax continuo

3. **CustomCursor**
   ```tsx
   import CustomCursor from './components/CustomCursor';
   <CustomCursor />
   ```
   - Cursor personalizado con glow
   - Escala al hacer hover en elementos interactivos

4. **Section**
   ```tsx
   import Section from './components/Section';
   <Section id="my-section" subtitle="Subtitle" title="Main Title">
     {children}
   </Section>
   ```
   - Componente base para secciones
   - Animaciones automáticas en scroll
   - Gradient en títulos

5. **ScrollReveal**
   ```tsx
   import ScrollReveal from './components/ScrollReveal';
   <ScrollReveal delay={0.2}>
     {content}
   </ScrollReveal>
   ```
   - Reveala elementos al scroll
   - Blur to clear animation
   - Configurable delay

6. **ParallaxSection**
   ```tsx
   import ParallaxSection from './components/ParallaxSection';
   <ParallaxSection speed={0.5}>
     {content}
   </ParallaxSection>
   ```
   - Efecto parallax en scroll
   - Speed personalizable

7. **BlurText**
   ```tsx
   import BlurText from './components/BlurText';
   <BlurText text="Animated Text" delay={0.3} />
   ```
   - Texto que aparece desenfocado
   - Animación character by character

8. **GlitchText**
   ```tsx
   import GlitchText from './components/GlitchText';
   <GlitchText text="Glitch Effect" />
   ```
   - Efecto glitch periódico
   - Text shadow dinámico

9. **SplitText**
   ```tsx
   import SplitText from './components/SplitText';
   <SplitText>Your text here</SplitText>
   ```
   - Anima palabras individualmente
   - Scroll trigger opcional

10. **StaggerList**
    ```tsx
    import StaggerList from './components/StaggerList';
    <StaggerList>
      <div>Item 1</div>
      <div>Item 2</div>
    </StaggerList>
    ```
    - Anima lista de items con stagger
    - Delay configurable

11. **RevealImage**
    ```tsx
    import RevealImage from './components/RevealImage';
    <RevealImage src="image.jpg" alt="desc" />
    ```
    - Imagen que se revela al cargar
    - Blur to sharp transition

12. **MagneticButton**
    ```tsx
    import MagneticButton from './components/MagneticButton';
    <MagneticButton>Click me</MagneticButton>
    ```
    - Botón que sigue al mouse
    - Elastic return animation

13. **ParticleField**
    ```tsx
    import ParticleField from './components/ParticleField';
    <ParticleField count={30} />
    ```
    - Campo de partículas flotantes
    - Count personalizable

14. **FeaturesList**
    ```tsx
    import FeaturesList from './components/FeaturesList';
    <FeaturesList />
    ```
    - Grid de características con animaciones

### 🎨 Colores Principales
- **Cyan**: `#00F0FF`
- **Purple**: `#8B00FF`
- **Black**: `#000000`
- **White**: `#FFFFFF`

### 📱 Responsive Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### 🔧 Configuración GSAP

#### ScrollTrigger
```tsx
scrollTrigger: {
  trigger: element,
  start: 'top 80%',  // cuando el top toca el 80% del viewport
  once: true,        // solo una vez
  scrub: 0.5,       // smooth scrubbing
}
```

#### Eases Comunes
- `power2.out` - Salida rápida
- `power3.out` - Salida más pronunciada
- `back.out` - Efecto de retroceso
- `elastic.out` - Efecto elástico
- `sine.inOut` - Suave entrada y salida

### 💡 Mejores Prácticas

1. **Usar ScrollTrigger para elementos que aparecen en scroll**
   - Mejora el rendimiento
   - Evita animar elementos ocultos

2. **Stagger para listas**
   - Crea movimiento visual atractivo
   - Mantener < 0.15s entre items

3. **Usar GSAP para coordinar múltiples propiedades**
   - Mejor rendimiento que Framer Motion solo
   - Más control sobre timings

4. **Custom cursor solo en desktop**
   - Deshabilitado automáticamente en mobile

5. **Iconify para todos los iconos**
   - Carga dinámica
   - No requiere importar SVGs

### 🚀 Performance Tips

1. ScrollTrigger: use `once: true` cuando sea posible
2. Evitar animar propiedades como width/height
3. Usar transform y opacity para mejor rendimiento
4. Debounce mousemove events
5. Usar will-change con moderación

### 📚 Recursos
- GSAP Docs: https://greensock.com/gsap/
- Iconify: https://iconify.design/
- Framer Motion: https://www.framer.com/motion/

---
**Landing Page EHDU - Todas las transiciones fluyen perfectamente tipo Awwwards** ✨
