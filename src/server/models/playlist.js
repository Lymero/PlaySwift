const Joi = require("joi");

function validate(playlist) {
  const schema = {
    id_tag: Joi.objectId.required(),
    id_user: Joi.objectId().required(),
    name: Joi.string()
      .min(1)
      .max(255)
      .required(),
    visible: Joi.boolean.required(),
    description: Joi.string()
      .min(1)
      .max(255)
      .required()
  };

  return Joi.validate(playlist, schema);
}

exports.validate = validate;
