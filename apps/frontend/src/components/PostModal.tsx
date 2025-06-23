import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Post } from "@/types/interfaces";
import PostForm from "./PostForm";
import { Button } from "./ui/button";
import { useState } from "react";
import type { formSchema } from "@/types/forms";
import type z from "zod";
import { usePostStore } from "@/store/post.store";
import { toast } from "sonner";
import useSocketEvents from "@/hooks/use-realtime";

interface PostModalProps {
  post?: Post;
}

export default function PostModal({ post }: PostModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { editPost, addPost } = usePostStore((s) => s);

  const { emitEvent } = useSocketEvents("http://localhost:3001", {
    "new-post": (newPostData: Post) => {
      // Tipamos newPostData
      console.log("¡Nuevo post recibido por Socket.IO!", newPostData);
    },
    "post-updated": (updatedPostData: Post) => {
      // Tipamos updatedPostData
      console.log("Post actualizado recibido por Socket.IO:", updatedPostData);
    },
  });

  const onHandleSubmit = (v: z.infer<typeof formSchema>) => {
    if (post) {
      editPost(post.id, { ...v, publishDate: new Date(v.publishDate) });
      toast("Has editado una publicación", {
        description: `Se ha editado exitosamente una publicacion nueva, titulada ${v.title}`,
      });
      emitEvent("post-updated", { ...v, publishDate: new Date(v.publishDate) });
    } else {
      addPost({ ...v, publishDate: new Date(v.publishDate) });
      toast("Has creado una publicación", {
        description: `Se ha creado exitosamente una publicacion nueva, titulada ${v.title}`,
      });
      emitEvent("new-post", { ...v, publishDate: new Date(v.publishDate) });
    }
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DialogTrigger
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        asChild
      >
        <Button variant="outline">{post ? "Editar" : "Crear"}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{post ? "Editar" : "Crear"}</DialogTitle>
        </DialogHeader>
        <PostForm post={post} onSubmit={(v) => onHandleSubmit(v)} />
      </DialogContent>
    </Dialog>
  );
}
