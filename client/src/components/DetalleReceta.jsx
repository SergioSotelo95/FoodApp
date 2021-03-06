import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getID } from '../store/actions/recipesActions'
import parse from 'html-react-parser';
import styles from './DetalleReceta.module.css';
import Nav from './Nav'

function DetalleReceta({ recipeDetail, getID, match }) {

    const id = match.params.id;
    // let dietas = recipeDetail.types
    // console.log("asdasdksadsaldjsaljalsd", dietas)
// eslint-disable-next-line
    function getIDFunction(id) {
        getID(id)
    }

    useEffect(() => {
        getIDFunction(id)
    }, [getIDFunction, id])


    if (typeof recipeDetail.id === "number") {
        return (
            <div className={styles.divPrincipal}>
                {console.log(recipeDetail)}
                <div className={styles.nav}>
                    <Nav />
                </div>
                <div className={styles.divMain}>
                    <div className={styles.title}>
                        <p>{recipeDetail.title}</p>
                    </div>
                    <br />
                    <br />
                    <div className={styles.img}>

                        <img src={recipeDetail.image} alt="Imagen no encontrada" />
                    </div>
                    <br />
                    <br />
                    <p>Score</p>
                    <div className={styles.score}>{recipeDetail.spoonacularScore}</div>
                    <br />
                    <br />
                    <p>Health Score</p>
                    <div className={styles.healthScore}>{recipeDetail.healthScore}</div>
                    <br />
                    <br />
                    <p>DIET TYPES</p>
                    {console.log(recipeDetail)}
                    {recipeDetail.diets && recipeDetail.diets.map(recipe => {
                        return <p>{recipe}</p>
                    })}
                    <br />
                    <br />
                    <p>DISH TYPES</p>
                    {recipeDetail.dishTypes && recipeDetail.dishTypes.map(plato => {
                        return <p>{plato}</p>
                    })}
                    <br />
                    <br />
                    <p>SUMMARY</p>
                    <br />
                    <div className={styles.summary}>
                        <p>
                            {recipeDetail.summary && parse(recipeDetail.summary)}
                        </p>
                    </div>
                    <br />
                    <br />
                    <p>INSTRUCTIONS</p>
                    <br />
                    <div className={styles.instructions}>
                        <p>
                            {recipeDetail.instructions && parse(recipeDetail.instructions)}
                        </p>
                    </div>

                </div>
            </div>
        ) 
    } else {
        return (
            <div className={styles.divPrincipal}>
                {console.log(recipeDetail)}
                <div className={styles.nav}>
                    <Nav />
                </div>
                <div className={styles.divMain}>
                    <div className={styles.title}>
                        <p>{recipeDetail.title}</p>
                    </div>
                    <br />
                    <br />
                    <div className={styles.imgg}>

                        <img src={recipeDetail.image} alt="Imagen no encontrada" />
                    </div>
                    <br />
                    <br />
                    <p>Score</p>
                    <div className={styles.score}>{recipeDetail.score}</div>
                    <br />
                    <br />
                    <p>Health Score</p>
                    <div className={styles.healthScore}>{recipeDetail.healthScore}</div>
                    <br />
                    <br />
                    <p>DIET TYPES</p>
                    
                    {/* {console.log(recipeDetail)} */}
                    {recipeDetail.types && recipeDetail.types.map(recipe => {
                        return <p>{recipe.name}</p>
                    })}
                    <br />
                    <br />
                    <br />
                    <br />
                    <p>SUMMARY</p>
                    <br />
                    <div className={styles.summary}>
                        <p>
                            {recipeDetail.summary && parse(recipeDetail.summary)}
                        </p>
                    </div>
                    <br />
                    <br />
                    <p>INSTRUCTIONS</p>
                    <br />
                    <div className={styles.instructions}>
                        <p>

                            {recipeDetail.steps && parse(recipeDetail.steps)}
                        </p>
                    </div>

                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        recipeDetail: state.recipeDetail,
        

    }
}
const mapDispatchtoProps = dispatch => {
    return {
        getID: id => {
            dispatch(getID(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchtoProps)(DetalleReceta)