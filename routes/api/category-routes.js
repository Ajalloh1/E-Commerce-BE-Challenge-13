const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categories = await Category.findOne({
      where: {
        id: req.params.id
      },
      include: {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    })
    if (!categories) {
      res.status(404).json({ message: 'Category id NOT found' });
      return;
    }
    res.json(categories);
  }
  catch (err) {
    res.status(500).json(err)
  };
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categories = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(201).json("Your category was created");
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = Category.findByPk(req.params.id);
    const updateCategoryData = Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!categoryData) {
      res.status(404).json({ message: `Category id NOT found: ${req.params.id}` });
      return;
    }

    if (!updateCategoryData[0]) {
      res.status(400).json({ message: `Data category not updated for id: ${req.params.id}` });
      return;
    };

    res.status(200).json(updateCategoryData);
  } catch {
    res.status(500).json(err);
  };
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  }).then(dbCatData => {
    if (!dbCatData) {
      res.status(404).json({ message: 'No category found with that id.' });
      return;
    }
    res.json(dbCatData);
  })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;

