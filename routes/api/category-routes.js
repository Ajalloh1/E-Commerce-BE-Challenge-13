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

router.put('/:id', (req, res) => {


  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
    
  })
  .then((category) => res.status(200).json(category))
  .catch((err)=> res.status(400).json(err))
  // update a category by its `id` value
  // try {
  //   // const categories= await Category.findByPk(req.params.id);
  //   const updateCategory= await Category.update(req.body, {
  //     where: {
  //       id: req.params.id,
  //     },
  //   });

  //   // if (!category) {
  //   //   res.status(404).json({ message: `Category id NOT found: ${req.params.id}` });
  //   //   return;
  //   // }

  //   if (!updateCategory) {
  //     res.status(400).json({ message: `Data category not updated for id: ${req.params.id}` });
  //     return;
  //   };

  //   res.status(200).json(updateCategory);
  // } catch (err){
  //   res.status(500).json(err);
  // };
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then((category) => res.status(200).json(category))
  .catch((err)=> res.status(400).json(err))
});

module.exports = router;

