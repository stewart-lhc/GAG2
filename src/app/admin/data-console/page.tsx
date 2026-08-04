import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";

const path = "/admin/data-console";

export const metadata = {
  ...pageMetadata("Not Found", "This page is not available.", path),
  robots: {
    index: false,
    follow: false
  }
};

export default function DataConsolePage() {
  notFound();
}
