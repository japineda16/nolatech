import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import PostModal from "./PostModal";
import type { Post } from "@/types/interfaces";

interface PostTableProps {
  post: Post[];
}

export function PostTable({ post }: PostTableProps) {
  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Titulo</TableHead>
              <TableHead className="text-center">Autor</TableHead>
              <TableHead className="text-center">Publicación</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {post.map((post) => (
              <TableRow key={post.id}>
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.author}</TableCell>
                <TableCell>{format(post.publishDate, "PPP")}</TableCell>
                <TableCell className="text-right">
                  <PostModal post={post} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
