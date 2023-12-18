# www-next

Base framework to generate my website based on [Next.js](https://nextjs.org).
Website & knowledge base hosted at [sanyamkapoor.com](https://sanyamkapoor.com).
See details on the stack [here](https://sanyamkapoor.com/kb/the-stack).

## Environment Variables

- `WWW_KB_DIR`: Path to Markdown/MDX files.

For authenticated routes:
- `CLERK_PUBLISHABLE_KEY`: API publishable key for [Clerk](https://clerk.com/).
- `CLERK_SECRET_KEY`: API secret key for [Clerk](https://clerk.com/).

Optional environment variables:
- `GC_CODE`: [GoatCounter](https://www.goatcounter.com) code for analytics.

### Deploying to Vercel

All required environment secrets are: `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`, and `VERCEL_TOKEN`.
See [here](https://vercel.com/guides/how-can-i-use-github-actions-with-vercel) for documentation.

## Setup

Install all dependencies using:
```
npm install
```

## Build

Build assumes all the environment variables are available.

For development:
```shell
npm run dev
```

For production:
```
npm run build
```

## License

Apache 2.0