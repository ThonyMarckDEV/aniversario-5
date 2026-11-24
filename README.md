# 5 años juntos ❤️

Página web interactiva por nuestro 5.º aniversario, hecha con **React + Vite**.

## Secciones

1. **Pantalla de bloqueo**: se entra con nuestra fecha especial (DD/MM/AAAA).
2. **Portada**: contador en vivo de días, horas, minutos y segundos juntos.
3. **Galería polaroid**: todas las fotos; se voltean al tocarlas y se pueden ver en grande (con flechas, teclado o swipe).
4. **Corazón 3D**: un corazón interactivo hecho de fotos; se gira arrastrando y al tocar una foto la cámara se acerca a verla.
5. **Carta**: un sobre que se abre y muestra la carta.
6. **Sorpresa final**: lluvia de corazones 💖
7. **Música de fondo** (opcional).

## Cómo personalizarla

| Qué | Dónde |
| --- | --- |
| Fotos | Mételas **todas** en la carpeta `fotos/` (jpg, png, webp, gif, avif). Se cargan solas y se ordenan por nombre (`01.jpg`, `02.jpg`…). La primera también se usa como portada. |
| Nombres, fecha, contraseña, textos, carta y leyendas | `src/config.js` |
| Canción | Pon un `.mp3` en `public/musica/cancion.mp3` (o cambia `cancion` en `src/config.js`) |

> Tip: después de agregar fotos nuevas ejecuta `npm run fotos`: las convierte a WebP liviano (máx. 1600 px) y guarda los originales en `fotos-originales/` (no se sube a git).

## Ejecutar

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # genera la carpeta dist/ para publicarla
```

Para verla desde el celular en la misma red WiFi: `npm run dev -- --host`.

## Publicar

Arrastra la carpeta `dist/` a [Netlify Drop](https://app.netlify.com/drop) o conecta el repo a Vercel/Netlify.
