# Grupo 29 · Proyecto integrador 🧮

**Presentación interactiva del proyecto integrador** de *Complementos de Matemática Discreta* (Facultad de Ingeniería, UNJu).
Una sola página, con estilo Apple: las cuatro etapas van una debajo de la otra, con transiciones cinematográficas,
animaciones en las letras, acercamientos en los lugares clave y actividades que se tocan en vivo.

### ▶️ [Ver la presentación](https://lemuayala.github.io/cmd-grupo-29/)

> Se recomienda abrirla en pantalla completa (tecla **F**) en una notebook o un proyector.
> En el celular también funciona: las diapositivas se acomodan y las actividades se tocan con el dedo.

---

## 📖 Documentación

| Documento | Para qué sirve |
| --- | --- |
| [docs/TIEMPOS.md](docs/TIEMPOS.md) | Cómo repartimos los 15 minutos y qué pantalla corresponde a cada etapa |
| [docs/GUION-ETAPA3.md](docs/GUION-ETAPA3.md) | Speech de Inés para la Etapa 3, ordenado por pantalla |
| [docs/DATOS-ETAPA1.md](docs/DATOS-ETAPA1.md) | Datos de los modelos de la Etapa 1 y qué hay que verificar |
| [CHANGELOG.md](CHANGELOG.md) | Historial de cambios |

## Índice

- [Integrantes](#-integrantes)
- [Las etapas](#-las-etapas)
- [Cómo presentar](#%EF%B8%8F-cómo-presentar)
- [Cómo está armado](#%EF%B8%8F-cómo-está-armado)
- [Cómo editarlo](#%EF%B8%8F-cómo-editarlo)
- [Ramas y despliegue](#-ramas-y-despliegue)
- [Reglas del proyecto](#-reglas-del-proyecto)

## 👥 Integrantes

- Lemuel Ayala
- Nadia Lorena Burgos
- Inés Beatriz Coraite
- René Iván Mamani

Licenciatura en Informática Educativa · Ciclo de Complementación Curricular · Segundo cuatrimestre de 2026.

## 🧭 Las etapas

| Etapa | Tema | Qué se toca en vivo | Tiempo |
| --- | --- | --- | --- |
| **1** · Modelos en un aula virtual | Grafos, dígrafos y árboles | Camino mínimo y vértice de corte, detección del ciclo y orden en etapas, recorrido en preorden, capas en 3D, clases de equivalencia y diagrama de Hasse | ≈ 3 min |
| **2** · Solicitudes de equivalencia | Relación de equivalencia | Agrupar las 10 solicitudes en K1–K4, propiedades, dígrafo y matriz, los 26 pares, contraejemplo de antisimetría | ≈ 3 min 30 s |
| **3** · Turnos rotativos en una sala | Grupos cíclicos y ℤ₄ | Diagrama circular de turnos, tabla de la operación, generadores y subgrupos, isomorfismo con ℤ₄, paso r², predicción de cualquier semana | ≈ 3 min 30 s |
| **4** · El QR que se cura solo | Códigos de grupo y aritmética modular | Módulo 11 en vivo, matriz generadora, clausura del subgrupo, síndromes tocando bits, entrelazado y el **laboratorio final** | ≈ 4 min |

Total: **≈ 14 minutos** de los 15 disponibles, con un minuto de margen para preguntas o imprevistos.

## 🎙️ Cómo presentar

| Tecla | Acción |
| --- | --- |
| `→` `↓` `Av Pág` | Siguiente pantalla |
| `←` `↑` `Re Pág` | Pantalla anterior |
| `F` | Pantalla completa |
| `Esc` | Salir de pantalla completa |

- Con la rueda del mouse o deslizando en el celular también se avanza pantalla por pantalla.
- En la portada, cada tarjeta de etapa salta directo a esa etapa.
- Los puntos de la derecha muestran en qué pantalla estás y permiten saltar a cualquiera.
- El botón **Tema** alterna entre claro y oscuro.
- Si el aula no tiene internet, abrí `index.html` desde un pendrive: funciona igual, salvo las tipografías, que pasan a las del sistema.

## 🏗️ Cómo está armado

```
cmd-grupo-29/
├── index.html            ← la presentación completa (es lo que sirve GitHub Pages)
├── assets/
│   └── fi-logo.png       ← logo de la Facultad de Ingeniería
├── src/
│   ├── base-etapa4.html  ← base: sistema de diseño, navegación y la Etapa 4
│   ├── build.py          ← junta todo y genera index.html
│   └── parts/            ← HTML, CSS y JS de las etapas 1, 2 y 3
├── docs/                 ← guiones, tiempos y notas
└── CHANGELOG.md
```

- **Un solo archivo** (`index.html`): no necesita servidor ni instalación. El logo va embebido.
- **Animaciones**: [GSAP](https://gsap.com/) 3.12 con ScrollTrigger, cargado desde cdnjs.
- **Accesible**: si el sistema tiene activado *reducir movimiento*, las animaciones se desactivan y todo queda visible.
- **Sistema de diseño**: el de la Etapa 4 (tipografía Inter, colores de iOS, tarjetas con desenfoque, modo claro y oscuro).

## ✏️ Cómo editarlo

1. Editá la parte que corresponda en `src/parts/` (o `src/base-etapa4.html` para la Etapa 4).
2. Generá la página:

   ```bash
   python3 src/build.py
   ```

3. Abrí `index.html` en el navegador y revisá la pantalla que tocaste.
4. Commit y PR hacia `develop` (ver abajo).

## 🌿 Ramas y despliegue

| Rama | Uso |
| --- | --- |
| `main` | Producción: lo que se ve en GitHub Pages |
| `develop` | Trabajo del día a día |
| `feature/*` | Cambios puntuales, salen de `develop` |

**Nunca se pushea directo a `main`.** Los cambios llegan a `develop` y de ahí a `main` con un pull request.

El workflow [`pages.yml`](.github/workflows/pages.yml) hace dos cosas:

- En cada **pull request** regenera `index.html` desde `src/` y falla si no coincide con el commiteado.
- En cada **merge a `main`** publica el sitio en GitHub Pages: https://lemuayala.github.io/cmd-grupo-29/

> Configuración única: en **Settings → Pages → Build and deployment**, elegir **Source: GitHub Actions**.

## 📏 Reglas del proyecto

- Commits con [*Conventional Commits*](https://www.conventionalcommits.org/es/) en español (`feat:`, `fix:`, `docs:`, `style:`…), **sin coautores de IA** y **sin credenciales ni datos personales**.
- La documentación vive en `docs/`.
- Cada cambio visible se anota en el [CHANGELOG](CHANGELOG.md).
