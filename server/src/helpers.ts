import { validator } from "hono/validator";
import { z, type ZodSchema } from "zod";
import { Tissue, VALID_TISSUES } from "./definitions";

const validate = (
  /**
   * This is a subset of `InputType` from `hono/validator` which is not
   * exported.
   */
  inputType: "param" | "query",
  schema: ZodSchema,
  paramName: string | number
) =>
  validator(inputType, (value, c) => {
    try {
      schema.parse(value[paramName]);
    } catch (e) {
      if (e instanceof z.ZodError) {
        return c.json({
          error: e.issues.map((_) => _.message),
        });
      }
    }

    return true;
  });

export const validateParam = (s: ZodSchema, p: string) =>
  validate("param", s, p);

export const validateQuery = (s: ZodSchema, p: string) =>
  validate("query", s, p);

export const makeTissueMap = (): Record<Tissue, unknown> => ({
  CHOROID: {},
  CILIARY_BODY: {},
  CORNEA: {},
  IRIS: {},
  LENS: {},
  OPTIC_NERVE: {},
  OPTIC_NERVE_HEAD: {},
  RETINA: {},
  SCLERA: {},
  TRABECULAR_MESHWORK: {},
});
