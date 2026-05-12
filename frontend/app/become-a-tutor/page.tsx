import type { Metadata } from "next";
import BecomeATutorClient from "./BecomeATutorClient";

export const metadata: Metadata = {
  title: "Become a Tutor",
  description: "Join NextStep Academy as an online tutor. Flexible schedule, global reach, and supportive community.",
};

export default function BecomeATutorPage() {
  return <BecomeATutorClient />;
}
