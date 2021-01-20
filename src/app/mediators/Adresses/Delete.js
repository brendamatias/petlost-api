import Address from '../../models/Address';
import responses from '../../../config/httpResponses';
import BaseException from '../../exceptions/CustomException';

module.exports = async (id, userId) => {
  try {
    const address = await Address.findByPk(id);

    if (!address) {
      throw new BaseException('ADDRESS_NOT_FOUND');
    }

    if (address.user_id !== userId) {
      throw new BaseException('UNAUTHORIZED_USER');
    }

    await address.destroy();

    return responses.noContent();
  } catch (err) {
    return responses.customError(err);
  }
};
