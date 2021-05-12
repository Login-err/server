"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app;
  router.post("/login", controller.home.login);
  router.post("/register", controller.home.register);

  router.post("/addTodolist", controller.todolist.add);
  router.post("/getList", controller.todolist.getList);
  router.post("/getListDetail", controller.todolist.getListDetail);
  router.post("/updateStatus", controller.todolist.updateDetailStatus);
  router.post("/getListByDay", controller.todolist.getListByDay);

  router.post("/speedRep", controller.home.speedRep);
};
