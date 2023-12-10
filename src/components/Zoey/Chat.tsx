import React, { useState } from "react";

import { useQuery } from "@tanstack/react-query";

import { SearchBar } from "~/Form/SearchBar";
import { BouncingDots } from "~/Loader/BouncingDots";
import Link from "next/link";
import { Card } from "../lib/Card";

export type Message = {
  id: number;
  text: string;
  link?: string;
  action?: string;
};

type Reply = {
  data: string;
  link?: string;
  action?: string;
};

export function Chat({ initialMessage }: { initialMessage: string }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: Date.now(),
      text: initialMessage,
    },
  ]);
  const [currentMessage, setCurrentMessage] = useState<string>(initialMessage);

  const handleReply = (reply: Reply) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: reply.data,
      },
    ]);
  };

  const fetchMessage = (text: string) => {
    return fetch("https://zoey.zeroin.earth/", {
      method: "POST",
      body: JSON.stringify({ message: text }),
    })
      .then((res) => res.json())
      .then((body: Reply) => {
        handleReply(body);
      });
  };

  const { isFetching } = useQuery({
    queryKey: ["zoeyChat", currentMessage],
    queryFn: () => fetchMessage(currentMessage),
  });

  const handleMessageSend = async (text: string) => {
    const newMessage: Message = {
      id: Date.now(),
      text: text,
    };

    setCurrentMessage(text);
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  return (
    <section className={`w-full p-10`}>
      {messages.map((message, i) => (
        <div key={i}>
          <p
            className={
              i % 2 === 1
                ? "overflow-hidden border-r-2 w-0 animate-typing whitespace-nowrap"
                : "text-right"
            }
          >
            {message.text}
          </p>
          {message.action === "list" && (
            <div>
              <Card.Simple
                title="Product 1"
                description="This is a description of the product."
                href="#"
              />
              <Card.Simple
                title="Product 2"
                description="This is a description of the product."
                href="#"
              />
              <Card.Simple
                title="Product 3"
                description="This is a description of the product."
                href="#"
              />
            </div>
          )}
          {message.link != null && <Link href={message.link}>Directions</Link>}
        </div>
      ))}
      {isFetching && (
        <div className="mt-2 mb-8">
          <BouncingDots color="bg-gray-500" />
        </div>
      )}
      <SearchBar submitSearch={handleMessageSend} />
    </section>
  );
}
