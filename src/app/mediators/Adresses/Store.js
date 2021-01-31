import Address from '../../models/Address';
import responses from '../../../config/httpResponses';

module.exports = async (
  userId,
  { address, neighborhood, number, complement, city, state, zipcode }
) => {
  try {
    const addressData = await Address.create({
      address,
      neighborhood,
      number,
      complement,
      city,
      state,
      zipcode,
      user_id: userId,
    });

    return responses.created(addressData);
  } catch (err) {
    throw err.name === 'CustomException' ? err : new Error(err);
  }
};
