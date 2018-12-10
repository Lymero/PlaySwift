const Joi = require("joi");

function validate(suggestion, params) {
  suggestion.id_playlist = params.id_playlist;
  const schema = {
    id_playlist: Joi.number()
      .integer()
      .required(),
    url_video: Joi.string()
      .min(1)
      .max(255)
      .required(),
    id_user: Joi.string()
      .min(1)
      .max(255)
      .required()
  };

  return Joi.validate(suggestion, schema);
}

exports.validateSuggestion = validate;
