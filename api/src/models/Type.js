// const { DataTypes } = require('sequelize');
// // Exportamos una funcion que define el modelo
// // Luego le injectamos la conexion a sequelize.
// module.exports = function (sequelize) {
//   // defino el modelo
//   return sequelize.define('dietType', {
//       name: {
//       type: DataTypes.STRING
//     },
//   });
// };
const { DataTypes } = require('sequelize');

module.exports = function (sequelize) {

    //! El id se carga por defecto aunque no se lo incluya en la tabla

    return sequelize.define('type', {
        name: {
            type: DataTypes.STRING,
        }
    })
}