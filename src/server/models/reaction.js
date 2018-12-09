const Joi = require("joi");

function validate(reaction) {
  const schema = {
    id_video_playlist: Joi.objectId.required(),
    id_user: Joi.objectId().required(),
    vote: Joi.string()
      .valid("like", "dislike")
      .required(),
    comment: Joi.string()
      .min(1)
      .max(255)
  };

  return Joi.validate(reaction, schema);
}

exports.validate = validate;
