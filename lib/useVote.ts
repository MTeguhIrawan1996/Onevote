import { votes } from "@prisma/client";
import useSWR from "swr";

export default function useVotes() {
  const fetcher = (url: string) => fetch(url).then((r) => r.json());
  const { data, error, isLoading } = useSWR<Res<votes[]>>("/api/vote", fetcher);

  return {
    data,
    error,
    isLoading,
  };
}
