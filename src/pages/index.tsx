import Head from "next/head";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextPageContext } from "next";
import { Button } from "~/components/Button";

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
      <main>
        <div className="m-2 md:m-8 flex flex-col items-center">
          <div className="gap-2 flex flex-col w-80">
            <Button href="/t/dnd5e">D&D 5e</Button>
          </div>
        </div>
      </main>
    </>
  );
}
