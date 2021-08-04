const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = function (sequelize) {
  // defino el modelo
  //! Score podría ser cambiado por spoonacularScore para traer elementos al filtro?
  //! Seteé una imagen por defecto porque las recetas creadas no tienen ninguna
  
  const Recipe = sequelize.define('recipe', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    score: {
      type: DataTypes.INTEGER // revisar si es un FLOAT
    },
    healthScore: {
      type: DataTypes.INTEGER
    },
    steps: {
      type: DataTypes.TEXT
    },
    image:{
      type: DataTypes.STRING,
      defaultValues:"https://www.montesecookingexperience.com/wp-content/uploads/2020/05/cacciatora-chicken-400x250.jpg"
    }

  });

  return Recipe

};

