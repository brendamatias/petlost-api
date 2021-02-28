import aws from 'aws-sdk';
import BaseException from '../exceptions/CustomException';

const fs = require('fs');
const { promisify } = require('util');

const unlinkAsync = promisify(fs.unlink);

module.exports = async (file) => {
  if (process.env.NODE_ENV === 'production') {
    const s3 = new aws.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      Bucket: process.env.BUCKET_NAME,
    });

    s3.deleteObject({ Bucket: process.env.BUCKET_NAME, Key: file }, (err) => {
      if (err) {
        throw new BaseException('DELETE_FILE_ERROR');
      }
    });
  } else {
    await unlinkAsync(`tmp/uploads/${file}`);
  }
};
