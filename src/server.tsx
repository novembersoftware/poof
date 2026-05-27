import { createStartHandler, defaultStreamHandler } from "@tanstack/react-start/server";
import type { Register } from "@tanstack/react-router";
import type { RequestHandler } from "@tanstack/react-start/server";

export const fetch = createStartHandler(defaultStreamHandler);

type ServerEntry = { fetch: RequestHandler<Register> };

export default { fetch } satisfies ServerEntry;
