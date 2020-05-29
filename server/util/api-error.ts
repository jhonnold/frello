class APIError extends Error {
    status: number;
    messages: string[];

    constructor(status?: number, ...messages: string[]) {
        super();

        Error.captureStackTrace(this, this.constructor);

        this.name = this.constructor.name;
        this.status = status || 500;
        this.messages = messages.length ? messages : ['Something went wrong.'];
    }

    get message(): string {
        return `[${this.messages.join(', ')}]`;
    }
}

export default APIError;
