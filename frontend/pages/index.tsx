import { useMutation, useSubscription } from "urql";
import useSound from "use-sound";
import { SpriteMap } from "use-sound/dist/types";

import Head from "next/head";

import { CowbellIcon } from "~/components/icons/cowbell";
import { HiHatIcon } from "~/components/icons/hi-hat";
import { KickIcon } from "~/components/icons/kick";
import { SnareIcon } from "~/components/icons/snare";
import { Logo } from "~/components/logo";

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

const iconsMap = {
  kick: KickIcon,
  hihat: HiHatIcon,
  snare: SnareIcon,
  cowbell: CowbellIcon,
};

const PlayButton = ({ name }) => {
  const [_, play] = useMutation(playSound);

  const Icon = iconsMap[name];

  return (
    <button
      className="p-10 bg-gray-300 text-gray-600 shadow-2xl fill-current rounded-md"
      onClick={() => {
        play({ name });
      }}
    >
      <Icon className="w-12 h-12" />
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
      <div className="flex flex-col items-center p-10">
        <Logo />

        {process.browser && <Sounds />}

        <div className="mt-20 flex space-x-10">
          {Object.keys(sprite).map((name) => (
            <PlayButton key={name} name={name} />
          ))}
        </div>
      </div>
    </>
  );
}
