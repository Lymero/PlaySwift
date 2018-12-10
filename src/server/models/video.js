const Joi = require("joi");

function validate(video) {
  const schema = {
    id_playlist: Joi.number()
      .integer()
      .required(),
    url_video: Joi.string()
      .min(1)
      .max(255)
      .required(),
    description: Joi.string()
      .min(1)
      .max(255),
    id_user: Joi.string()
      .min(1)
      .max(255)
      .required()
  };

  return Joi.validate(video, schema);
}

exports.validateVideo = validate;
