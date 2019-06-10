const KoaRouter = require('koa-router');
const router = new KoaRouter();
const ctrl = require('./controllers/crimes');

router.get('/crimes/points/:coords', ctrl.getCrimes );

router.post('/crimes', ctrl.saveCrimes);
router.post('/crime', ctrl.saveIndCrime);
router.get('/crimes', ctrl.getAllCrimes);
module.exports = router;
