import joi from 'joi';

export const roleSchema = joi.object().keys({
  name: joi.string().min(2).required()
});
