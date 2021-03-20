'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  // 判断用户是否存在  不存在返回null
  async getUserById({ username, uid }) {
    if (username) {
      const res = await this.app.mysql.get('userinfo', { username });
      return res;
    } else if (uid) {
      const res = await this.app.mysql.get('userinfo', { uid });
      return res;
    } else {
      return null;
    }
  }

  async registerUser({ username, password }) {
    const userInfo = await this.getUserById({ username });
    if (!userInfo) {
      const res = await this.app.mysql.insert('userinfo', {
        username,
        password,
      });
      if (res.affectedRows === 1) {
        return {
          code: 0,
          msg: '',
        };
      } else {
        return {
          code: 1,
          msg: '用户注册失败，请稍后再试',
        };
      }
    }
    return {
      code: 2,
      msg: '该用户名已存在，换个名字试试~',
    };
  }

  async login({ username, password }) {
    const userInfo = await this.getUserById({ username, password });
    if (userInfo === null) {
      return {
        code: 2,
        msg: '该用户不存在',
        data: null,
      };
    } else {
      const { username, password } = userInfo;
      if (username === username && password === password) {
        delete userInfo.password;
        return {
          code: 0,
          msg: '登录成功',
          data: { ...userInfo },
        };
      } else {
        return {
          code: 1,
          msg: '密码错误',
          data: null,
        };
      }
    }
  }
}
module.exports = UserService;
