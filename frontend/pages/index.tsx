import { useMutation, useSubscription } from "urql";
import useSound from "use-sound";

import Head from "next/head";

const newMessages = `
  subscription OnAlpaca {
    onAlpaca {
      x
      y
    }
  }
`;

const playSound = `
  mutation PlaySound {
    playSound
  }
`;

const PlayButton = () => {
  const [_, play] = useMutation(playSound);

  return (
    <button
      onClick={() => {
        play();
      }}
    >
      Play a sound
    </button>
  );
};

const Sounds = () => {
  const [play] = useSound("/drums.mp3", {
    sprite: {
      kick: [0, 350],
      hihat: [374, 160],
      snare: [666, 290],
      cowbell: [968, 200],
    },
  });

  const [{ data }] = useSubscription(
    { query: newMessages },
    (d, response: any) => {
      play({
        id: ["kick", "hihat", "snare", "cowbell"][response.onAlpaca.x % 4],
      });

      console.log("got sound");

      return [];
    },
  );

  if (!data) {
    return null;
  }

  return null;
};

export default function Home() {
  return (
    <>
      <Head>
        <title>Alpaca</title>
      </Head>
      <div className="w-screen h-screen border-4 relative border-green-500 bg-green-200 overflow-hidden">
        {process.browser && <Sounds />}

        <PlayButton />
      </div>
    </>
  );
}
