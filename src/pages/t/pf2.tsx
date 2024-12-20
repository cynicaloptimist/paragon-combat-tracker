import Head from "next/head";
import { Tracker } from "~/components/Tracker";
import { pf2 } from "~/plugins/pf2.plugin";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextPageContext } from "next";

export async function getStaticProps({ locale }: NextPageContext) {
  return {
    
    props: {
      ...(await serverSideTranslations(locale || "en", ["common"])),
      // Will be passed to the page component as props
    },
  };
}
export default function Home() {
  return (
    <>
      <Head>
        <title>Paragon Combat Tracker</title>
        <meta name="description" content="Extensible TTRPG Combat Tracker" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-full">
        <Tracker rulesPlugin={pf2} />
      </main>
    </>
  );
}
