import Pet from '../../models/Pet';
import responses from '../../../config/httpResponses';
import BaseException from '../../exceptions/CustomException';

module.exports = async (id) => {
  try {
    const pet = await Pet.findByPk(id);

    if (!pet) {
      throw new BaseException('PET_NOT_FOUND');
    }

    return responses.ok(pet);
  } catch (err) {
    return responses.customError(err);
  }
};
