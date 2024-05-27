import Head from "next/head";
import { Inter } from "next/font/google";
import { Tracker } from "./components/Tracker";
import { dnd5e } from "./plugins/dnd5e.plugin";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Paragon Combat Tracker</title>
        <meta name="description" content="Extensible TTRPG Combat Tracker" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Tracker rulesPlugin={dnd5e} />
      </main>
    </>
  );
}
