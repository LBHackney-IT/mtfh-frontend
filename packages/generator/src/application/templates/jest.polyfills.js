process.env.COGNITO_CLIENT_IDS =
  process.env.COGNITO_CLIENT_IDS || JSON.stringify({ mtfhClientId: "test-client-id" });

const { TextDecoder, TextEncoder } = require("util");
const { Blob } = require("buffer");
const { ReadableStream, WritableStream, TransformStream } = require("stream/web");

class BroadcastChannel {
  constructor(name) {
    this.name = name;
  }

  postMessage() {}

  close() {}

  addEventListener() {}

  removeEventListener() {}
}

globalThis.TextDecoder = TextDecoder;
globalThis.TextEncoder = TextEncoder;
globalThis.Blob = Blob;
globalThis.ReadableStream = ReadableStream;
globalThis.WritableStream = WritableStream;
globalThis.TransformStream = TransformStream;
globalThis.BroadcastChannel = BroadcastChannel;

if (!globalThis.Request) {
  const { fetch, Headers, Request, Response, FormData } = require("undici");

  globalThis.fetch = fetch;
  globalThis.Headers = Headers;
  globalThis.Request = Request;
  globalThis.Response = Response;
  globalThis.FormData = FormData;
}
