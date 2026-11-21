# 🧩 Datos de la Etapa 1

Los modelos de la Etapa 1 se pasaron a la presentación a partir del resumen de las 5 situaciones.
Antes de exponer, conviene comparar estos datos con la ficha del grupo.

## Situación 1 · Grafo de navegación

- **Vértices**: Inicio, Programa, Unidad 1, Unidad 2, Unidad 3, Foro de consultas, Novedades, Entregas y Biblioteca (aislado).
- **Aristas**: Inicio–Programa, Inicio–Unidad 1, Inicio–Foro, Inicio–Novedades, Programa–Unidad 1, Foro–Unidad 1, Novedades–Unidad 1, Unidad 1–Unidad 2, Unidad 1–Unidad 3, Unidad 1–Entregas, Unidad 2–Unidad 3, Unidad 2–Entregas, Unidad 3–Entregas.
- Camino mínimo Inicio → Entregas: **2 aristas** (Inicio → Unidad 1 → Entregas).
- Unidad 1 es **vértice de corte**: si se quita, Unidad 2, Unidad 3 y Entregas quedan sin acceso desde Inicio.

> ⚠️ Las aristas se reconstruyeron desde una imagen poco nítida. Verificar contra la ficha.

## Situación 2 · Dígrafo de prerrequisitos

- Arcos: M1→M3, M1→M4, M2→M4, M3→M5, M4→M5, M4→M6, M5→M7, M6→M7, M7→M8 y el arco inconsistente **M6→M2**.
- Ciclo detectado: **M2 → M4 → M6 → M2**.
- Al eliminar M6→M2 queda acíclico y se ordena en etapas: {M1, M2} · {M3, M4} · {M5, M6} · {M7} · {M8}.

## Situación 3 · Árbol con raíz

- Materia → Unidades 1 a 3 → Clases, Actividades, Recursos → Archivos. Cuatro niveles.
- El archivo «Cómo citar fuentes» compartido en tres carpetas rompería la estructura de árbol (tendría tres padres).

## Situación 4 · Integración

Dígrafo acíclico (orden de cursado), árbol (índice de materiales) y grafo de navegación con d(Inicio, v) ≤ 3.

## Situación 5 · Equivalencia y orden

- Estudiantes relacionados si completaron las mismas actividades A1–A4: a lo sumo **2⁴ = 16 clases**.
- Roles: Visitante ≤ Estudiante ≤ Ayudante y Estudiante ≤ Editor. Ayudante y Editor **no son comparables**, por eso es un orden parcial.
