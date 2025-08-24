import { HoverEffect } from "./ui/card-hover-effect";

export function NavLinks() {
  return (
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={projects} />
    </div>
  );
}

export const projects = [
  {
    title: "Dashboard",
    link: "dashboard",
    description: "Your learning dashboard"
  },
  {
    title: "Career Compass AI",
    link: "ai-chat",
    description: "Ask anything about careers"
  },
  {
    title: "Psychometric Test",
    link: "psychometric-test",
    description: "Test your knowledge"
  }
];