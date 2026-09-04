# Invitación de cumpleaños interactiva

Tarjeta digital: portada con foto → se toca y se voltea mostrando la
invitación (fecha, hora fija y elección de restaurante) dentro de un
marco dorado.

## 📁 Estructura del proyecto

```
proyecto-invitacion/
├── index.html          → la página principal (ábrela en el navegador para verla)
├── css/
│   └── style.css       → todos los estilos (colores, tamaños, marco dorado)
├── js/
│   └── main.js          → toda la lógica (animación, botón confirmar, WhatsApp/Formspree)
├── assets/
│   └── images/
│       ├── cover.jpg    → foto de la portada
│       └── frame.jpg    → imagen del marco dorado
└── README.md            → este archivo
```

## ✏️ Qué puedes editar tú misma

**Texto de la invitación** — en `index.html`, busca:
```html
<h1 ... id="titleText">Celebremos juntos</h1>
<p class="dedication" ... id="dedicationText">Porque cada vuelta...</p>
```
Cambia el texto entre las etiquetas por el que quieras.

**Nombres de los restaurantes** — también en `index.html`, busca `Astoria` y
`Compañía Criolla` dentro de la sección `restaurants`.

**Hora fija del evento** — en `js/main.js`, línea:
```js
const HORA_FIJA = "2:00 p.m.";
```

**Colores** — en `css/style.css`, arriba del todo, en `:root { ... }`.

## ⚙️ Configuración pendiente (importante antes de publicar)

En `js/main.js`, al principio del archivo:

```js
const phoneNumber = "573133545419";
```

Ese es tu número de WhatsApp (código de país, sin `+` ni espacios). Al
confirmar, se abre WhatsApp en el celular del invitado con el mensaje
ya escrito (fecha, hora, restaurante) — la otra persona solo tiene que
darle "enviar" para que te llegue a ti.

> Nota: por cómo funciona WhatsApp, ninguna página web puede enviar el
> mensaje por sí sola sin que la otra persona presione "enviar" — es
> una limitación de la plataforma, no del código.

## 🔒 Modo edición oculto

Si abres el link agregando `?editar=1` al final
(ej: `tulink.com/index.html?editar=1`), aparece un botón "Editar texto"
para ajustar el título y la dedicatoria directo desde el navegador,
sin tocar el código. Sin ese parámetro, los invitados no lo ven.

## 🌐 Cómo publicarlo (para tener un link real)

**Opción fácil — Netlify Drop:**
1. Entra a https://app.netlify.com/drop
2. Arrastra toda la carpeta `proyecto-invitacion` (o solo su contenido)
3. Te da un link público al instante

**Opción con repositorio — GitHub Pages:**
1. Crea un repositorio en GitHub y sube todo el contenido de esta carpeta
2. Ve a Settings → Pages → elige la rama `main` como fuente
3. Tu link quedará como `https://tuusuario.github.io/nombre-repo/`

## 📲 Grabar el sticker NFC

Con el link ya publicado, usa una app como "NFC Tools" (Android/iOS)
para escribir esa URL en el sticker. Al acercar el celular, abrirá
la invitación directamente.
