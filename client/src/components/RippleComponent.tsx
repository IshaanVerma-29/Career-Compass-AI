import Ripple from "@/components/ui/ripple";

export function RippleComponent() {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center bg-[#0A0A0A] overflow-hidden rounded-lg md:shadow-xl">
      <p className="z-10 whitespace-pre-wrap text-center text-5xl font-medium tracking-tighter text-white">
        Userflow
      </p>
      <Ripple />
    </div>
  );
}
