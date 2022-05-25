'use strict';

const CandyJs = require('candyjs');
const Controller = require('candyjs/web/Controller');

module.exports = class IndexController extends Controller {

    run(req, res) {
        this.getView().enableLayout = true;

        this.render('index');
    }

}
