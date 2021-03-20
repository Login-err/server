function auth() {
  return async (ctx, next) => {
    const { app } = ctx;
    // 不需要校验的路由
    const routerAuth = app.config.routerAuth;
    const url = ctx.url;
    const flag = routerAuth.includes(url);
    if (flag) {
      await next();
    } else {
      let token = ctx.headers.authorization ? ctx.headers.authorization : '';
      try {
        const decode = await app.jwt.verify(token, app.config.jwt.secret);
        ctx.state.userinfo = decode;
        await next();
      } catch (err) {
        console.log(err);
        ctx.status = 10000;
        ctx.body = {
          code: 10000,
          message: 'token已失效，请重新登录',
          data: null,
        };
        await next();
      }
    }
  };
}
module.exports = auth;
