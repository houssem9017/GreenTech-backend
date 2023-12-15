import express from 'express';
import { createPackage, addCategoryDataToPackage, getPackagebyId, getPackagebyCategory, getPackagebyFilters, deletePackage } from '../controllers/packageController.js';
import { verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

router.post('/create', createPackage);
router.post('/addcategorydata', addCategoryDataToPackage);
router.get('/getpackagebyid/:packageId', getPackagebyId);
router.get('/getpackagebycategory/:category', getPackagebyCategory);
router.post('/getPackagebyfilters', getPackagebyFilters);
router.post('/deletepackage', verifyUser, deletePackage);

export default router;
