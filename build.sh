#!/bin/bash
# EHDU - Melodic Techno Landing Page
# Build & Deploy Script

echo "🎵 EHDU - Landing Page Build"
echo "============================="
echo ""
echo "📦 Instalando dependencias..."
npm install

echo ""
echo "🏗️  Compilando proyecto..."
npm run build

echo ""
echo "✅ Build completado!"
echo ""
echo "📊 Asset Summary:"
echo "==================="
du -sh dist/ 2>/dev/null || echo "Build directory size: checking..."
echo ""
echo "🚀 Iniciando servidor de desarrollo..."
npm run dev

echo ""
echo "🎉 Landing Page lista en: http://localhost:3001/"
echo ""
echo "Características:"
echo "✨ GSAP Animations con ScrollTrigger"
echo "🎨 Iconify Integration (7 redes sociales)"
echo "🌀 Dynamic Background con mouse tracking"
echo "🖱️  Custom Cursor con glow effects"
echo "📱 Fully Responsive Design"
echo "🚀 Optimized para Performance"
echo ""
