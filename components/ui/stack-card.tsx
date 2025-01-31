"use client";
import { CardStack } from "../ui/card-stack";
import { cn } from "@/lib/utils";
export function CardStackDemo() {
  return (
    <div className="mt-20 flex lg:items-start lg:justify-start items-center justify-center w-full">
      <CardStack items={CARDS} />
    </div>
  );
}

// Small utility to highlight the content of specific section of a testimonial content
export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        "font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-700/[0.2] px-1 py-0.5",
        className
      )}
    >
      {children}
    </span>
  );
};

const CARDS = [
  {
    id: 0,
    name: "Aarav Mehta",
    designation: "Full-Stack Developer Trainee",
    content: (
      <p>
      Internify&apos;s training was fantastic! The focus on{" "}

        <Highlight>hands-on experience</Highlight> really set it apart. I walked away with practical knowledge that I apply every day.
      </p>
    ),
  },
  {
    id: 1,
    name: "Priya Sharma",
    designation: "AI/ML Enthusiast",
    content: (
      <p>
        I was impressed by how Internify integrates{" "}
        <Highlight>real-world projects</Highlight> into the learning process. It made complex concepts much easier to understand and apply.
      </p>
    ),
  },
  {
    id: 2,
    name: "Rohan Gupta",
    designation: "Blockchain Developer Trainee",
    content: (
      <p>
        This training was a complete game-changer for me. The immersive modules{" "}
        <Highlight>helped me gain confidence</Highlight> in blockchain development and pursue more challenging projects.
      </p>
    ),
  },
  {
    id: 3,
    name: "Ananya Desai",
    designation: "Mobile App Developer",
    content: (
      <p>
        The program&apos;s comprehensive approach{" "}
        <Highlight>helped me get a better job</Highlight> as a mobile app developer. The training was totally worth it!
      </p>
    ),
  },
  {
    id: 4,
    name: "Vikram Singh",
    designation: "Web Developer Trainee",
    content: (
      <p>
        Internify gave me the skills to build dynamic web applications.{" "}
        <Highlight>The structured projects</Highlight> sharpened my coding skills and improved my problem-solving abilities.
      </p>
    ),
  },
];


