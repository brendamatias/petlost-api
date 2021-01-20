import File from '../../models/File';
import responses from '../../../config/httpResponses';

module.exports = async ({ originalname: name, key }) => {
  try {
    const file = await File.create({
      name,
      path: key,
    });

    return responses.created(file);
  } catch (err) {
    return responses.customError(err);
  }
};
