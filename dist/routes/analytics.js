"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const analytics_1 = require("../controller/analytics");
const router = (0, express_1.Router)();
router.get('/count-users', analytics_1.countUsers);
router.get('/today-sessions', analytics_1.countActiveTodaySessions);
router.get('/week-sessions', analytics_1.countActiveSevenDaysSession);
exports.default = router;
