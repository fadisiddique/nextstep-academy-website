import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with NextStep Academy. We're here to help with questions about our courses.",
};

export default function ContactPage() {
  return <ContactClient />;
}
