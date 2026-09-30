# Design Car — web de equipamiento para pickups y 4x4

Sitio multi-página (MVP de alta fidelidad) para **Design Car**, empresa argentina de
equipamiento, accesorios e instalación para camionetas pickup y 4x4.

Es un sitio **frontend only**: no tiene backend, carrito, pagos, stock ni cuentas.
Toda la conversión apunta a WhatsApp y a un formulario de consulta.

---

## Correr el proyecto en local

Requisitos: **Node 18+** y **pnpm**.

```bash
pnpm install
pnpm dev
```

Queda disponible en **http://localhost:8080**.

Otros comandos:

| Comando | Qué hace |
|---|---|
| `pnpm dev` | Servidor de desarrollo con recarga en caliente (puerto 8080) |
| `pnpm build` | Compila para el preview de Enter |
| `pnpm build:prod` | Compila la versión de producción en `dist/` |
| `pnpm preview` | Sirve la compilación de `dist/` para revisarla |
| `pnpm lint` | Revisa el código con ESLint |
| `pnpm check` | ESLint + TypeScript sin emitir archivos |

---

## Páginas

| Ruta | Pantalla |
|---|---|
| `/` | Home |
| `/productos` | Catálogo con las 6 categorías |
| `/productos/:categoria` | Listado por categoría con filtros |
| `/productos/:categoria/:producto` | Ficha de producto |
| `/vehiculos` | Índice de modelos |
| `/vehiculos/:vehiculo` | Accesorios para un modelo |
| `/instalacion` | Instalación profesional |
| `/nosotros` | Nosotros |
| `/sucursales` | Sucursales y cómo llegar |
| `/contacto` | Formulario de consulta |

---

## Estructura

```
public/assets/designcar/   Assets reales de marca (logo y fotos)
src/components/site/       Header, footer, tarjetas, formulario, CTAs de WhatsApp
src/components/ui/         Componentes base (shadcn) con los tokens de marca
src/data/                  TODO el contenido: vehículos, categorías, productos, sucursales
src/hooks/                 Hooks (vehículo activo, filtros, reveal al scroll)
src/lib/                   Rutas de assets, mensajes y links de WhatsApp, contexto
src/pages/                 Una carpeta por ruta
src/index.css              Design system (tokens HSL, tipografía, motion)
tailwind.config.ts         Tokens de Tailwind
```

### Dónde se edita el contenido

- **Textos y datos de contacto**: `src/data/site.ts`
- **Productos** (30): `src/data/products.ts`
- **Categorías**: `src/data/categories.ts`
- **Modelos de camioneta**: `src/data/vehicles.ts`
- **Sucursales y horarios**: `src/data/branches.ts`
- **Número de WhatsApp**: `src/data/site.ts` → `whatsapp` (hoy `5491124730109`)

### Fotos

El logo y las fotos de marca están en `public/assets/designcar/`.
Donde todavía no hay foto se muestra un **placeholder etiquetado** que reserva la
proporción exacta, así que al reemplazarlo por la foto real no se mueve el layout.
Para cambiar una foto, reemplazá el archivo y actualizá la ruta en el archivo de
datos correspondiente (`src` dentro del objeto `media`).

### Pendientes a confirmar con el cliente

- Horarios de las dos sucursales (hoy son valores de ejemplo).
- Link de la tienda de Mercado Libre (hoy solo se enlaza la tienda online).
- Historia de la empresa en Nosotros (borrador).

---

*Sincronizado con el proyecto en [enter.pro](https://enter.pro).*
