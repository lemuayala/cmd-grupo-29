# Changelog

Todos los cambios visibles de la presentación. Formato basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/).

## [Sin publicar]

### Corregido

- El logo de la portada vuelve a verse con opacidad completa al subir a la portada.
- La barra espaciadora ya no abre el escáner del celular en el laboratorio; el teatro de escaneo solo se abre con Enter.

## [1.1.0] · 2026-11-21

### Agregado

- Separador «04» para la Etapa 4, con el mismo estilo que las etapas 1 a 3.
- Etapa 4 · **Mod 11 en vivo**: escribir un número, invertir o cambiar dígitos y ver por qué ℤ₁₁ lo detecta y ℤ₁₀ no.
- Etapa 4 · **Clausura del subgrupo**: tocar dos palabras válidas y ver que su suma ⊕ también está en C.
- Etapa 4 · **Probar el síndrome**: tocar bits de una palabra y ver cómo el síndrome encuentra y corrige el error.
- Workflow de GitHub Actions que verifica `index.html` en cada PR y publica en GitHub Pages al mergear a `main`.

### Cambiado

- La portada del caso de la Etapa 4 pasa a ser la primera pantalla después del separador.

## [1.0.0] · 2026-11-21

### Agregado

- Portada general del Grupo 29 con el logo de la Facultad de Ingeniería y accesos directos a cada etapa.
- **Etapa 1 · Modelos en un aula virtual**: grafo de navegación con camino mínimo y vértice de corte, dígrafo de prerrequisitos con detección del ciclo y orden en etapas, árbol del repositorio con recorrido en preorden, integración de los tres modelos en capas 3D, relación de equivalencia entre estudiantes y orden parcial de roles con diagrama de Hasse.
- **Etapa 2 · Solicitudes de equivalencia**: las 10 solicitudes, agrupación animada en las clases K1–K4, propiedades, dígrafo y matriz, conteo de los 26 pares, contraejemplo de antisimetría y conclusión.
- **Etapa 3 · Turnos rotativos en una sala de informática**: diagrama circular de turnos, tabla de la operación, propiedades de grupo abeliano, generadores y subgrupos con Lagrange, isomorfismo con ℤ₄, simulador de paso r² y predicción de cualquier semana.
- **Etapa 4 · El QR que se cura solo**, versión corta: módulo 11, matriz generadora, subgrupo, síndromes, entrelazado y el laboratorio interactivo final.
- Transiciones cinematográficas: letras animadas, acercamientos con el scroll y separadores por etapa.
- Script `src/build.py` para regenerar `index.html` desde las partes.
- Documentación en `docs/`.
