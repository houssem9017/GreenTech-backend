import Package from '../models/package.js';
import User from '../models/user.js';
import CategoryData from '../models/categoryData.js';

export const createPackage = async (req, res, next) => {
    try {
        const { user_id, ...packageData } = req.body;
        const user = await User.findById(user_id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }
        const newPackage = new Package({
            
            ...packageData,
           
        });
        await newPackage.save();
        res.status(200).json({ success: true, message: 'Package has been created successfully.' });
    } catch (err) {
        console.log(err);
        next(err);
    }
};

export const addCategoryDataToPackage = async (req, res, next) => {
    try {
        const { categoryData, packageId } = req.body;
        const packagee = await Package.findById(packageId);

        if (!packagee) {
            return res.status(404).json({ success: false, message: 'Package not found' });
        }

        let categoryModel = new CategoryData(categoryData);;

        await categoryModel.save();
        packagee.categoryData = categoryModel;
        await packagee.save();

        res.status(200).json({ success: true, message: 'Category data has been added to the package', package: packagee });
    } catch (err) {
        next(err);
    }
};

export const getPackagebyId = async (req, res, next) => {
    try {
        const packagee = await Package.findById(req.params.packageId).populate('categoryData');

        if (!packagee) {
            return res.status(404).json({ success: false, message: 'Package not found' });
        }

        res.status(200).json( packagee );
    } catch (err) {
        next(err);
    }
};

export const getPackagebyCategory = async (req, res, next) => {
    try {
        const packagee = await Package.find({ category: req.params.category }).select('name estimatedSize');

        res.status(200).json(packagee);
    } catch (err) {
        next(err);
    }
};

/*
Inputs
req: The request object containing the filters in the body property.
Based on the filter type, update the criteria object and add the filter to the selectFields array.
If the filter is 'otherSustainability', 'otherType', or 'otherPackagingType', check if the corresponding property exists in the request body and update the criteria object accordingly.
Construct the final query using the $or operator and the filterCriteria array.
Return the packages as the output.
*/
export const getPackagebyFilters = async (req, res, next) => {
    try {
        const filters = req.body.filters;
        const filterCriteria = [];
        const selectFields = ['name', 'category'];
        filters.forEach(filter => {
            const criteria = {};

            switch (filter) {
                case 'biodegradable':
                case 'compostable':
                case 'recyclable':
                case 'reusable':
                case 'liquid':
                case 'solid':
                case 'powder':
                case 'granules':
                case 'fragile':
                case 'flexible':
                case 'rigid':
                case 'protective':
                case 'transparent':
                case 'opaque':
                    criteria[filter] = true;
                    selectFields.push(filter);
                    break;
                case 'otherSustainability':
                    selectFields.push('otherSustainability');
                    if (req.body.otherSustainability) {
                        criteria[filter] = req.body.otherSustainability;
                    }
                    break;
                case 'otherType':
                    selectFields.push('otherType');
                    if (req.body.otherType) {
                        criteria[filter] = req.body.otherType;
                    }
                    break;
                case 'otherPackagingType':
                    selectFields.push('otherPackagingType');
                    if (req.body.otherPackagingType) {
                        criteria[filter] = req.body.otherPackagingType;
                    }
                    break;
                default:
                    break;
            }

            if (Object.keys(criteria).length > 0) {
                filterCriteria.push(criteria);
            }
        });

        // Construct the final query to find packages with OR logic
        const packages = await Package.find({
            $or: filterCriteria,
        }).select(selectFields.join(' '));

        res.status(200).json(packages);
    } catch (err) {
        next(err);
    }
};

export const deletePackage = async (req, res, next) => {
    try {
        const packagee = await Package.findById(req.body.packageId);

        if (!packagee) {
            return res.status(404).json({ success: false, message: 'Package not found' });
        }
        if (packagee.user != req.body.userId) {
            return res.status(401).json({ success: false, message: 'User not authorized' });
        }

        await packagee.remove();

        res.status(200).json({ success: true, message: 'Package has been deleted successfully.' });
    } catch (err) {
        next(err);
    }
}