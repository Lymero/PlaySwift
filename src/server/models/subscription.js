const Joi = require("joi");

function validate(subscription) {
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

  return Joi.validate(subscription, schema);
}

exports.validateSubscription = validate;
