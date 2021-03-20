'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async register() {
    const { ctx, service } = this;
    const { username, password } = ctx.request.body;
    const res = await service.user.registerUser({ username, password });
    ctx.body = res;
  }

  async login() {
    const { ctx, app } = this;
    const { username, password } = ctx.request.body;
    const res = await ctx.service.user.login({ username, password });
    if (res.code === 0) {
      const token = app.jwt.sign(
        {
          username,
        },
        app.config.jwt.secret
      );
      ctx.body = {
        ...res,
        data: { ...res.data, token },
      };
      console.log(ctx.response.body);
    } else {
      ctx.body = res;
    }
  }
}

module.exports = HomeController;
