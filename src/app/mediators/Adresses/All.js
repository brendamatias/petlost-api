import Address from '../../models/Address';
import responses from '../../../config/httpResponses';

module.exports = async (userId) => {
  try {
    const adresses = await Address.findAll({ where: { user_id: userId } });

    return responses.ok(adresses);
  } catch (err) {
    return responses.customError(err);
  }
};
