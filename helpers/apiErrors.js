class ApiError extends Error {
	constructor(statusCode, message) {
		super(message);
		this.statusCode = statusCode;
	}
}

class NoContentError extends ApiError {
    constructor(message) {
        super(204, message);
    }
}

class BadRequestError extends ApiError {
	constructor(message) {
		super(400, message);
	}
}

class UnauthorizedError extends ApiError {
	constructor(message) {
		super(401, message);
	}
}

class ForbiddenError extends ApiError {
	constructor(message) {
		super(403, message);
	}
}

class NotFoundError extends ApiError {
	constructor(message) {
		super(404, message);
	}
}

class ConflictError extends ApiError {
	constructor(message) {
		super(409, message);
	}
}

module.exports = {
    ApiError,
    NoContentError,
    BadRequestError,
    UnauthorizedError,
    ForbiddenError,
    NotFoundError,
    ConflictError
};