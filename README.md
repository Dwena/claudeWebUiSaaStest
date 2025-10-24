# LinkPro - Link in Bio SaaS Platform

A modern, full-featured "Link in Bio" SaaS application built with Next.js 14, TypeScript, Prisma, and SQLite. Think of it as a Linktree alternative with a clean, monetizable freemium model.

## Features

### Core Features
- **User Authentication** - Secure sign up/login with NextAuth
- **Bio Page Builder** - Create and customize your personal link page
- **Link Management** - Add, edit, delete, and reorder links
- **Multiple Themes** - Choose from Default, Dark, Sunset, Forest, and Ocean themes
- **Analytics** - Track page views and link clicks
- **Public Pages** - SEO-friendly public pages at `/username`
- **Responsive Design** - Beautiful on all devices

### Monetization (Freemium Model)
- **Free Tier**
  - 1 bio page
  - Up to 5 links
  - Basic themes
  - Basic analytics

- **Pro Tier** ($9/month)
  - Unlimited links
  - All themes
  - Advanced analytics
  - Custom domain support
  - Priority support
  - Remove branding

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js
- **Database**: SQLite with Prisma ORM (easy to switch to PostgreSQL/MySQL for production)
- **Payments**: Stripe (ready to integrate)
- **Icons**: React Icons
- **Deployment Ready**: Vercel, Railway, or any Node.js host

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

**That's it!** SQLite database will be created automatically.

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd linkpro
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Copy `.env.example` to `.env` and update the values:

```bash
cp .env.example .env
```

Required environment variables:
```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

**Note**: The SQLite database file (`dev.db`) will be created automatically when you run migrations.

For Stripe integration (optional):
```env
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
STRIPE_PRO_PRICE_ID="price_..."
```

4. **Set up the database**

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# (Optional) Open Prisma Studio to view your database
npx prisma studio
```

5. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
linkpro/
├── app/
│   ├── api/              # API routes
│   │   ├── auth/         # NextAuth endpoints
│   │   ├── register/     # User registration
│   │   ├── page/         # Page CRUD operations
│   │   ├── links/        # Link management
│   │   └── analytics/    # Analytics tracking
│   ├── dashboard/        # User dashboard
│   ├── login/            # Login page
│   ├── register/         # Registration page
│   ├── pricing/          # Pricing page
│   ├── [username]/       # Public bio pages
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Landing page
│   └── globals.css       # Global styles
├── lib/
│   ├── prisma.ts         # Prisma client
│   └── auth.ts           # NextAuth configuration
├── prisma/
│   └── schema.prisma     # Database schema
├── types/
│   └── next-auth.d.ts    # TypeScript definitions
├── public/               # Static assets
├── .env                  # Environment variables
├── package.json          # Dependencies
└── README.md             # This file
```

## Database Schema

The application uses the following main models:

- **User** - User accounts with subscription info
- **Page** - User bio pages with customization
- **Link** - Links displayed on bio pages
- **PageView** - Analytics for page views
- **LinkClick** - Analytics for link clicks
- **Account/Session** - NextAuth tables

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project to Vercel
3. Add environment variables
4. Deploy

### Database for Production

**Development**: SQLite is perfect for development and testing.

**Production**: For production, consider upgrading to a managed database:
- **Vercel Postgres** - Seamless integration with Vercel
- **Supabase** - Free tier available with PostgreSQL
- **Railway** - Easy PostgreSQL/MySQL setup
- **PlanetScale** - Serverless MySQL
- **Neon** - Serverless PostgreSQL

To switch from SQLite to PostgreSQL/MySQL, simply:
1. Update `provider` in `prisma/schema.prisma`
2. Update `DATABASE_URL` in `.env`
3. Run `npx prisma migrate dev`

## Monetization Strategy

### Revenue Streams

1. **Subscription ($9/month)**
   - Target: Content creators, influencers, small businesses
   - Value prop: Unlimited links, analytics, custom branding

2. **Add-ons (Future)**
   - Custom domains: $5/month
   - Advanced analytics: $3/month
   - Email collection: $5/month

3. **Affiliate/Partner Program**
   - Earn commission from referrals

### Marketing Ideas

- SEO optimization for link-in-bio keywords
- Content marketing (blog about creator economy)
- Social media presence on Twitter/Instagram
- Partner with influencers for testimonials
- Free tools (QR code generator) to drive traffic

## Stripe Integration (Optional)

To enable payments:

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your API keys from the dashboard
3. Create a product and price for Pro subscription
4. Add Stripe keys to `.env`
5. Implement checkout flow (boilerplate ready)

## Future Enhancements

### Quick Wins
- [ ] Email verification
- [ ] Password reset
- [ ] Social auth (Google, GitHub)
- [ ] Custom avatars
- [ ] Link icons/emojis
- [ ] Duplicate page template

### Advanced Features
- [ ] Custom CSS editor
- [ ] Schedule links (show/hide by date)
- [ ] Email capture form
- [ ] Social media auto-post
- [ ] QR code generation
- [ ] Analytics dashboard with charts
- [ ] Team accounts
- [ ] White-label solution

### Enterprise
- [ ] API access
- [ ] Webhooks
- [ ] Custom domain CNAME
- [ ] SSO integration

## Testing

Create a test account:
1. Go to `/register`
2. Create account
3. Set up your bio page
4. Add links
5. View at `/yourusername`

## License

MIT License - feel free to use for your own projects

## Support

For issues or questions:
- Open an issue on GitHub
- Email: support@linkpro.com (update with your email)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ using Next.js and TypeScript
