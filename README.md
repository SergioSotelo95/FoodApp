# Proyecto individual - Food App

<p align="center">
  <img height="200" src="https://www.kindpng.com/picc/m/14-144289_clip-art-png-for-free-food-transparent-png.png" />
</p>

## Objetivos del Proyecto

- Construir una App utlizando React, Redux, Node y Sequelize.
- Afirmar y conectar los conceptos aprendidos en la carrera.
- Aprender mejores prácticas.
- Aprender y practicar el workflow de GIT.
- Usar y practicar testing.

Para poder correr la app de manera local, será necesario que creen desde psql una base de datos llamada `food`

El contenido de `client` fue creado usando: Create React App.

## Enunciado

La idea general fue crear una aplicación en la cual se puedan ver distintas recetas de comida junto con información relevante utilizando la api externa [spoonacular](https://spoonacular.com/food-api) y a partir de ella poder, entre otras cosas:

  - Buscar recetas
  - Filtrarlas / Ordenarlas
  - Crear nuevas recetas propias

__IMPORTANTE__: Para poder utilizar esta API externa es necesario crearse una cuenta para obtener una API Key que luego deberá ser incluida en el archivo `.env`. Por otro lado tienen un límite de requests por día por lo que deben usar las llamadas a la API con cuidado.


### Tecnologías utilizadas:
- [ ] React
- [ ] Redux
- [ ] Express
- [ ] Sequelize - Postgres

#### Frontend

Se desarrolló una aplicación de React/Redux que contiene las siguientes pantallas/rutas:

__Pagina inicial__: una landing page con:
- [ ] Una imagen de fondo representativa al proyecto
- [ ] Un botón para ingresar al home (`Ruta principal`)

__Ruta principal__: contiene lo siguiente:
- [ ] Input de búsqueda para encontrar recetas por nombre
- [ ] Área donde se ve el listado de recetas. Muestra su:
  - Imagen
  - Nombre
  - Tipo de dieta (vegetariano, vegano, apto celíaco, etc)
- [ ] Opciones para filtrar por por tipo de dieta
- [ ] Opciones para ordenar tanto ascendentemente como descendentemente las recetas por orden alfabético y por puntuación
- [ ] Paginado para ir buscando y mostrando las siguientes recetas

__Ruta de detalle de receta__: contiene lo siguiente:
- [ ] Los campos mostrados en la ruta principal para cada receta (imagen, nombre, tipo de plato y tipo de dieta)
- [ ] Resumen del plato
- [ ] Puntuación
- [ ] Nivel de "comida saludable"
- [ ] Paso a paso

__Ruta de creación de recetas__: contiene lo siguiente:
- [ ] Un formulario controlado con los siguientes campos:
  - Nombre
  - Resumen del plato
  - Puntuación
  - Nivel de "comida saludable"
  - Paso a paso
- [ ] Posibilidad de agregar uno o más tipos de dietas
- [ ] Opción para crear una nueva receta

#### Base de datos

El modelo de la base de datos tiene las siguientes entidades:

- [ ] Receta con las siguientes propiedades:
  - ID
  - Nombre 
  - Resumen del plato 
  - Puntuación
  - Nivel de "comida saludable"
  - Paso a paso
- [ ] Tipo de dieta con las siguientes propiedades:
  - ID
  - Nombre

#### Backend

Se desarrolló un servidor en Node/Express con las siguientes rutas:

__IMPORTANTE__: Todas estas funcionalidades fueron implementadas sin el uso de librerías externas.

- [ ] __GET /recipes?name="..."__:
  - Obtiene un listado de las primeras 9 recetas que contengan la palabra ingresada como query parameter
  - Si no existe ninguna receta muestra un mensaje adecuado
- [ ] __GET /recipes/{idReceta}__:
  - Obtiene el detalle de una receta en particular
  - Trae solo los datos pedidos en la ruta de detalle de receta
  - Incluiye los tipos de dieta asociados
- [ ] __GET /types__:
  - Obtener todos los tipos de dieta posibles
  - Los tipos de dieta fueron precargados manualmente
- [ ] __POST /recipe__:
  - Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body
  - Crea una receta en la base de datos
