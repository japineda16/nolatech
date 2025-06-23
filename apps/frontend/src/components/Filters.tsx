import { usePostStore } from "@/store/post.store";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { Label } from "./ui/label";

export default function SearchFilters() {
  const [authorFilter, setAuthorFilter] = useState<string | undefined>();
  const [dateFilter, setDateFilter] = useState<Date | undefined>();
  const { getPosts } = usePostStore((s) => s);

  useEffect(() => {
    if (authorFilter || dateFilter) {
      getPosts({
        author: authorFilter,
        date: dateFilter,
      });
    }
    if (!authorFilter && !dateFilter) {
      getPosts(undefined);
    }
  }, [dateFilter, authorFilter, getPosts]);

  return (
    <div className="mb-6 flex gap-4">
      <div className="flex-1 space-y-1">
        <Label>Filtrar por autor</Label>
        <Input
          type="text"
          placeholder="Buscar por nombre del autor"
          onChange={(e) => setAuthorFilter(e.target.value)}
        />
      </div>
      <div className="flex-1 space-y-1">
        <Label>Filtrar por fecha</Label>
        <Input
          type="date"
          onChange={(e) =>
            setDateFilter(e.target.value ? new Date(e.target.value) : undefined)
          }
        />
      </div>
    </div>
  );
}
