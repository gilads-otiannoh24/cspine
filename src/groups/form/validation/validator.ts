import z, { ZodSchema } from "zod";
import { $ZodIssue } from "zod/v4/core/errors.cjs";

type SchemaMap = Record<string, ZodSchema<any>>;

export class Validator {
  private schemas: SchemaMap = {};
  private errors: Record<string, string> = {};

  constructor(schemas: SchemaMap = {}) {
    this.schemas = schemas;
  }

  setSchema(field: string, schema: ZodSchema<any>) {
    this.schemas[field] = schema;
  }

  getErrors() {
    return this.errors;
  }

  getError(field: string): string | null {
    return this.errors[field] || null;
  }

  clearError(field: string) {
    delete this.errors[field];
  }

  clearAll() {
    this.errors = {};
  }

  validateField(field: string, value: any): boolean {
    const schema = this.schemas[field];
    if (!schema) return true; // No schema? Consider it valid

    const result = schema.safeParse(value);

    if (result.success) {
      this.clearError(field);
      return true;
    } else {
      this.errors[field] = this._formatIssue(result.error.issues[0]);
      return false;
    }
  }

  validateAll(values: Record<string, any>): boolean {
    let valid = true;
    this.clearAll();

    for (const field in this.schemas) {
      const isFieldValid = this.validateField(field, values[field]);
      if (!isFieldValid) valid = false;
    }

    return valid;
  }

  private _formatIssue(issue: $ZodIssue): string {
    return issue.message || "Invalid input";
  }
}
