import responses from '../../../config/httpResponses';

module.exports = async () => {
  try {
    return responses.noContent();
  } catch (err) {
    return responses.customError(err);
  }
};
