const breedsCats = require('../../utils/breeds_cats');
const breedsDogs = require('../../utils/breeds_dogs');

module.exports = {
  up: (queryInterface) => {
    const cats = breedsCats.map((breedCat) => {
      return {
        name: breedCat,
        type: 'cat',
        created_at: new Date(),
        updated_at: new Date(),
      };
    });

    const dogs = breedsDogs.map((breedDog) => {
      return {
        name: breedDog,
        type: 'dog',
        created_at: new Date(),
        updated_at: new Date(),
      };
    });

    return queryInterface.bulkInsert('breeds', [...cats, ...dogs], {
      ignoreDuplicates: true,
    });
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete('breeds', null, {});
  },
};
