import * as Joi from "@hapi/joi";
import "joi-extract-type";

export const schemaContent = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .max(50),
  password: Joi.string().min(7).max(50),
  description: Joi.string().max(500),
});

export const schemaDataPut = Joi.object({
  data: schemaContent.required(),
  id: Joi.number().required(),
});

export const schemaDataGet = Joi.object({
  id: Joi.number().required(),
}).unknown(true);

export type TDataPut = Joi.extractType<typeof schemaDataPut>;
export type TDataGet = Joi.extractType<typeof schemaDataGet>;
