"use client";
import { useCallback, useState } from "react";

import { SearchBar } from "@/src/components/lib/Form/SearchBar";
import { Chat } from "@/src/components/Zoey/Chat";

export default function Zoey() {
  const [visible, setVisible] = useState("");
  const [initialMessage, setInitialMessage] = useState<string>();

  const submitSearch = useCallback((value: string) => {
    setVisible("opacity-0 h-0");
    setInitialMessage(value);
  }, []);

  return (
    <div className="w-full">
      <section
        className={`p-10 flex items-center flex-col transition-all ${visible} ease-out`}
      >
        <h1 className="max-w-md text-center">Hello there, my name is Zoey!</h1>
        <SearchBar submitSearch={submitSearch} />
      </section>
      {initialMessage != null && <Chat initialMessage={initialMessage} />}
    </div>
  );
}
