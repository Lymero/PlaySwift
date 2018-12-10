const Joi = require("joi");

function validate(suggestion) {
  const schema = {
    id_playlist: Joi.number()
      .integer()
      .required(),
    id_video: Joi.number()
      .integer()
      .required(),
    id_user: Joi.string()
      .min(1)
      .max(255)
      .required()
  };

  return Joi.validate(suggestion, schema);
}

exports.validateSuggestion = validate;
