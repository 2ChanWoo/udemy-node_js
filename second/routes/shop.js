const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', (req, res, next) => {
    // 직접 경로를 적어도 되지만, 리눅스는 슬래시, 윈도우는 백슬래시라 다를 수  있음.
    res.sendFile(path.join(__dirname, '..', 'views', 'shop.html'));
});

module.exports = router;