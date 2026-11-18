"use client";

import { useSearchParams } from "next/navigation";
import BookingForm from "./BookingForm";

// Reads ?package=... in the browser, so the page itself can be exported as
// plain static HTML.
export default function BookingFormFromUrl() {
  const sp = useSearchParams();
  return <BookingForm initialPackage={sp.get("package") || ""} />;
}
