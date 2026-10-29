# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Contact and newsletter backend

The Express server handles contact submissions at `POST /api/user` and newsletter subscriptions at `POST /api/newsletter`. Both persist data with MongoDB; newsletter email addresses are normalized and unique.

Copy `.env.example` to `.env` for local development and set `MONGODB_URI`. To receive contact-form email alerts, configure `MAIL_HOST`, `MAIL_PORT`, `MAIL_USER`, `MAIL_PASS`, and `CONTACT_EMAIL` with credentials from your SMTP provider. `MAIL_FROM` is optional and defaults to the SMTP username. Do not commit `.env` or expose SMTP credentials in client-side environment variables.

## Payments

The app can accept project deposits through Razorpay. Create a Razorpay account, add the live or test keys in `.env`, then use the project estimator/booking flow to generate a checkout session. The server exposes these endpoints:

- `POST /api/payments/create-order` creates a Razorpay order with `amount`, `currency`, and optional `receipt`/customer metadata.
- `POST /api/payments/verify` validates the `order_id|payment_id` signature returned by Razorpay.

Keep the key pair in the server-only `.env` file and never expose it in frontend code or source control.

## Admin dashboard

Visit `/admin` to sign in and manage contact inquiries, portfolio projects, and testimonials. The dashboard is disabled until all three server-only variables below are configured:

- `ADMIN_EMAIL`: the single admin account's email address.
- `ADMIN_PASSWORD_HASH`: a bcrypt hash of the admin password (never store the plain password here).
- `ADMIN_JWT_SECRET`: a randomly generated secret with at least 32 characters.

Generate a password hash locally with the installed `bcryptjs` package:

```sh
node --input-type=module -e "import bcrypt from 'bcryptjs'; import { createInterface } from 'node:readline/promises'; const rl = createInterface({ input: process.stdin, output: process.stdout }); const password = await rl.question('Admin password: '); rl.close(); console.log(await bcrypt.hash(password, 12));"
```

Generate a JWT secret locally with Node:

```sh
node --input-type=module -e "import { randomBytes } from 'node:crypto'; console.log(randomBytes(32).toString('hex'));"
```

Put the resulting values only in the server's environment or an uncommitted `.env` file. Admin sessions use an eight-hour, HttpOnly, SameSite=Strict cookie; no token is stored in browser local storage. Keep MongoDB configured and reachable for sign-in data, leads, and content management. Admin project/testimonial changes are reflected in the public portfolio and client-stories sections.
