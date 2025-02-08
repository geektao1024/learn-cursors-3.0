# User Guide

For more pricing information, please visit [Cursor Pricing Page](https://cursor.sh/pricing).

### Subscription Tiers

Cursor offers multiple subscription tiers to meet your needs:

- **Hobby**

  - 14-day **Pro trial** (250 fast `premium` model uses)
  - 50 slow `premium` model uses
  - 2000 code completions

- **Pro**

  - 500 fast `premium` model uses per month
  - Unlimited slow `premium` model uses
  - Unlimited code completions
  - 10 `o1+mini` uses per month

- **Business**
  - Same usage quotas as `Pro` tier
  - Organization-wide enforced privacy mode
  - Centralized team billing
  - Admin dashboard with usage statistics
  - SAML/OIDC SSO

### Premium Models

GPT-4, GPT-4o, and Claude 3.5 Sonnet all count as `premium` models. Each request to Claude 3.5 Haiku counts as 1/3 of a `premium` model request.

### Pro Trial

All new users get a 14-day Pro trial with access to all Pro features and 250 fast `premium` model requests. After 14 days, users who haven't upgraded will revert to the Hobby plan.

### Fast and Slow Requests

By default, Cursor servers try to provide fast `premium` model requests for all users. However, during peak times, users who have exhausted their fast `premium` quota will be moved to the slow pool, which is effectively a queue of users waiting for fast `premium` requests to become available.

This queue is fair, and Cursor does everything possible to keep the queue as short as possible. However, if you need more fast `premium` quota and don't want to wait, you can add more requests from the settings page.

### Purchasing Additional Requests

We are actively developing the ability to purchase additional fast requests. Currently, these are the available options:

#### Fast Request Packs

Additional fast requests come in packs of 500 per month for $20/month, which increases your monthly quota.

For annual plans, packs are priced at $240/year. For monthly plans, packs are $20/month.

Mid-cycle purchases are prorated based on days remaining. For example, purchasing halfway through your billing cycle means you only pay for half a month.

Please note that additional packs for Pro plans will appear as separate Pro subscriptions in your billing dashboard.

#### Usage-Based Pricing

You can opt for usage-based pricing for requests beyond your plan's included quota by visiting the settings page.

Usage-based pricing details:

- Usage-based pricing is calculated by calendar month (not necessarily aligned with your billing cycle, typically billed on the 2nd-3rd of the month)
- We don't count usage if you immediately cancel a request or if the request errors
- You can configure a hard limit that usage-based pricing will never exceed per month
- Currently, usage-based pricing is only available for o1-preview, Claude 3 Opus, and some long-context chat models

### Viewing Usage

You can view your usage on the Cursor settings page. You can also access this page within the Cursor application by going to `Cursor Settings` > `General` > `Account`, clicking "Manage Subscription" for Pro users or "Manage" for Business users.

Cursor usage resets monthly based on your subscription start date.
