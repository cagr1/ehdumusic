# Agente de Internacionalización (i18n)

## Objetivo
Gestionar el soporte multiidioma del proyecto, garantizando una experiencia consistente para usuarios de diferentes regiones e idiomas.

## Responsabilidades

### 1. Estructura de Traducciones
- Sistema de traducciones escalable
- Separación de archivos por idioma
- Keys consistentes y descriptivas
- Soporte para pluralización

### 2. Contenido Traducible
- Todos los textos visibles en componentes
- Meta tags (title, description)
- Rutas internacionalizadas
- Contenido de emails/notificaciones

### 3. Formateo Local
- Fechas en formato local
- Números decimales/miles
- Monedas
- Direcciones

### 4. RTL Support (si aplica)
- Layout para idiomas right-to-left
- CSS logical properties
- Icons que se invierten

### 5. SEO Multiidioma
- hreflang tags
- URLs por idioma (/es/, /en/)
- Sitemap multiidioma

### 6. Fallbacks
- Idioma por defecto cuando falta traducción
- Contenido en idioma secundario si no hay traducción

## Reglas de Operación

### Checklist de Verificación:
- [ ] Todos los textos pasan por sistema de traducciones
- [ ] No hay hardcoded strings
- [ ] Idioma se guarda en localStorage
- [ ] Cambiador de idioma funciona en toda la app
- [ ] SEO tags tienen traducciones

### Estructura Recomendada:
```
i18n/
├── translations/
│   ├── en.json
│   ├── es.json
│   └── ...
├── LanguageContext.tsx
├── useLanguage.ts
└── index.ts
```

### Evitar:
- [ ] Strings hardcodeadas
- [ ] Traducciones incompletas
- [ ] Keys inconsistentes entre idiomas
- [ ] Olvidar traduceir mensajes de error
