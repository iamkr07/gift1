import React, { useState, useRef } from "react";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import useSound from 'use-sound';
import chimeSfx from '/sounds/chime.mp3';
import slideSfx from '/sounds/slide.mp3';
import '@/styles/globals.css';

const messages = [
  {
    from: "Mom",
    text: "My dearest star, I see you shine brighter every year. I may not be there to hold you, but I’m always near. Happy Birthday, my little light."
  },
  {
    from: "Dad",
    text: "Sweetheart, not a day goes by I don't smile watching you grow into the brave soul you are. You make me proud every single moment."
  }
];

const memoryTiles = [
  { title: "Our Anime Souls", content: "One still, two hearts — this is us in a world imagined. (You can edit this)" },
  { title: "That Vintage Mirror Pic", content: "The mirror didn’t just reflect her — it echoed a moment only I saw. (Editable)" },
  { title: "Dessert Date", content: "Chocolate, ice cream, laughter and her — the perfect combo. (Editable)" },
  { title: "Her Iconic Pose (Anime Twin)", content: "Even anime couldn’t do justice to how cute she really looked. (Editable)" },
  { title: "Her Real Smile", content: "This one right here? My favorite smile in the universe. (You can edit this)" },
  { title: "Our VR Mall Day", content: "Among neon lights and echoing halls, we made a memory that glowed. (Editable)" },
  { title: "Photo Booth Chronicles", content: "We froze time with every click — the silly, the serious, the smiles. (Editable)" },
  { title: "Side By Side", content: "No words. Just us. Standing. Breathing. Existing. Together. (Editable)" },
  { title: "That One Outfit She Rocked", content: "She wore it like a queen. The blue, the lanyard, the stare. (Editable)" },
  { title: "Sweetest Day Ever", content: "From awkward glances to captured hearts — this day was ours. (Editable)" }
];

const photoUrls = [
  "/images/1.jpg",
  "/images/2.jpg",
  "/images/3.jpg",
  "/images/4.jpg",
  "/images/5.jpg",
  "/images/6.jpg",
  "/images/7.jpg",
  "/images/8.jpg"
];

const BirthdayMessage = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [index, setIndex] = useState(0);
  const [showSlideshow, setShowSlideshow] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playChime] = useSound(chimeSfx);
  const [playSlide] = useSound(slideSfx);

  const handleNext = () => {
    playChime();
    if (index < messages.length - 1) {
      setIndex(index + 1);
    } else {
      setShowMessage(false);
      setIndex(0);
      setShowSlideshow(true);
      audioRef.current?.play();
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white p-6 space-y-12 font-[\'Caveat\',cursive] relative overflow-hidden">
      <StarBackground />

      <motion.h1
        className="text-5xl md:text-6xl text-center bg-gradient-to-r from-fuchsia-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-2xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Happy Birthday, Innocent 💖
      </motion.h1>

      {!showMessage && !showSlideshow ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Button
            onClick={() => { setShowMessage(true); playChime(); }}
            className="text-lg bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-2xl px-8 py-4 shadow-[0_0_30px_#ff90e8]"
          >
            View Messages from Heaven
          </Button>
        </motion.div>
      ) : showMessage ? (
        <motion.div
          className="max-w-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-[0_0_40px_#ffffff33] p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <CardContent className="space-y-4">
              <Sparkles className="text-yellow-300 w-8 h-8 animate-pulse" />
              <motion.p
                className="text-2xl font-light"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                "{messages[index].text}"
              </motion.p>
              <p className="text-right font-semibold text-pink-300 text-xl">
                — {messages[index].from}
              </p>
              <div className="flex justify-center mt-4">
                <Button
                  onClick={handleNext}
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 rounded-xl px-6 shadow-lg"
                >
                  {index < messages.length - 1 ? "Next Message" : "Show Something Special"}
                </Button>
              </div>
            </CardContent>
          </motion.div>
        </motion.div>
      ) : showSlideshow ? (
        <motion.div
          className="w-full max-w-4xl flex flex-col items-center space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="w-full overflow-hidden rounded-2xl border border-white/20 shadow-[0_0_30px_#ffffff22]">
            <Slideshow images={photoUrls} playSlide={playSlide} />
            <audio ref={audioRef} loop controls className="mt-4 w-full">
              <source src="/audio/mashup.mp3" type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
          </div>
        </motion.div>
      ) : null}

      <section className="w-full max-w-3xl space-y-6">
        <motion.h2
          className="text-4xl font-semibold text-center mb-4 bg-gradient-to-r from-yellow-300 to-pink-400 bg-clip-text text-transparent drop-shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Our Memories
        </motion.h2>
        {memoryTiles.map((tile, i) => (
          <details
            key={i}
            onClick={playChime}
            className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:border-white/30 transition duration-300 shadow-md hover:shadow-[0_0_15px_#ffffff44]"
          >
            <summary className="cursor-pointer font-medium text-xl text-cyan-200">
              {tile.title}
            </summary>
            <p className="mt-2 text-lg text-white/80">{tile.content}</p>
          </details>
        ))}
      </section>

      <motion.footer
        className="mt-16 text-lg text-white/70 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        Made with infinite love by someone who cares deeply 💗
      </motion.footer>
    </main>
  );
};

const Slideshow = ({ images, playSlide }: { images: string[]; playSlide: () => void }) => {
  const [current, setCurrent] = useState(0);
  React.useEffect(() => {
    const timer = setInterval(() => {
      playSlide();
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [images]);

  return (
    <div className="relative w-full aspect-video">
      {images.map((img, i) => (
        <motion.img
          key={i}
          src={img}
          alt={`Slide ${i + 1}`}
          className="absolute w-full h-full object-cover rounded-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: current === i ? 1 : 0 }}
          transition={{ duration: 1 }}
        />
      ))}
    </div>
  );
};

const StarBackground = () => (
  <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_1px_1px,_#ffffff22_1px,_transparent_1px)] [background-size:20px_20px] opacity-20 animate-pulse" />
);

export default BirthdayMessage;
