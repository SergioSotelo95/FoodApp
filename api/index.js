//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn, Type } = require('./src/db.js');

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(process.env.PORT, () => {
    console.log('listening at port ' + process.env.PORT);
  
    let gluten = Type.findOrCreate({
      where: {
        name: 'gluten free',
      },
    });
    let keto = Type.findOrCreate({
      where: {
        name: 'ketogenic',
      },
    });
    let dairy = Type.findOrCreate({
      where: {
        name: 'dairy free',
      },
    });
    let veggie = Type.findOrCreate({
      where: {
        name: 'lacto ovo vegetarian',
      },
    });
    let fodmap = Type.findOrCreate({
      where: {
        name: 'fodmap friendly',
      },
    });
    let vegan = Type.findOrCreate({
      where: {
        name: 'vegan',
      },
    });
    let pescatarian = Type.findOrCreate({
      where: {
        name: 'pescatarian',
      },
    });
    let paleo = Type.findOrCreate({
      where: {
        name: 'paleolithic',
      },
    });
    let primal = Type.findOrCreate({
      where: {
        name: 'primal',
      },
    });
    let whole = Type.findOrCreate({
      where: {
        name: 'whole 30',
      },
    });
    let vegetarian = Type.findOrCreate({
      where: {
        name: 'vegetarian',
      },
    });

    Promise.all([
      vegetarian,
      gluten,
      keto,
      dairy,
      veggie,
      fodmap,
      vegan,
      pescatarian,
      paleo,
      primal,
      whole,
    ]).then(() => {
      console.log('Types cargados');
    });
  });

});
