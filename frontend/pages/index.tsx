import { useMutation, useSubscription } from "urql";
import useSound from "use-sound";
import { SpriteMap } from "use-sound/dist/types";

import Head from "next/head";

const newMessages = `
  subscription OnSound {
    onSound {
      name
    }
  }
`;

const playSound = `
  mutation PlaySound($name: String!) {
    playSound(name: $name)
  }
`;

const sprite = {
  kick: [0, 350],
  hihat: [374, 160],
  snare: [666, 290],
  cowbell: [968, 200],
} as SpriteMap;

const PlayButton = ({ name }) => {
  const [_, play] = useMutation(playSound);

  return (
    <button
      className="p-10 border border-gray-500"
      onClick={() => {
        play({ name });
      }}
    >
      {name}
    </button>
  );
};

const Sounds = () => {
  const [play] = useSound("/drums.mp3", {
    sprite,
  });

  const [{ data }] = useSubscription(
    { query: newMessages },
    (d, response: any) => {
      play({
        id: response.onSound.name,
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
        <title>Strawberry beats</title>
      </Head>
      <div className="w-screen h-screen border-4 relative border-green-500 bg-green-200 overflow-hidden">
        {process.browser && <Sounds />}

        {Object.keys(sprite).map((name) => (
          <PlayButton key={name} name={name} />
        ))}
      </div>
    </>
  );
}
