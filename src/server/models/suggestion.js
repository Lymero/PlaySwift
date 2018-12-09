const Joi = require("joi");

function validate(suggestion) {
  const schema = {
    id_playlist: Joi.objectId.required(),
    id_video: Joi.objectId.required(),
    id_user: Joi.objectId.required()
  };

  return Joi.validate(suggestion, schema);
}

exports.validate = validate;
