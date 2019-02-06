const db = require('../dbConfig.js');
const dbRelationship = require('../helpers/dbRelationshipHelpers.js');

const getCategories = () => {
  return db.select('name').from('categories');
};

const getCategory = (id, isAdmin) => {
  if (!!isAdmin) return db('categories').where('id', id);
  return db
    .select('id', 'name')
    .from('categories')
    .where('id', id);
};

const addCategory = async category => {
  const doesExist = await db('categories')
    .whereRaw('LOWER(name) = ?', category.name.toLowerCase())
    .first();
  if (doesExist) {
    throw { errno: 19 };
  }
  return db('categories').insert(category);
};

const deleteCategory = async category_id => {
  const countDeleted = await dbRelationship.deleteCategoryToArticles(
    category_id
  );

  return await db('categories')
    .where('id', category_id)
    .del();
};

module.exports = {
  getCategories,
  getCategory,
  addCategory,
  deleteCategory
};
