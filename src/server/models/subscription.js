const Joi = require("joi");

function validate(subscription) {
  const schema = {
    id_tag: Joi.objectId.required(),
    id_user: Joi.objectId.required()
  };

  return Joi.validate(subscription, schema);
}

exports.validate = validate;
