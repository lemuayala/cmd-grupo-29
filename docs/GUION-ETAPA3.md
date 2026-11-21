# 🎙️ Guion · Etapa 3

**Organización rotativa de turnos en una sala de informática mediante grupos cíclicos.**
Texto de Inés, ordenado según la pantalla que tiene que estar en el proyector. En *cursiva* va lo que se toca en vivo.

Tiempo objetivo: **3 min 30 s**. Leído completo dura cerca de 4 minutos: los párrafos marcados con ✂️ son los primeros que se pueden acortar.

---

## Separador · Etapa 3

La situación que planteamos surge de la necesidad de organizar el uso de una sala de informática cuando hay varios grupos de estudiantes que necesitan utilizarla en distintos momentos.

## La sala · «Todos avanzan un turno»

Para representar esta organización, imaginamos una sala en la que participan cuatro grupos de estudiantes y se dispone de cuatro turnos. Cada grupo comienza ocupando un turno diferente, pero la distribución no se mantiene fija, sino que va cambiando de manera rotativa en cada período.

Por ejemplo, inicialmente el grupo A ocupa el turno 1, el grupo B el turno 2, el grupo C el turno 3 y el grupo D el turno 4. En el siguiente período, todos avanzan una posición: el grupo A pasa al turno 2, el B al turno 3, el C al turno 4 y el D vuelve al turno 1.

*Tocar «Avanzar un turno · r» una vez.*

De esta manera, todos los grupos van pasando por los distintos turnos. Lo interesante es que, después de cuatro rotaciones, se recupera la distribución inicial.

*Tocar tres veces más: aparece «vuelta completa».*

A partir de esta situación, buscamos representar matemáticamente esos movimientos utilizando la teoría de grupos.

## El grupo · «Componer es sumar exponentes»

Para eso, definimos el conjunto G = {e, r, r², r³}, donde cada elemento representa una rotación: e significa que no hay cambios; r, avanzar un lugar; r², avanzar dos lugares; y r³, avanzar tres lugares.

La operación que utilizamos es la composición de rotaciones. Es decir, combinar dos desplazamientos para obtener uno nuevo. Por ejemplo, si avanzamos un lugar y después otro, es lo mismo que avanzar dos lugares. Por eso, los exponentes se suman módulo 4, ya que después de cuatro desplazamientos volvemos a la distribución inicial.

*La celda r ∘ r = r² ya está marcada. Opcional: tocar r³ ∘ r para mostrar que da e.*

## Propiedades · «Un grupo, y además abeliano»

*Tocar «Verificar» en cada propiedad mientras se nombra.*

Al analizar este conjunto, comprobamos que cumple las propiedades de grupo: clausura, asociatividad, elemento neutro e inversos. El neutro es e, que no cambia nada. Y los inversos existen porque cada rotación puede deshacerse: si avanzo un lugar, avanzando tres más vuelvo al inicio; y si avanzo dos, avanzando otros dos también vuelvo. También cumple la conmutatividad, porque el orden en que combinamos las rotaciones no modifica el resultado. Por eso, decimos que es un grupo abeliano.

## Cíclico y subgrupos · «Una sola rotación lo genera todo»

*La secuencia r, r², r³, r⁴ = e se arma sola al llegar.*

Además, es un grupo cíclico de orden cuatro, porque repitiendo la rotación r podemos obtener todos los elementos del conjunto y volver a la distribución inicial. Su orden es cuatro porque tiene cuatro elementos, y la rotación r también tiene orden cuatro: hay que repetirla cuatro veces para volver al inicio.

Dentro de este grupo también encontramos tres subgrupos: {e}, {e, r²} y G. Sus órdenes son 1, 2 y 4, respectivamente.

## Isomorfismo · «Rotar es sumar módulo 4»

Por otro lado, nuestro grupo es isomorfo a ℤ₄, porque podemos representar las cuatro rotaciones con los números 0, 1, 2 y 3. Esto significa que, aunque los elementos son diferentes, ambas estructuras funcionan de la misma manera: componer rotaciones equivale a sumar módulo 4.

*Tocar una celda en una tabla: se marca la misma en la otra.*

## Coevaluación · «¿Y si avanzan dos turnos?»

A partir de la coevaluación de un compañero, surgió una pregunta: ¿qué pasaría si los grupos avanzaran dos turnos en lugar de uno?

*Con «Paso r²» elegido, tocar «Avanzar» dos veces.*

Al probarlo en el simulador, podemos observar que no se recorren los cuatro turnos, sino que solamente se alterna entre dos distribuciones. Esto sucede porque, al avanzar de a dos posiciones, después de dos movimientos volvemos a la distribución inicial: r² aplicada dos veces es r⁴, que es e. Por eso, se genera el subgrupo ⟨r²⟩ = {e, r²}, que tiene orden dos. Esto es coherente con el teorema de Lagrange, porque el orden del subgrupo, 2, divide a 4.

## Predecir una semana · «Cualquier semana con un resto»

*La barra ya está en la semana 14.*

En conclusión, este modelo nos permite representar matemáticamente cómo se organizan y combinan los turnos mediante grupos cíclicos. Además, permite predecir cualquier semana con un resto: por ejemplo, a las 14 semanas, 14 dividido 4 da resto 2, que equivale a avanzar dos lugares, sin necesidad de contar semana por semana.

## Conclusión

✂️ Sin embargo, representa una situación idealizada, porque no contempla aspectos como ausencias de estudiantes, feriados o fallas de los equipos. Como mejora, agregaríamos un diagrama circular para visualizar los desplazamientos entre turnos, y profundizaríamos en cómo adaptar el modelo a situaciones reales.

> 💡 La presentación ya tiene el diagrama circular. Se puede decir: *«Como mejora, sumamos el diagrama circular que vieron, y nos queda adaptar el modelo a situaciones reales.»*

---

## ✂️ Si hay que recortar 30 segundos

1. En **Cíclico**, decir solo: «Es cíclico de orden cuatro: repitiendo r obtenemos todo el grupo».
2. En **Propiedades**, no explicar el inverso de r² (alcanza con el de r).
3. En **Conclusión**, nombrar las limitaciones sin desarrollarlas.
