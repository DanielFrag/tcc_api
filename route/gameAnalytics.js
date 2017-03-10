var express = require('express');
var router = express.Router();

router.use(()=>{
    console.log('middleware de gameAnalytics');
});

router.post('/users', (req, res)=> {
        res.send('users route');
    });

module.exports = router;