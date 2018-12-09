const Joi = require("joi");

function validate(video) {
  const schema = {
    id_playlist: Joi.objectId.required(),
    url: Joi.string()
      .min(1)
      .max(255)
      .required(),
    description: Joi.string()
      .min(1)
      .max(255)
  };

  return Joi.validate(video, schema);
}

exports.validate = validate;
