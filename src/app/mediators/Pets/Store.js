import * as Yup from 'yup';

import Pet from '../../models/Pet';
import Address from '../../models/Address';
import CachePet from '../../../lib/CachePet';

import responses from '../../../config/httpResponses';
import BaseException from '../../exceptions/CustomException';

module.exports = async (userId, { name, filters, address_id }) => {
  try {
    const schema = Yup.object({
      name: Yup.string().required(),
      filters: Yup.string().required(),
      address_id: Yup.number().required(),
    });

    if (!(await schema.isValid({ name, filters, address_id }))) {
      throw new BaseException('VALIDATION_FAILS');
    }

    const addressExists = await Address.findOne({
      where: { id: address_id },
    });

    if (!addressExists) {
      throw new BaseException('ADDRESS_NOT_FOUND');
    }

    const pet = await Pet.create({
      name,
      filters,
      address_id,
      user_id: userId,
    });

    await CachePet.invalidatePrefix('pets-list');

    return responses.created(pet);
  } catch(err) {
    return responses.customError(err);
  }
}
