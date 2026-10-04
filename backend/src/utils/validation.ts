import Ajv from 'ajv';
import { ValidationError } from './errors';
import { aiResponseSchema } from './aiResponseSchema';

const ajv = new Ajv({ allErrors: true, strict: false });
const validate = ajv.compile(aiResponseSchema);

export function validateAiResult(data: any): void {
  const valid = validate(data);
  if (!valid) {
    const errors = (validate.errors || []).map((e) => `${e.instancePath} ${e.message}`).join('; ');
    throw new ValidationError(`AI response validation failed: ${errors}`, 422);
  }
}
