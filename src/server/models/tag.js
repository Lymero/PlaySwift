const Joi = require("joi");

function validate(tag) {
  const schema = {
    tag_name: Joi.string()
      .min(1)
      .max(255)
      .required(),
    id_user: Joi.string()
      .min(1)
      .max(255)
      .required()
  };

  return Joi.validate(tag, schema);
}

exports.validateTag = validate;
