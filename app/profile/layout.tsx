"use client";
import React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { JourneySidebar } from "@/src/components/Journey/JourneySidebar";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <section className="flex">
        <aside>
          <JourneySidebar />
        </aside>

        {children}
      </section>
    </QueryClientProvider>
  );
}
