const Joi = require("joi");

function validate(subscription) {
  const schema = {
    id_tag: Joi.number()
      .integer()
      .required(),
    id_user: Joi.string()
      .min(1)
      .max(255)
      .required()
  };

  return Joi.validate(subscription, schema);
}

exports.validateSubscription = validate;
