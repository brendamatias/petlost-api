import Address from '../../models/Address';
import responses from '../../../config/httpResponses';
import BaseException from '../../exceptions/CustomException';

module.exports = async (id) => {
  try {
    const address = await Address.findByPk(id);

    if (!address) {
      throw new BaseException('ADDRESS_NOT_FOUND');
    }

    return responses.ok(address);
  } catch (err) {
    throw err.name === 'CustomException' ? err : new Error(err);
  }
};
