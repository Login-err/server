"use strict";

const Service = require("egg").Service;

class ReportService extends Service {
  async speedRep({ cgiName, time }) {
    const res = await this.app.mysql.insert("speed", {
      cgi_name: cgiName,
      time,
    });

    if (res.affectedRows === 1) {
      return {
        code: 0,
        msg: "",
      };
    } else {
      return {
        code: 1,
        msg: "速度上报失败",
      };
    }
  }
}
module.exports = ReportService;
