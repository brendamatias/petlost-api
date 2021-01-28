import * as Yup from 'yup';
import Address from '../../models/Address';
import responses from '../../../config/httpResponses';
import BaseException from '../../exceptions/CustomException';

module.exports = async (
  userId,
  { address, neighborhood, number, complement, city, state, zipcode }
) => {
  try {
    const schema = Yup.object({
      address: Yup.string().required(),
      neighborhood: Yup.string().required(),
      number: Yup.string().required(),
      complement: Yup.string(),
      city: Yup.string().required(),
      state: Yup.string().required().min(2).max(2),
      zipcode: Yup.string().required().min(9).min(9),
    });

    if (
      !(await schema.isValid({
        address,
        neighborhood,
        number,
        complement,
        city,
        state,
        zipcode,
      }))
    ) {
      throw new BaseException('VALIDATION_FAILS');
    }

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
