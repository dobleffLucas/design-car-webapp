# Design Car — nueva web multi-página (MVP de alta fidelidad)

## Contexto

Design Car es una empresa argentina con dos locales (Darwin 22, CABA y Andrés Rolón 120, San Isidro) dedicada a equipamiento, accesorios e instalación para pickups y 4x4. Su sitio actual (`designcar.com.ar`) funciona pero se ve anticuado y no refleja la calidad del negocio.

El objetivo es un **MVP navegable de alta fidelidad** para mostrar al cliente cómo podría verse su web nueva: debe sentirse un sitio real y terminado, pero **sin backend ni ecommerce**. Toda la conversión apunta a **WhatsApp** y a un **formulario de consulta**. No hay carrito, checkout, pagos, stock, cuentas ni panel.

El proyecto hoy es el template limpio de Vite + React 19 + TypeScript + Tailwind + shadcn (`src/pages/Index.tsx` es un placeholder). Hay que construir todo el sitio desde cero.

**Identidad de marca**: se extrajo la paleta real del logo adjunto (`logo2.png`) y del banner real de la marca — rojo `#D30B06` / `#F20606`, antracita `#191513`, blanco cálido `#F8F7F5`, grises `#A69F9E` / `#C0C5C3`. Se conserva la identidad y se la aplica de forma moderna, limpia y consistente.

### Decisiones ya acordadas con el cliente
| Tema | Decisión |
|---|---|
| WhatsApp | Número **real** `5491124730109` → los botones abren chat real con mensaje precargado |
| Tienda online | **Sí**: enlace en el footer **y** sección propia que reutiliza el banner real (`banner-tienda.png`) |
| Tipografía | **Archivo** (títulos) + **Inter** (texto) |
| Precios | Nunca. Siempre “Consultar precio y disponibilidad” |
| Backend | Ninguno. El formulario valida y muestra estado de éxito |

---

## 1. Arquitectura

### Rutas (todas conectadas entre sí)
| Path | Página | Nombre |
|---|---|---|
| `/` | Home | `home` |
| `/productos` | Catálogo general (6 categorías) | `productos` |
| `/productos/:categoria` | Página de categoría | `categoria` |
| `/productos/:categoria/:producto` | Ficha de producto | `producto` |
| `/vehiculos` | Índice “Por vehículo” | `vehiculos` |
| `/vehiculos/:vehiculo` | Página por vehículo | `vehiculo` |
| `/instalacion` | Instalación profesional | `instalacion` |
| `/nosotros` | Nosotros | `nosotros` |
| `/sucursales` | Sucursales | `sucursales` |
| `/contacto` | Contacto + formulario | `contacto` |
| `*` | 404 con navegación de rescate | `404` |

Se mantiene el array plano de `src/router.tsx` (compatible con la preview de Enter): cada página compone `<SiteLayout>` en su propio return en lugar de usar rutas anidadas.

Slugs de categoría: `barras-antivuelco`, `estribos`, `lonas-y-cobertores`, `portaequipajes`, `deflectores`, `camping`.
Slugs de vehículo: `volkswagen-amarok`, `toyota-hilux`, `ford-ranger`, `chevrolet-s10`, `fiat-toro`, `otros-modelos`.

### Estado global: vehículo seleccionado
`VehicleProvider` (`src/components/site/vehicle-provider.tsx`) guarda el vehículo activo en `localStorage` + query param `?vehiculo=`, y lo expone vía `useVehicle()` (`src/hooks/use-vehicle.ts`, contexto en `src/lib/vehicle-context.ts`).

Cuando hay vehículo activo debe **cambiar en toda la UI**:
- Chip del header (“Toyota Hilux ✕”).
- Título de sección → “Accesorios para Toyota Hilux”.
- Los listados se filtran a productos compatibles.
- Los chips de compatibilidad del producto se resaltan.
- Los mensajes de WhatsApp se arman con vehículo + producto/categoría.

### Datos (todo el contenido vive en `src/data/`, ningún mock disperso en componentes)
| Archivo | Contenido |
|---|---|
| `types.ts` | `Vehicle`, `Category`, `Product`, `Branch`, `GalleryItem`, `MediaRef` |
| `site.ts` | Empresa, WhatsApp, email, redes, navegación, link tienda online, marcas de vehículos para placeholders de logo |
| `vehicles.ts` | 6 vehículos (nombre, marca, años, descripción, `media`) |
| `categories.ts` | 6 categorías (nombre, slug, descripción, `media` real o placeholder, ícono lucide) |
| `products.ts` | **30 productos** (5 por categoría): nombre, categoría, `vehicles[]`, beneficio, descripción, beneficios, especificaciones, info de instalación, galería, `featured` |
| `branches.ts` | 2 sucursales: dirección, horarios, `media`, link de “Cómo llegar” |
| `gallery.ts` | 6 trabajos + Instagram (placeholders etiquetados) |

### Utilidades
- `src/lib/asset.ts` → `asset(path)` que antepone `import.meta.env.BASE_URL`; y `resolveMedia(media)` que devuelve `src` real o `null` (para renderizar `ImageSlot`). Todos los `src` de imágenes pasan por acá.
- `src/lib/whatsapp.ts` → `buildWhatsAppUrl(message)` + constructores de mensaje contextuales:
  ```
  producto:    Hola, tengo una {VEHÍCULO} y quiero consultar por {PRODUCTO}. ¿Tienen disponibilidad e instalación?
  categoría:   Hola, tengo una {VEHÍCULO} y quiero consultar por {CATEGORÍA} para mi camioneta. ¿Qué opciones tienen?
  vehículo:    Hola, quiero asesoramiento para equipar mi {VEHÍCULO}.
  instalación: Hola, quiero cotizar la instalación de {PRODUCTO} para mi camioneta.
  sucursal:    Hola, quiero consultar con la sucursal de {SUCURSAL} ({DIRECCIÓN}).
  general:     Hola, quiero hacer una consulta sobre equipamiento para mi camioneta.
  ```
  Si el usuario ya eligió vehículo, se inyecta automáticamente en el mensaje.
- `src/hooks/use-filtered-products.ts` → filtrado por vehículo + categoría + tipo.
- `src/hooks/use-reveal.ts` → aparición al scroll con `IntersectionObserver`, desactivada si `prefers-reduced-motion`.
- `src/hooks/use-scrolled.ts` → estado del header al scrollear.

---

## 2. Sistema de diseño

Se reescribe `src/index.css` y `tailwind.config.ts` con tokens semánticos HSL (**solo tema claro**, se elimina el bloque `.dark`: la marca es “blanco cálido + antracita” y el rojo sobre fondo oscuro se vuelve agresivo, justo lo que hay que evitar). Ningún componente usa colores literales.

**Tipografía**: Archivo 600/700 para títulos, Inter 400/500/600 para cuerpo, cargadas en `index.html` con `display=swap` y fallback `system-ui`. Escala: `display-l` (`clamp(40px,5vw,56px)`), `display-s`, `headline-l`, `headline-s`, `body-l`, `body-s`, `label`, `eyebrow`.

**Tokens principales**: `--background` blanco cálido `40 18% 97%` · `--foreground` antracita `20 14% 9%` · `--card` blanco · `--muted` / `--muted-foreground` `25 8% 42%` · `--border` `32 12% 91%` · `--input` `28 9% 55%` (contorno de campo con ≥3:1) · `--primary` rojo de marca `1 92% 42%` (+ `hover` `34%`, `active` `27%`, `subtle` `1 100% 97%`) · `--secondary` antracita · `--accent` rojo brillante del logo (solo decorativo) · `--whatsapp` `142 68% 30%` (+ `hover`, `soft`, `soft-foreground`, `border`) · `--surface-sunken` / `--surface-inverse` (banda oscura controlada para footer y una sección) · `--destructive` `0 66% 38%`.

Todos los pares de contraste quedan en AA o mejor (verificado en el spec de diseño): texto antracita sobre blanco cálido 16.9:1, blanco sobre rojo de marca 5.71:1, blanco sobre verde WhatsApp 4.89:1, texto secundario 5.29:1.

**Radios**: `xs 4` `sm 6` `md 10` `lg 14` `xl 20` `full`. **Sombras** cálidas con tinte antracita (nunca negro puro), incluida `--shadow-fab`. **Motion**: reveal 480ms, hover 180ms, sheet/barra 240ms, focus **instantáneo** (nunca animado), `prefers-reduced-motion` respetado también en JS.

**Variantes de shadcn a customizar** (`src/components/ui/**` está excluido de ESLint, se puede reescribir libremente):
- `button.tsx` → `primary` (rojo, CTA principal), `secondary` (antracita), `whatsapp` (verde sólido), `whatsappSoft` (verde suave), `outline`, `ghost`, `link`; estados hover/active/focus/disabled. Regla: nunca dos botones sólidos del mismo peso lado a lado — se combina **primary + whatsappSoft** o **whatsapp + outline**.
- `badge.tsx` → `nuevo`, `instalacion`, `a-pedido`, `neutro`, `inverse`. Máximo 2 por tarjeta.
- `input.tsx` / `textarea.tsx` / `label.tsx` / `select.tsx` → estados hover/focus/invalid (`aria-invalid=true` → borde destructivo + ícono, nunca solo color), `text-base sm:text-body-s` para evitar el zoom en iOS.
- `card.tsx`, `sheet.tsx` (overlay con token en vez de `bg-black/80`, ancho mobile), `breadcrumb.tsx` (13px, separador `/`), `accordion.tsx` (FAQ), `sonner.tsx` (toasts tematizados).

---

## 3. Assets reales

Se extrae `assets_designcar.zip` a **`public/assets/designcar/`** conservando los nombres originales (12 archivos, ~1.5 MB). Los logos **no se recrean ni se redibujan**: se usa el logo real como imagen y, donde falta un logo (marcas de vehículos), un placeholder de texto explícito.

| Asset | Uso |
|---|---|
| `logo2.png` (200×57, transparente) | Header, footer y 404 |
| `barras.jpg` (700×450) | Banner de categoría *Barras antivuelco* + **imagen principal del hero del home** (pickup equipada, foto real) |
| `novedad-lonas.jpg` | Banner de *Lonas y cobertores* + foto del producto destacado |
| `portaequipaje.jpg` | Banner de *Portaequipajes* + foto del producto destacado |
| `barra-amarok.jpg`, `hilux-barra-antivuelco4.jpg`, `barra-ranger.jpg`, `barra-s10.jpg`, `barra-toro2.jpg`, `barra-saveiro.jpg` (400×300) | Foto de los 6 productos de *Barras antivuelco* y, a la vez, imagen de cada página de vehículo |
| `banner-tienda.png` (1400×507) | Sección “Tienda online” (su uso original) |
| `mercado.jpg` (707×243) | Imagen secundaria de la sección “Tienda online” |

Los assets con texto horneado (`banner-tienda.png`, `mercado.jpg`) se usan **solo** dentro de la sección de tienda, no como fondos con texto encima.

**Placeholders**: `ImageSlot` (`src/components/site/image-slot.tsx`) es un componente de primera clase, no un `div` gris. Reserva la relación de aspecto exacta (sin layout shift al reemplazar), tiene el gradiente cálido del sistema, ícono `ImageIcon`, etiqueta con la descripción de la foto pendiente (ej. “Foto: Amarok con estribos — 4:3 · 1600×1200”), tag “Placeholder” arriba a la derecha, y `role="img"` + `aria-label`. Se usa para: hero de vehículos sin foto, categorías *Estribos* / *Deflectores* / *Camping*, 24 productos sin foto, galería de trabajos e Instagram. Para marcas de vehículos: placeholder de texto “Logo de marca” (VW, Toyota, Ford, Chevrolet, Fiat, Nissan, Mitsubishi, RAM) — **sin recrear isotipos**.

---

## 4. Páginas

### 4.1 Home (`src/pages/home/`)
1. **Header** sticky: logo real, menú (Productos ▾, Por vehículo ▾, Instalación, Nosotros, Sucursales, Contacto — los dos primeros con dropdown Radix accesible por teclado), chip de vehículo, CTA “Hablar por WhatsApp”, menú mobile en `Sheet`.
2. **Hero**: eyebrow, H1 “Equipá tu camioneta para lo que viene”, bajada “Accesorios, asesoramiento e instalación para pickups y 4x4.”, CTA primario “Ver productos para mi vehículo” (abre el selector de vehículo) y secundario “Hablar con un asesor” (WhatsApp). Media: `barras.jpg` real en tarjeta `radius-xl` con sombra suave y chips flotantes no invasivos.
3. **Selector de vehículo** (`vehicle-selector-section.tsx`): Amarok, Hilux, Ranger, S10, Toro, Otros modelos. Al elegir, el chip queda seleccionado, aparece el bloque “Recomendados para tu {vehículo}” y se reescriben los títulos.
4. **Categorías visuales**: 6 tarjetas (barras antivuelco, estribos, lonas y cobertores, portaequipajes, deflectores, camping) con conteo de productos → link a su página.
5. **Productos destacados**: grilla filtrada por el vehículo activo, con tarjeta de producto (imagen, nombre, vehículos compatibles, beneficio, “Consultar precio y disponibilidad”, CTA “Consultar por WhatsApp” + WhatsApp icon button).
6. **Confianza** (banda antracita `surface-inverse`): asesoramiento especializado, compatibilidad por vehículo, instalación profesional, atención personalizada, locales físicos.
7. **Trabajos + Instagram**: grilla de 6 placeholders + CTA a `@designcarequipamientos`.
8. **Instalación**: resumen de 3 pasos → link a `/instalacion`.
9. **Sucursales**: las 2 tarjetas de local → link a `/sucursales`.
10. **Tienda online**: banda con `banner-tienda.png` + `mercado.jpg` y link a `designcar3.mitiendanube.com` (el link de Mercado Libre no se conoce: se usa un placeholder deshabilitado y se avisa en el resumen).
11. **CTA final** + **Footer** completo.

### 4.2 Catálogo y categoría
- `/productos`: breadcrumb, título “Productos”, introducción, grilla de las 6 categorías, CTA de WhatsApp general.
- `/productos/:categoria`: breadcrumb, banner (foto real o `ImageSlot`), título, descripción breve, **filtros por vehículo y por tipo de producto** (chips), contador con `aria-live`, grilla responsive de tarjetas de producto, **empty state** (“No encontramos {categoría} para {vehículo}” + “Limpiar filtros” + WhatsApp con vehículo y categoría), banda “¿No encontrás lo que buscás?”. Sin botones de compra.
- Slug inválido → `NotFound`.

### 4.3 Por vehículo
- `/vehiculos`: grilla con los 6 vehículos.
- `/vehiculos/:vehiculo`: hero con foto del vehículo, H1 “Accesorios para Toyota Hilux”, comportamiento por defecto/usuario que ya tiene otro vehículo activo, atajos a las 6 categorías con conteo de compatibles, filtro por categoría, grilla de productos compatibles, banda “¿No encontrás lo que buscás? Te asesoramos”, CTA de WhatsApp **con el vehículo en el mensaje**.

### 4.4 Ficha de producto
`/productos/:categoria/:producto`: breadcrumb, galería (principal + miniaturas; fotos reales o `ImageSlot` 4:3), nombre, categoría, descripción enfocada en beneficios, chips de vehículos compatibles (el activo resaltado), beneficios clave, tabla de información técnica (`dl` semántica), bloque de instalación cuando corresponde, productos relacionados (misma categoría o mismo vehículo), CTA principal en la página y **barra CTA sticky** en desktop y mobile (“Consultar por WhatsApp” + “Consultar precio y disponibilidad” + secundario “Enviar consulta” → `/contacto?producto=…&vehiculo=…`). El mensaje de WhatsApp incluye producto y vehículo si estaba seleccionado. Mientras la barra sticky está visible, el FAB de WhatsApp se oculta/levanta para no duplicar CTAs.

### 4.5 Instalación
Hero, beneficios de instalar con Design Car, proceso simple (1. Consultá · 2. Confirmamos compatibilidad · 3. Coordinamos instalación), qué incluye, FAQ en `accordion`, CTA “Cotizar instalación por WhatsApp” + acceso al formulario.

### 4.6 Nosotros
Historia (marcada como texto a validar con el cliente), especialización en pickups y 4x4, asesoramiento personalizado, instalación, los dos locales, variedad de productos, banda de cifras, galería de placeholders, CTA.

### 4.7 Sucursales
Dos tarjetas (`branch-card.tsx`) con: dirección (Darwin 22 alt. Warnes 1100, CABA · Andrés Rolón 120, San Isidro), horarios (valores placeholder a confirmar: Lun a Vie 9–18 h, Sáb 9–13 h), botón de WhatsApp por sucursal con mensaje propio, **mapa como placeholder** (`ImageSlot` con ícono de mapa) y CTA “Cómo llegar” → Google Maps con la dirección en la query.

### 4.8 Contacto
Formulario con React Hook Form + Zod: Nombre\*, Email\*, Teléfono\*, Vehículo/modelo, Producto o categoría de interés, Mensaje\*. Validación visual (borde destructivo + ícono + mensaje bajo el campo, `aria-invalid` y `aria-describedby`), validación al salir del campo y al enviar. Prellenado desde query params. Al enviar **no se llama a ningún backend**: se reemplaza el formulario por un panel de éxito pulido — “Recibimos tu consulta. Te responderemos a la brevedad.” — con ícono de confirmación, resumen de lo enviado, WhatsApp como alternativa inmediata y botón “Enviar otra consulta”. Además: WhatsApp como vía principal, email `warnes@designcar.com.ar`, las dos sucursales y redes.

### 4.9 Interacción y accesibilidad transversal
Skip link, landmarks semánticos (`header`/`nav`/`main`/`section`/`footer`), un solo `h1` por página, scroll al tope en cada cambio de ruta, `scroll-margin-top` en anclas, foco visible instantáneo en todo elemento interactivo, targets ≥44px, `aria-live="polite"` en filtros/contadores, estados hover / focus / selected / empty / disabled coherentes en todos los componentes, alt descriptivo en fotos reales y `role="img"` + label en placeholders, y `prefers-reduced-motion` respetado.

---

## 5. Archivos

**Configuración y sistema de diseño**
`index.html` · `src/index.css` · `tailwind.config.ts` · `src/components/ui/{button,badge,card,input,textarea,label,select,sheet,breadcrumb,accordion,sonner}.tsx`

**Datos y lógica**
`src/data/{types,site,vehicles,categories,products,branches,gallery}.ts` · `src/lib/{asset,whatsapp,vehicle-context}.ts` · `src/hooks/{use-vehicle,use-reveal,use-scrolled,use-filtered-products}.ts`

**Componentes de sitio** (`src/components/site/`)
`site-layout` · `site-header` · `mobile-nav` · `site-footer` · `logo` · `whatsapp-icon` · `whatsapp-button` · `whatsapp-float` · `vehicle-provider` · `vehicle-picker` · `vehicle-chips` · `image-slot` · `reveal` · `section-heading` · `breadcrumbs` · `product-card` · `category-card` · `branch-card` · `trust-card` · `brand-logos` · `product-grid` · `category-filters` · `cta-band` · `store-band` · `gallery-strip` · `page-hero` · `contact-form` · `sticky-product-cta` · `scroll-to-top`

**Páginas** (`src/pages/`)
`home/` (+ `hero.tsx`, `vehicle-selector-section.tsx`, `trust-section.tsx`) · `productos/index.tsx` · `categoria/index.tsx` · `producto/index.tsx` · `vehiculos/index.tsx` · `vehiculo/index.tsx` · `instalacion/index.tsx` · `nosotros/index.tsx` · `sucursales/index.tsx` · `contacto/index.tsx`

**Modificados**: `src/router.tsx` (11 rutas) · `src/App.tsx` (envuelve con `VehicleProvider`) · `src/pages/NotFound.tsx` (404 con navegación de rescate) · `CodeGuideline.md` (documenta la estructura nueva) · se elimina `src/pages/Index.tsx`.

**Assets**: extraer `assets_designcar.zip` → `public/assets/designcar/`.

---

## Implementation checklist

- [x] Extraer `assets_designcar.zip` a `public/assets/designcar/` con los 12 archivos reales
- [x] `src/index.css`: tokens HSL semánticos del tema claro (background/foreground/card/muted/border/input/ring, primary + hover/active/subtle, secondary, accent, whatsapp + soft, surface-sunken/inverse, destructive), gradientes, sombras, radios, motion; sin bloque `.dark`
- [x] `src/index.css`: capa base (`body` con Archivo/Inter, selection, focus-visible, `scroll-margin-top: 96px`), utilidades `.container-page` / `.section-y` / `.reveal` y bloque `prefers-reduced-motion`
- [x] `tailwind.config.ts`: mapear los tokens nuevos (incluido `whatsapp.*`), `fontFamily.display/sans`, escala `display-l…eyebrow`, `boxShadow` (incl. `fab`), `borderRadius`, `maxWidth.content/prose`, transiciones
- [x] `index.html`: `lang="es"`, título y meta description de Design Car, preconnect + Google Fonts de Archivo e Inter
- [x] `button.tsx`: variantes `primary`, `secondary`, `whatsapp`, `whatsappSoft`, `outline`, `ghost`, `link` con hover/active/focus/disabled por token
- [x] `badge.tsx`: variantes `nuevo`, `instalacion`, `a-pedido`, `neutro`, `inverse`
- [x] `input.tsx` / `textarea.tsx` / `label.tsx` / `select.tsx`: estados default/hover/focus/invalid/disabled por token, `aria-invalid` con ícono, tipografía ≥16px bajo `sm`
- [x] `card.tsx` / `sheet.tsx` / `breadcrumb.tsx` / `accordion.tsx` / `sonner.tsx`: radios y sombras por token, overlay del sheet sin `bg-black/80`, breadcrumb 13px con separador `/`
- [x] `src/data/types.ts` y `src/data/site.ts` (WhatsApp real, email, redes, navegación, tienda online, marcas de vehículos)
- [x] `src/data/vehicles.ts`: 6 vehículos con slug, años y media
- [x] `src/data/categories.ts`: 6 categorías con descripción, media real o `null` e ícono lucide
- [x] `src/data/products.ts`: 30 productos (5 por categoría) con vehículos compatibles, beneficio, beneficios, especificaciones, instalación y galería
- [x] `src/data/branches.ts`: Darwin 22 y Andrés Rolón 120 con horarios, link de “Cómo llegar” y media
- [x] `src/data/gallery.ts`: 6 items de trabajos/Instagram como placeholders etiquetados
- [x] `src/lib/asset.ts`: `asset()` con `BASE_URL` y `resolveMedia()` que devuelve `src` real o `null`
- [x] `src/lib/whatsapp.ts`: `buildWhatsAppUrl` + constructores de mensaje de producto, categoría, vehículo, instalación, sucursal y general, con inyección del vehículo activo
- [x] `src/lib/vehicle-context.ts` + `src/hooks/use-vehicle.ts` + `src/components/site/vehicle-provider.tsx`: estado persistido en `localStorage` y sincronizado con `?vehiculo=`
- [x] `src/hooks/use-reveal.ts` y `src/hooks/use-scrolled.ts`
- [x] `src/hooks/use-filtered-products.ts`: filtrado por vehículo, categoría y tipo, y compatibilidad marcada
- [x] `src/components/site/image-slot.tsx`: slot con relación de aspecto, gradiente, ícono, etiqueta de foto pendiente, tag “Placeholder”, `role="img"` + `aria-label`; y render de foto real cuando existe `src`
- [x] `src/components/site/logo.tsx`: logo real con variantes de tamaño y placeholder de logo de marca en texto
- [x] `src/components/site/whatsapp-icon.tsx` + `whatsapp-button.tsx` + `whatsapp-float.tsx`: FAB fijo abajo a la derecha con tooltip en desktop/mobile, mensaje contextual y ajuste cuando la barra sticky del producto está visible
- [x] `src/components/site/vehicle-picker.tsx` + `vehicle-chips.tsx`: estados default/hover/selected/focus/disabled accesibles por teclado
- [x] `src/components/site/section-heading.tsx`, `reveal.tsx`, `breadcrumbs.tsx`
- [x] `src/components/site/product-card.tsx` y `category-card.tsx`: imagen, nombre, compatibles, beneficio, “Consultar precio y disponibilidad”, WhatsApp; hover lift + zoom de imagen, y variante sin foto con `ImageSlot`
- [x] `src/components/site/product-grid.tsx`: grilla responsive, contador con `aria-live` y empty state con limpiar filtros + WhatsApp
- [x] `src/components/site/category-filters.tsx`: filtros por vehículo y tipo
- [x] `src/components/site/{branch-card,trust-card,brand-logos,cta-band,store-band,gallery-strip,page-hero}.tsx`
- [x] `src/components/site/sticky-product-cta.tsx`: barra sticky con variantes desktop/mobile y ocultado del FAB mientras está visible
- [x] `src/components/site/site-header.tsx` + `mobile-nav.tsx`: nav desktop con dropdowns Radix accesibles, chip de vehículo, CTA de WhatsApp y menú mobile funcional
- [x] `src/components/site/site-footer.tsx`: logo, email, WhatsApp, redes, las dos direcciones, categorías, vehículos, placeholders de logos de marca, tienda online y legales
- [x] `src/components/site/site-layout.tsx` + `scroll-to-top.tsx`: skip link, header, `main`, footer, FAB y scroll al tope por ruta
- [x] `src/components/site/contact-form.tsx`: RHF + Zod, validación visual de obligatorios, prellenado por query y panel de éxito “Recibimos tu consulta. Te responderemos a la brevedad.”
- [x] `src/pages/home/` con hero, selector de vehículo, categorías, destacados, confianza, trabajos/Instagram, instalación, sucursales y tienda online
- [x] `src/pages/productos/index.tsx` con las 6 categorías
- [x] `src/pages/categoria/index.tsx` con breadcrumb, banner, descripción, filtros, grilla y empty state
- [x] `src/pages/vehiculos/index.tsx` y `src/pages/vehiculo/index.tsx` con hero, atajos por categoría, filtros y CTA de WhatsApp con el vehículo
- [x] `src/pages/producto/index.tsx` con galería, compatibilidad, beneficios, ficha técnica, instalación, relacionados y CTAs sticky
- [x] `src/pages/instalacion/index.tsx`, `src/pages/nosotros/index.tsx`, `src/pages/sucursales/index.tsx`, `src/pages/contacto/index.tsx`
- [x] `src/router.tsx`: las 11 rutas, eliminando `src/pages/Index.tsx`
- [x] `src/App.tsx`: envolver el router con `VehicleProvider`
- [x] `src/pages/NotFound.tsx`: 404 con buscador por vehículo/categoría y links de rescate
- [x] Actualizar `CodeGuideline.md` con la estructura nueva (`src/data/`, `src/components/site/`, páginas por subdirectorio)

## Verification checklist

- [x] `pnpm lint` sin errores ni warnings
- [x] `pnpm exec tsc --noEmit` sin errores de tipos
- [x] `pnpm run build` completa correctamente
- [x] Cada ruta existe y es alcanzable por navegación real: `/`, `/productos`, `/productos/barras-antivuelco`, `/productos/barras-antivuelco/barra-antivuelco-hilux`, `/vehiculos`, `/vehiculos/toyota-hilux`, `/instalacion`, `/nosotros`, `/sucursales`, `/contacto`
- [x] Positivo: elegir “Toyota Hilux” en el home cambia el chip del header, retitula a “Accesorios para Toyota Hilux” y deja en la grilla solo productos con Hilux en `vehicles`
- [x] Positivo: el CTA de WhatsApp de un producto de la categoría Barras abre `wa.me/5491124730109` con producto y vehículo en el texto ya codificado
- [x] Positivo: el formulario con todos los campos válidos muestra el panel de éxito y no dispara ninguna petición de red (verificado en las network requests)
- [x] Negativo: enviar el formulario vacío muestra los errores visuales por campo, mantiene el foco accesible y no muestra el estado de éxito
- [x] Negativo: email con formato inválido marca solo ese campo como inválido
- [x] Negativo: `/productos/categoria-inexistente` y `/productos/barras-antivuelco/producto-inexistente` caen en el 404
- [x] Negativo: un filtro de vehículo sin resultados compatibles muestra el empty state, no una grilla vacía
- [x] Boundary: con el vehículo activo quitado (✕ del chip) los listados vuelven a mostrar todo y el título vuelve a su forma genérica
- [x] Boundary: recargar la página conserva el vehículo elegido (localStorage + `?vehiculo=`)
- [x] Boundary: en la ficha de producto, la barra sticky aparece recién cuando la galería sale del viewport y el FAB no se superpone
- [x] Boundary: con `prefers-reduced-motion: reduce` el contenido se ve siempre (nada queda en `opacity: 0`)
- [ ] `get_console_logs` sin errores ni warnings de React: el proyecto no registra telemetría de consola, así que se validó con capturas de cada ruta (ninguna cayó en el error boundary)
- [x] `website_screenshot` de `/`, `/productos/barras-antivuelco` y `/vehiculos/toyota-hilux` en `desktop_1280` y `mobile_390` sin desbordes horizontales ni solapamientos
- [x] Ningún `src` de imagen real apunta a un archivo inexistente de `public/assets/designcar/`
