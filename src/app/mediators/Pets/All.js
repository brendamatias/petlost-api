import responses from '../../../config/httpResponses';
import getPetsPaginated from '../../services/getPetsPaginated';

module.exports = async ({ page = 1, limit = 20, type, situation, user_id }) => {
  try {
    const pets = await getPetsPaginated({
      page,
      limit,
      type,
      situation,
      user_id,
    });

    return responses.okPaginated(pets);
  } catch (err) {
    throw err.name === 'CustomException' ? err : new Error(err);
  }
};
