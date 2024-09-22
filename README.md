# Svelte MultiTenant RBAC Dashboard

<h3>
One more Svelte starter, now with Multi-Tenancy and Role Based Access Control
</h3>

![dashboard](https://github.com/xulioc/sveltekit-multitenant-rbac/blob/main/static/images/dashboard.png?raw=true)

---

##

<h3>
<span style="color:red">
DISCLAIMER: This project is not production ready. Svelte5 is not stable and RBAC is not fully tested. Use at your own risk.
</h3>
</span>

## Features

- [Multitenancy](https://github.com/xulioc/sveltekit-multitenant-rbac/blob/main/static/doc/MT.md) (Groups & Organizations)
- [Role Based Acces Control](https://github.com/xulioc/sveltekit-multitenant-rbac/blob/main/static/doc/RBAC.md) (RBAC)
- [Soft deletion](https://en.wiktionary.org/wiki/soft_deletion)
- User tracking

## Technologies

- [Svelte5](https://svelte.dev/) and [SvelteKit](https://kit.svelte.dev/) application framework
- [PostgreSQL](https://www.postgresql.org/) relational database
- [DrizzleKit](https://orm.drizzle.team/) TypeScript ORM on top of PortgreSQL
- [Lucia](https://lucia-auth.com/) auth library
- [TailwindCSS](https://tailwindcss.com/) CSS framework
- [Shadcn-svelte](https://www.shadcn-svelte.com/) UI component library
- [Superforms](https://superforms.rocks/) form validation and SSR submission
- [Formsnap](https://www.formsnap.dev/) form building
- [Layerchart](https://www.layerchart.com/) charts
- [Lucide Icons](https://lucide.dev/) icon pack
- [Umami](https://umami.is/) analytics
- [Vercel](https://vercel.com/) deployment platform

## Installation

### Clone the repo

```bash
git clone https://github.com/xulioc/sveltekit-multitenant-rbac.git
cd sveltekit-multitenant-rbac
```

### Setup environment variables

Create a new `.env` file

```bash
cp .env.example .env
```

Edit your `.env` file

```bash
# MANDATORY VARIABLES
PRIVATE_POSTGRES_URL="postgresql://<YOUR POSTGRESS URL>"

```

### Initialize database

```bash
pnpm db:generate
pnpm db:push
```

To start in development mode:

```bash
pnpm dev
```

To build and start in production mode:

```bash
pnpm build
pnpm preview
```

### Deploy

To deploy to Vercel please follow instructions [here](https://vercel.com/guides/deploying-svelte-with-vercel).

## Contribute

Feel free to contribute. Issues and Pull Requests are welcome.

## License

[MIT](https://github.com/xulioc/sveltekit-multitenant-rbac/blob/main/LICENSE)

## Resources

- [sveltekit-auth](https://github.com/delay/sveltekit-auth) ![GitHub Repo stars](https://img.shields.io/github/stars/delay/sveltekit-auth?style=flat)
- [sveltekit-supabase-dashboard](https://github.com/xulioc/sveltekit-supabase-dashboard) ![GitHub Repo stars](https://img.shields.io/github/stars/xulioc/sveltekit-supabase-dashboard?style=flat)
- [auth-sveltekit](https://github.com/daedalus-developers/auth-sveltekit/) ![GitHub Repo stars](https://img.shields.io/github/stars/daedalus-developers/auth-sveltekit?style=flat)
- [sveltekit-stackter](https://github.com/shamscorner/sveltekit-stackter) ![GitHub Repo stars](https://img.shields.io/github/stars/shamscorner/sveltekit-stackter?style=flat)
- [saas-starter](https://github.com/startino/saas-starter) ![GitHub Repo stars](https://img.shields.io/github/stars/startino/saas-starter?style=flat)
- [sveltekit-starter-svelte5](https://github.com/szig83/sveltekit-starter-svelte5) ![GitHub Repo stars](https://img.shields.io/github/stars/szig83/sveltekit-starter-svelte5?style=flat)
- https://www.shadcn-svelte.com/blocks
- https://dev.to/permify/implementing-role-based-access-control-in-sveltekit-56hf
