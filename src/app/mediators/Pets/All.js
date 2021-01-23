import { Op } from 'sequelize';

import CachePet from '../../../lib/CachePet';

import Pet from '../../models/Pet';
import File from '../../models/File';
import Petfile from '../../models/Petfile';
import Address from '../../models/Address';

import responses from '../../../config/httpResponses';

module.exports = async ({ page = 1, filters = '' }) => {
  try {
    let pets = await CachePet.recover('pets-list');

    if (!pets) {
      pets = await Pet.findAll({
        include: [
          {
            model: Address,
            as: 'address',
            attributes: ['id', 'city', 'state'],
          },
          {
            model: Petfile,
            as: 'files',
            attributes: ['id', 'file_id'],
            include: [
              {
                model: File,
                as: 'file',
                attributes: ['id', 'url', 'path'],
              },
            ],
          },
        ],
        where: {
          user_id: { [Op.ne]: null },
          filters: { [Op.like]: `%${filters}%` },
        },
        limit: 20,
        offset: (page - 1) * 20,
      });
    }

    await CachePet.save('pets-list', pets);

    return responses.ok(pets);
  } catch (err) {
    throw err.name === 'CustomException' ? err : new Error(err);
  }
};
