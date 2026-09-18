import { ScrollWipeHero } from "@/components/WipeTitle";
import { contactContent } from "@/lib";

export function ContactHero() {
  return (
    <ScrollWipeHero label="Contact">{contactContent.heading}</ScrollWipeHero>
  );
}
