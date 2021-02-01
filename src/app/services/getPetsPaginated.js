import Pet from '../models/Pet';
import Petfile from '../models/Petfile';
import Address from '../models/Address';

module.exports = async ({ page, limit, type, situation, user_id }) => {
  const whereClause = {
    status: true,
  };

  if (type) {
    whereClause.type = type;
  }

  if (situation) {
    whereClause.situation = situation;
  }

  if (user_id) {
    whereClause.user_id = user_id;
  }

  const pets = await Pet.findAndCountAll({
    include: [
      {
        model: Address,
        as: 'address',
        attributes: ['id', 'city', 'state'],
      },
      {
        model: Petfile,
        as: 'files',
        attributes: ['id', 'name', 'path', 'url'],
      },
    ],
    where: whereClause,
    limit,
    offset: (page - 1) * limit,
  });

  return {
    total: pets.count,
    perPage: parseInt(limit, 10),
    page: parseInt(page, 10),
    lastPage: Math.ceil(pets.count / limit),
    rows: pets.rows,
  };
};
