# www-next

Base framework to generate my website based on [Next.js](https://nextjs.org).
Website & knowledge base hosted at [sanyamkapoor.com](https://sanyamkapoor.com).
See details on the stack [here](https://sanyamkapoor.com/kb/the-stack).

## Environment Variables

- `WWW_KB_DIR`: Path to Markdown/MDX files.
- `LIBRARYTHING_USERID`: LibraryThing User ID for use with the [API](https://wiki.librarything.com/index.php/LibraryThing_JSON_Books_API).
- `GC_CODE`: [GoatCounter](https://www.goatcounter.com) code.
- `TMDB_API_KEY`: API key for [TMDb](https://developers.themoviedb.org/3/getting-started/introduction)
- `TMDB_SESSION_ID`: API session ID for [TMDb](https://developers.themoviedb.org/3/getting-started/introduction)
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: API publishable key for [Clerk](https://clerk.com/).
- `CLERK_SECRET_KEY`: API secret key for [Clerk](https://clerk.com/).

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