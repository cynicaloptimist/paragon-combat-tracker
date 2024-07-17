# Paragon Combat Tracker

Paragon Combat Tracker (PCT) is a generic combat tracker app for tabletop RPGs, such as Dungeons and Dragons and Pathfinder.
PCT is built on a plugin foundation, which attempts to separate concerns that are generally common to all target RPGs, versus concerns that are specific to a particular game's ruleset.

## Common Concepts
 
 * Turn Order
 * Undo / Redo
 * A Character is a single, unique creature. It has a name, and "current" values for RPG-specific attributes like HP.
 * A StatBlock represents the "template" that we can make new characters from, like 'Goblin'. 
    * A Character is not required to have a StatBlock.
 * A Combatant is a Character that is in an Encounter. They have an Initiative score.
 * A Combat is a collection of Combatants, with information about whose turn it is.

## RPG-Specific Concepts
 * Hit points / wounds / vitality, armor class / defenses, moves / abilities / powers, etc.
 * How do we modify "current" values like HP on the fly?
 * How is a Combatant rendered in the Initiative List?
 * How is a Combatant's Character details rendered?
 * Where are StatBlocks loaded from?
 * How is the Character Editor rendered?

To add a new system plugin, start by making new entries in the `src\pages\t` and `src\plugins` directories, and add a link to your plugin in `src\pages\index.tsx`. New plugins are welcome as PR contributions to this repo.

# NextJS

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
