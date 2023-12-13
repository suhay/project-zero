"use client";
import React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { JourneySidebar } from "@/src/components/Journey/JourneySidebar";
import { useUserData } from "@/src/hooks/useUserData";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = React.useState(() => new QueryClient());
  const { loading } = useUserData({});

  if (loading) {
    return (
      <div className="mx-auto py-6">
        <h2>Loading...</h2>
      </div>
    );
  }

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
