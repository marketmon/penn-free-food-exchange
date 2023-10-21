"use client";

import { getCurrentUser } from "@/lib/apiCalls";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function CreateListing({ meadowId }: { meadowId: string }) {
  const { data } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  });

  return (
    <div>
      <Link href={`/${meadowId}`}>Back</Link>
    </div>
  );
}
