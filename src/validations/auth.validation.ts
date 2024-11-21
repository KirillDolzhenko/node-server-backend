import * as Joi from "@hapi/joi";
import "joi-extract-type";

export const schemaAuth = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .max(50)
    .required(),
  password: Joi.string().min(7).max(50).required(),
  description: Joi.string().max(500),
});

export type TAuth = Joi.extractType<typeof schemaAuth>;
