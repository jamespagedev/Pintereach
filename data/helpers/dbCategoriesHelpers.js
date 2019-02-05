const db = require('../dbConfig.js');

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

module.exports = {
  getCategories,
  getCategory,
  addCategory
};
