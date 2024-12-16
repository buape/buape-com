---
title: Our Infrastructure
description: A look at the infrastructure that powers Buape Studios
authorId: "439223656200273932"
date: 2024-11-08
---

One of the most fun things that I get to play with as the infrastructure manager for Buape Studios is the infrastructure.

We pride ourselves on finding the best value for our tools, and we've done a fantastic job at abusing free tiers over the years to find what works best.

## Authentication

Our authentication system has two components: our internal Discord server and Cloudflare Access.

In our internal Discord server, we have a role for every position at Buape Studios, as well as some general roles for all developers or all staff. We also have a Guest role for people that don't work at Buape Studios but are friends of the team and have been invited to join the server. This server is *extremely* locked down, and is managed solely through our [staff management bot](#staff-management).

As our OIDC service, we use a Cloudflare Worker written by a bot developer named Erisa. [You can find that code here](https://github.com/Erisa/discord-oidc-worker).

In Cloudflare Access, we have an Access Group for each of those positions, and we setup Applications for each site that we want to lock behind Cloudflare Access. We also use their App Dashboard as an overall view of all of our applications that staff can access.

## Project Hosting

We've gone through a lot of different hosting methods over the years that we've been active, and our primary project through that is [Kiai](https://kiai.app), so that's the one that we'll be focusing on here.

For reference, Kiai is a monorepo with 4 apps:
- The main Discord bot, using Discord.js and using [our own framework](https://github.com/buape/utilities/tree/main/packages/lib) 
- Our staff bot, using our own HTTP bot library called [Carbon](https://carbon.buape.com)
- Our website, written in Next.js with tRPC
- Our API, running on [Fastify](https://www.fastify.io)

Also within this repository are internal packages to connect all of those, for things such as our configs, database, leveling functions, and others. 

We use `pnpm` as our package manager, and Turborepo as our build system.

Originally, we ran our website on Vercel under my personal account using Vercel's free tier, and we ran the rest of the apps on a [free tier Oracle Cloud machine](https://www.oracle.com/cloud/free/). We just used the `pnpm start` command to run everything in a `screen` session, and it worked great. However, the deployment process was very cumbersome, and we weren't able to easily set up custom instances of Kiai like we wanted to.

After a while, we realized that we needed to be able to easily deploy our apps to a server, and we decided to use Docker. I created a custom Dockerfile for each of our apps, and we had GitHub Actions that would build and push the images to [GitHub's container registry](https://docs.github.com/en/packages). For our website, we had a workaround where we forked Kiai's repo to our `@buapebot` account, and then we ran the website on Vercel under that account.

This worked great, but we were still running into issues with the Oracle Cloud machine. Disk space was limited, and the CPU that it was running on was very slow (which wasn't an issue for specifically the bot, but our other infrastructure was starting to get bottlenecked).

We spent some time shopping around, and settled on [Hetzner](https://go.buape.com/hetzner) as our provider. (Referral link)

But, just running Docker commands in the terminal seems like a lot of work, so we brought in [Portainer](https://www.portainer.io) to make it easier. I happened to already have a business license for Portainer, so we used that to manage not only Kiai, but all our other apps as well.

A few months ago, however, we realized that Portainer was way overkill for our needs, and in some ways was more complex than what we needed. I had been following a project named [Dokploy](https://dokploy.com) for a while, and I was really impressed with how easy it was to manage both regular compose files but also managed databases and backups.

Vercel also recently fixed our workaround for getting free hosting, and they now require the committer to be a member of the Vercel organization, so we moved our websites onto Dokploy as well.

## Staff Management

We have a custom bot that I've developed for our staff management system, running entirely on Cloudflare Workers. 

In the bot, we create "positions" that we can assign to users. These positions have an emoji, a role ID, and a sort order assigned to them.
We can then set users to have a position, and they will be added to the bot's database and given the associated roles. We can also grant users Guest access from this bot, which will give them access to the more general channels in the server, but nothing specific to any projects.

In our internal Discord server, the only way a user can access channels in the server is through [Linked Roles](https://support.discord.com/hc/en-us/articles/8063233404823-Connections-Linked-Roles-Community-Members). They can either claim the `@Staff` role, or the `@Guest` role, and then they will be able to access the channels that are linked to those roles. The way the bot verifies if they have access is just whether or not they either have any positions, or if they have Guest access.

The staff list on [our website](https://buape.com) is generated from the bot's database, and is updated every time a user is added or removed from a position. It can be found at [https://internal.buape.com/staff](https://internal.buape.com/staff).


## Emails

When we started using `@buape.com` emails, we used [Microsoft's Startup Program](https://startups.microsoft.com/), which gave us access to 100 seats of Microsoft 365 Business for free. However, this would have cost us upwards of $150 a month, over 10 times what we pay for our own email hosting. So, rather than try and find a cheaper alternative, I decided to build my own.

Our emails run through [Cloudflare Workers](https://workers.cloudflare.com), and we use [Mailchannels](https://www.mailchannels.com/) to send the emails. Staff are able to use the `/email` command within our server to create an email address on our domain, and either have it send emails into their DMs, or forward emails to their DMs.

The way emails are processed looks like this:

- Does the email address exist in our database?
  - If the email exists, should this email be forwarded or DMed?
    - If forwarded, forward the email using Cloudflare's email.forward() function.
    - If DMed:
      - Does this email have a plain text body?
          - If yes, is this email's body longer than 2000 characters?
            - If yes, upload the email to our internal hastebin
            - If no, set the embed content to the email body
          - If no, upload this email to our custom email HTML viewer.
      - Send the user a DM with two embeds. The first embed lists the sender, to address, subject, etc. The second embed lists the email body/link as processed earlier on.
  - If the email doesn't exist, reply with an error message.

We also have shared email addresses that post in forum channels in our server, and just use Discord permissions to control access to those channels. These function the exact same way as the email addresses above. 

Staff can use the `/email send` command to send an email to anyone from any of their addresses, using Discord's modals feature.

## Other Tools

Besides the setups that we have listed above, we also have a few other tools that we use to help us continue to improve our products.

### Grafana

We use Grafana to monitor both statistics and logs for our apps, as well as monitoring system health. We have a single instance of Grafana that we use, and it is linked to our [Cloudflare Access](#authentication) system for access to staff only.

### Payments

We use Lemonsqueezy as our Merchant of Record for all our payments, donations, subscriptions, and integrated checkouts. 

Lemonsqueezy handles all the global tax compliance, fraud and chargebacks, worldwide payment methods, and recurring billing. We have staff who specifically handle any billing issues that come up.

