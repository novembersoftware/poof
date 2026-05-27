import { createStartHandler, defaultRenderHandler } from "@tanstack/react-start/server";
import type { Register } from "@tanstack/react-router";
import type { RequestHandler } from "@tanstack/react-start/server";

export const fetch = createStartHandler(defaultRenderHandler);

type ServerEntry = { fetch: RequestHandler<Register> };

export default { fetch } satisfies ServerEntry;
