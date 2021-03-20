const Controller = require('egg').Controller;

class TodoListController extends Controller {
  async add() {
    const { ctx, service } = this;
    const { title, content, user_uid } = ctx.request.body;
    console.log(ctx.request.body);
    const res = await service.todolist.addTodolist({
      title,
      content,
      user_uid,
    });
    ctx.body = res;
  }

  async getList() {
    const { ctx, service } = this;
    const { user_uid, isEnd } = ctx.request.body;
    const res = await service.todolist.getTodoList({
      user_uid,
      isEnd,
    });
    ctx.body = res;
  }

  async getListDetail() {
    const { ctx, service } = this;
    const { todoId } = ctx.request.body;
    const res = await service.todolist.getTodoDetail({
      todoId,
    });
    ctx.body = res;
  }

  async updateDetailStatus() {
    const { ctx, service } = this;
    const { isEnd, todoId } = ctx.request.body;
    const res = await service.todolist.updateStatus({
      isEnd,
      todoId,
    });
    ctx.body = res;
  }

  async getListByDay() {
    const { ctx, service } = this;
    const { user_uid } = ctx.request.body;
    const res = await service.todolist.getListByDay({ user_uid });
    ctx.body = res;
  }
}

module.exports = TodoListController;
