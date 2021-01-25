export default async (req, res, next) => {
  res.on('finish', () => {
    console.log(
      `
      ------
      ${req.method}: ${req.url}
      REQUEST HEADERS: ${JSON.stringify(req.headers)}

      REQUEST PARAMS: ${JSON.stringify(req.body)}
      REQUEST FILE: ${JSON.stringify(req.file)}
      ------
    `
    );
  });

  next();
};
