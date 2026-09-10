import { NextResponse } from 'next/server';

export class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'HttpError';
  }
}

export class BadRequestError extends HttpError {
  constructor(message: string = 'Bad Request') {
    super(400, message);
    this.name = 'BadRequestError';
  }
}

export class NotFoundError extends HttpError {
  constructor(message: string = 'Not Found') {
    super(404, message);
    this.name = 'NotFoundError';
  }
}

export class ConflictError extends HttpError {
  constructor(message: string = 'Conflict') {
    super(409, message);
    this.name = 'ConflictError';
  }
}

/**
 * Central error -> HTTP response mapper for the API route handlers. Call it
 * from a route's `catch` block so error handling lives in one place:
 *
 *   try {
 *     ...
 *   } catch (err) {
 *     return handleError(err);
 *   }
 */
export function handleError(err: unknown): NextResponse {
  if (err instanceof HttpError) {
    return NextResponse.json({ error: err.message }, { status: err.status });
  }

  // Malformed JSON parsing syntax errors from request.json()
  if (err instanceof SyntaxError) {
    return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
  }

  // Postgres errors (node-postgres error codes)
  if (err && typeof err === 'object' && 'code' in err) {
    const pgErr = err as { code: string; detail?: string; message?: string };
    switch (pgErr.code) {
      case '22P02': // invalid_text_representation
        return NextResponse.json({ error: 'Invalid input syntax' }, { status: 400 });
      case '23505': // unique_violation
        return NextResponse.json({ error: 'Record already exists' }, { status: 409 });
      case '23503': // foreign_key_violation
        return NextResponse.json({ error: 'Referenced entity not found' }, { status: 404 });
      case '23502': // not_null_violation
        return NextResponse.json({ error: 'Missing required field' }, { status: 400 });
      default:
        break;
    }
  }

  console.error('Unhandled API error:', err);
  return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
}

