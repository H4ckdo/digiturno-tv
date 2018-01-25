/**
 * route.js
 *
 * @description :: This file describe the routing mapping of the API
 */

module.exports.routes = {
  "GET /":"HomepageController.show",

  /**
  * @description :: EPS CRUD
  */
  "GET /EPS/show/:id":"EPSController.show",

  "GET /EPS/showAll":"EPSController.showAll",

  "POST /EPS/create":"EPSController.create",

  "GET /EPS/join": "EPSController.join",  

  "PUT /EPS/update/:id":"EPSController.update",

  "DELETE /EPS/delete/:id":"EPSController.remove",

  /**
  * @description :: Modulo CRUD
  */
  "GET /modulo/show/:id":"ModulosController.show",

  "GET /modulo/showAll":"ModulosController.showAll",

  "POST /modulo/create":"ModulosController.create",

  "PUT /modulo/update/:id":"ModulosController.update",

  "DELETE /modulo/delete/:id":"ModulosController.remove",

  /**
  * @description :: Token CRUD
  */
  "GET /token/stack":"TokensController.joinToStack",

  "GET /token/show/:id":"TokensController.show",

  "GET /token/showAll":"TokensController.showAll",

  "POST /token/create":"TokensController.create",

  "POST /token/showInTV":"TokensController.showInTV",

  "PUT /token/update/:id":"TokensController.update",

  "DELETE /token/delete/:id":"TokensController.remove",

  /**
  * @description :: TV ROOM
  */
  "GET /tv/join":"TokensController.joinTV"

}
