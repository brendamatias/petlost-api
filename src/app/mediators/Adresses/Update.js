import * as Yup from 'yup';

import Address from '../../models/Address';

import responses from '../../../config/httpResponses';
import BaseException from '../../exceptions/CustomException';

module.exports = async (id, userId, body) => {
  try {
    const schema = Yup.object({
      address: Yup.string(),
      neighborhood: Yup.string(),
      number: Yup.string(),
      complement: Yup.string(),
      city: Yup.string(),
      state: Yup.string().min(2).max(2),
      zipcode: Yup.string().min(9).min(9),
    });

    if (!(await schema.isValid(body))) {
      throw new BaseException('VALIDATION_FAILS');
    }

    const address = await Address.findByPk(id);

    if (!address) {
      throw new BaseException('ADDRESS_NOT_FOUND');
    }

    if (address.user_id !== userId) {
      throw new BaseException('UNAUTHORIZED_USER');
    }

    await address.update(body);

    return responses.ok(address);
  } catch (err) {
    return responses.customError(err);
  }
};
