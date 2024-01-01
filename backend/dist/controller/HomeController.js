"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboard = void 0;
const dashboard = (req, res, next) => {
    res.render('admin/dashboard', {
        page: 'Dashboard',
        layout: 'layouts/main',
        currentUrl: req.originalUrl,
    });
};
exports.dashboard = dashboard;
