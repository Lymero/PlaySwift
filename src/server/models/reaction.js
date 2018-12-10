const Joi = require("joi");

function validate(reaction) {
  const schema = {
    id_video_playlist: Joi.number()
      .integer()
      .required(),
    id_user: Joi.string()
      .min(1)
      .max(255)
      .required(),
    vote: Joi.string()
      .valid("like", "dislike")
      .required(),
    comment: Joi.string()
      .min(1)
      .max(255)
  };

  return Joi.validate(reaction, schema);
}

exports.validateReaction = validate;
