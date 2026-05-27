# poof

Anonymous one-time text links. Create a poof, send the link, and the content disappears after it is viewed.

Poof is free, open-source, and intentionally simple: no accounts, no orgs, no dashboards, no tracking.

## Features

- One-time view: entries are deleted after a successful read
- Encrypted storage: text is encrypted before being stored in Redis
- Anonymous: no auth or user records
- Expiring entries: unopened poofs expire after a configurable TTL
- Built-in API: UI and API routes run from the same TanStack Start app

## Tech Stack

- TanStack Start
- React
- Tailwind CSS
- Redis
- AES-256-GCM via Node crypto

## Development

Start Redis:

```bash
docker run -d -p 6379:6379 redis:7-alpine
```

Set up the app:

```bash
cp .env.example .env
bun install
bun run dev
```

Required environment:

```bash
ENCRYPTION_KEY=replace-with-a-long-random-secret
REDIS_URL=redis://localhost:6379
POOF_DEFAULT_TTL_SECONDS=604800
```

## Routes

- `GET /` opens the simple home page.
- `GET /new` creates a new poof.
- `GET /p/:id` reveals and deletes a poof.
- `GET /health` returns service status.
- `POST /text` accepts `{ "text": "secret", "ttl": 3600 }` and returns `{ "id": "..." }`.
- `GET /text/:id` reveals and deletes a poof through the compatibility API.

## Verification

```bash
bun run test
bun run lint
bun run build
```

## License

[MIT](./LICENSE)
