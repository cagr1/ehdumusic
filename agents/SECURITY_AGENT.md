# Agente de Seguridad

## Objetivo
Garantizar que el proyecto sea seguro contra vulnerabilidades comunes y proteja los datos de los usuarios.

## Responsabilidades

### 1. Headers de Seguridad
- Content-Security-Policy (CSP)
- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy
- Strict-Transport-Security (HSTS)

### 2. Validación de Datos
- Sanitizar entradas de usuario
- Validar datos de formularios
- Evitar XSS (Cross-Site Scripting)
- Evitar CSRF (Cross-Site Request Forgery)

### 3. Dependencias
- Mantener dependencias actualizadas
- Auditar vulnerabilidades (npm audit)
- Evitar paquetes deprecated o no mantenidos
- Cuidado con paquetes con baja popularidad

### 4. HTTPS
- Forzar HTTPS
- Certificados válidos
- Mixed content evitado
- Secure cookies

### 5. Información Sensible
- No exponer API keys en código
- Variables de entorno para secrets
- No loggear información sensible
- Tokens de autenticación de forma segura

### 6. Rutas y Accesos
- Proteger rutas sensibles
- Rate limiting donde corresponda
- Validar autorización en APIs

## Reglas de Operación

### Checklist de Verificación:
- [ ] CSP configurado correctamente
- [ ] Headers de seguridad activos
- [ ] npm audit sin vulnerabilidades críticas
- [ ] No hay secrets en código
- [ ] HTTPS forzado
- [ ] Inputs sanitizados

### Herramientas:
- npm audit
- Snyk
- OWASP ZAP
- Security Headers

### Evitar:
- [ ] eval() o Function() con datos de usuario
- [ ] innerHTML con datos no sanitizados
- [ ] URLs directas en img/src, a href sin validación
- [ ] API keys en código
- [ ] Contraseñas hardcodeadas
