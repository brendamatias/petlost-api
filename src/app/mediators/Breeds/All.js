import Breed from '../../models/Breed';

import responses from '../../../config/httpResponses';

module.exports = async ({ type }) => {
  try {
    const breeds = await Breed.findAll({ where: { type } });

    return responses.ok(breeds);
  } catch (err) {
    throw err.name === 'CustomException' ? err : new Error(err);
  }
};
