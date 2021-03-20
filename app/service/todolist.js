const Service = require('egg').Service;

class TodoService extends Service {
  async getTodoList({ user_uid, isEnd }) {
    const isExistName = await this.service.user.getUserById({ uid: user_uid });
    if (!isExistName) {
      return {
        code: 0,
        msg: '',
        data: [],
      };
    }
    const where =
      isEnd === 2
        ? {
            user_uid,
          }
        : {
            user_uid,
            isEnd,
          };
    const res = await this.app.mysql.select('todolist', {
      where,
      orders: [['time', 'desc']],
    });
    return {
      code: 0,
      msg: '',
      data: {
        list: res,
      },
    };
  }

  async getTodoDetail({ todoId }) {
    const res = await this.app.mysql.get('todolist', {
      uid: todoId,
    });
    console.log(res);
    if (res) {
      return {
        code: 0,
        msg: '',
        data: {
          detail: res,
        },
      };
    } else {
      return {
        code: 1,
        msg: '获取Todo详情失败',
        data: null,
      };
    }
  }

  async addTodolist({ title, content, user_uid }) {
    const isExistName = await this.service.user.getUserById({ uid: user_uid });
    const res = await this.app.mysql.insert('todolist', {
      title,
      content,
      user_uid,
      time: new Date(),
    });
    if (res.affectedRows === 1) {
      return {
        code: 0,
        msg: '发布成功',
      };
    } else {
      return {
        code: 1,
        msg: '发布待办失败，请稍后再试',
      };
    }
  }

  async updateStatus({ isEnd, todoId }) {
    console.log(isEnd, todoId);
    const res = await this.app.mysql.update(
      'todolist',
      {
        isEnd: isEnd,
      },
      {
        where: { uid: todoId },
      }
    );
    console.log(res);
    if (res.affectedRows === 1) {
      return {
        code: 0,
        msg: '状态更新成功',
      };
    } else {
      return {
        code: 1,
        msg: '状态更新失败',
        data: null,
      };
    }
  }

  async getListByDay({ user_uid }) {
    const sql = `select DATE_FORMAT(time, "%Y-%m-%d") as timer, COUNT(*) as count  FROM todolist where user_uid = ${user_uid} GROUP BY timer order by timer ASC limit 1000`;
    console.log(sql);
    const res = await this.app.mysql.query(sql);
    console.log(res);
    if (res) {
      return {
        code: 0,
        msg: '',
        data: { list: [...res] },
      };
    } else {
      return {
        code: 1,
        msg: '获取数据失败',
      };
    }
  }
}
module.exports = TodoService;
