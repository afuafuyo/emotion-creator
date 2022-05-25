const Request = require('candyjs/http/Request');

const Ajax = require('../../../libs/Ajax');
const list = require('../../../data/Images');

module.exports = class ListController {
    run(req, res) {
        let r = new Request(req);
        let type = r.getQueryString('type', '');

        let tabs = this.getTabs();
        let list = this.getList(type);

        Ajax.toString(res, {
            tabs: tabs,
            list: list
        });
    }

    getList(type) {
        if(!type) {
            return list[0].list;
        }

        for(let i=0; i<list.length; i++) {
            if(type === list[i].type) {
                return list[i].list;
            }
        }

        return [];
    }

    getTabs() {
        let ret = [];
        for(let i=0; i<list.length; i++) {
            ret.push({
                type: list[i].type,
                name: list[i].name
            });
        }

        return ret;
    }
}
