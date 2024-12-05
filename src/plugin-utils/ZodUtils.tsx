import { z } from "zod";

/** Zod Object schema with {} to support nested defaults.
 * Allows us to instantiate a full default object with z.parse({})
 */
export const obj = (objectType: z.ZodRawShape) => {
  return z.object(objectType).default({});
};
