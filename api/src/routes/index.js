require('dotenv').config()
const { Router } = require('express');
const axios = require('axios')
const { v4: uuidv4 } = require('uuid');
const { Recipe, Type } = require('../db');
const { Sequelize, Op } = require('sequelize')
const { APIKEY } = process.env
const validator = require('validator')

//! UUID 4 crea un id único para los elementos de las tablas
//! se necesita Op para buscar aproximados y no exactos
//! validator se encarga de manipular UUID

// const { UUIDV4 } = require('sequelize/types');



// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// router.get(`/recipes`, (req, res, next) => {

//         const {query} = req.query
//         // let array = [];
//          axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${APIKEY}`)
//         .then(response => {
//             res.json(response.data)


//             if(!response.data) {
//              console.log("No existe la receta")
//             }
//         })

//         // Recipe.findAll()
//         // .then((recipes) => {
//         //     // array.push(recipes)
//         //     res.send(recipes)

//         // })

//     .catch(error => next(error))


// })

// router.get('/main', (req, res, next) => {
//     axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=9&apiKey=${APIKEY}`)
//     .then(respuesta => res.send(respuesta.data))
//     .catch(error => next(error))
// })

// router.get(`/recipes`, (req, res, next) => {
//     const { query } = req.query
//     var database = Recipe.findAll({ where: { name: query } })
//     var api = axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=100&apiKey=${APIKEY}`)

//     Promise.all([database, api])
//         .then((results) => {
//             const [resDB, resAPI] = results;
//             const response = resDB.concat(resAPI.data.results);

//             if (response.length === 0) {
//                 res.send("No existe la receta")
//             }
//             else {
//                 res.send(response)
//             }
//         })
//         .catch(e => next(e))
// })


// var database = Recipe.findAll({ where: { title: {
        //     [Sequelize.Op.like]: query
        //   }, } })
        // // .then(response => response.map(receta => receta.datavalues))
        // .then(recetas => recetas?.map(receta => ({
        //     id: receta.id,
        //     title: receta.title,
        //     spoonacularScore: receta.score,
        //     healthScore: receta.health,
        //     summary: receta.summary,
        //     steps: receta.steps,
        //     image: "https://s1.1zoom.me/b5355/718/Knife_Vegetables_Cutting_board_527517_3840x2400.jpg",
        //     diets: [],
        //     dishtypes: []
        // })))

router.get(`/recipes`, async (req, res, next) => {
    const { query } = req.query
    if (query) { //! Si existe query se va a buscar por esa query, primero en la BD, luego en la API
       
        var database = await (async () => {
            console.log(query)
            var response = await Recipe.findAll({
                where:
                {
                    title:
                        { [Sequelize.Op.like]: `%${query}%` } //! Esto busca recetas aproximadas en lugar de exactas
                },
                include: [Type] //! Necesario para incluir los tipos de dieta
            })
            // console.log("response:", response)
            return response;
        })()
       
        var api = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=100&apiKey=${APIKEY}&addRecipeInformation=true`)

        Promise.all([database, api]) //! Una vez encontradas todas las recetas, las concateno para poder mostrarlas juntas
            .then((results) => {
                const [resDB, resAPI] = results;
                const response = resDB.concat(resAPI.data.results);

                if (response.length === 0) {
                    res.send("No existe la receta")
                }
                else {  
                    res.send(response)
                }
            })
            .catch(e => next(e))
    } else { //! Si no se encuentra query o si no se busca nada, solo se van a mostrar las primeras recetas de la api
        axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=100&apiKey=${APIKEY}&addRecipeInformation=true`)
        .then(recipes => {
            res.send(recipes.data)
        })
        .catch(e => next(e))
    }

})

router.get('/recipes/:id', (req, res, next) => {
    const id = req.params.id;
    console.log(id)

    if (validator.isUUID(id, [4])) {
        //! Esto debería incluir los tipos de dieta a las recetas de la BD
        Recipe.findOne({
            where: 
            {id:id},
        include: {
            model: Type,
            attributes: ["name"],
            through: {
                attributes: []
            }
        }})
            .then(recipe => {
                res.send(recipe)
            })
            .catch(e => {
                //!El error hace que funcionen los tests
                res.status(404).send("Error");
                next(e)
            })
    } else {
        axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${APIKEY}&addRecipeInformation=true`)
            .then(recipes => {
                res.send(recipes.data)
            })
            .catch(e => {
                //! El error hace que funcionen los tests
                res.status(404).send("Error")
                next(e)
            })
    }
})

//! Get a types. Trae todo lo que precargué en la BD. Se carga en el formulario de crear recetas
router.get('/types', async (req, res,) => {
    const types = await Type.findAll()
    res.status(200).send(types);
})



router.post('/recipe', async (req, res) => {
    let { title, summary, score, healthScore, steps, diets} = req.body
//! Trae la info del formulario por body. La imagen está harcodeada para que se cargue la misma en todas las recetas creadas
    const recipe = await Recipe.create({
        id: uuidv4(),
        title,
        summary,
        score,
        healthScore,
        steps,
        image: "https://www.montesecookingexperience.com/wp-content/uploads/2020/05/cacciatora-chicken-400x250.jpg"
    })

    if (!Array.isArray(diets)) {
        diets = [diets];
    };

    //encuentro la data que coincide con la requerida por req.body
    const dietsDB = await Type.findAll({
        where: {
            name: {
                [Sequelize.Op.in]: diets,//operador que el nombre coincida con el array
            },
        },
    });

    //las seteo
    await recipe.setTypes(dietsDB);
    res.status(200).json(recipe);
})



module.exports = router;
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);



