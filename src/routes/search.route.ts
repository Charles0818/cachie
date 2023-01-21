import express from 'express';
import Search from '../services/search.service';
const router = express.Router();

router.post('/search', Search.postSearch)
router .get('/analyse', Search.analyseSearch)

export default router;