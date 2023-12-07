import { JourneySidebar } from "@/src/components/Journey/JourneySidebar";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex">
      <aside>
        <JourneySidebar />
      </aside>

      {children}
    </section>
  );
}
