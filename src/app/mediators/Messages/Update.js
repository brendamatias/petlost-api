import responses from '../../../config/httpResponses';

module.exports = async () => {
  try {
    return responses.noContent();
  } catch (err) {
    throw err.name === 'CustomException' ? err : new Error(err);
  }
};
