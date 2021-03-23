import joi from 'joi';

export const groupCategoryTypeSchema = joi.object().keys({
  name: joi.string().regex(/^\S+$/).message('white space before or after name is not allowed')
  .min(2).required(),
  clientId: joi.string().required(),
});
