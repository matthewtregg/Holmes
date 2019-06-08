const KoaRouter = require('koa-router');
const router = new KoaRouter();
const ctrl = require('./controllers/crimes');

router.get('/crimes/lat1/:lat1/lng1/:lng1/lat2/:lat2/lng2/:lng2/lat3/:lat3/lng3/:lng3', ctrl.getCrimes );
router.post('/crimes', ctrl.saveCrimes);
router.post('/crime', ctrl.saveIndCrime );

module.exports = router;
