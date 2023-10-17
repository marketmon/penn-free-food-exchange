class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}

class ServerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ServerErrorz";
  }
}

