import type { Metadata } from "next";
import { CustomForm } from "@/components/CustomForm";

export const metadata: Metadata = { title: "Skins personalizadas · Chapter & Bloom" };

export default function CustomPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <CustomForm />
    </div>
  );
}
