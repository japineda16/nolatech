import type { Post } from "@/types/interfaces";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface PostStore {
  posts: Post[];
  filteredPost: Post[];
  getPosts: (filters?: { author?: string; date?: Date }) => Post[];
  editPost: (id: string, updatedPost: Partial<Post>) => void;
  addPost: (newPost: Omit<Post, "id">) => void;
}

// Mock data
const mockPosts: Post[] = [
  {
    id: "1",
    title: "First Post",
    author: "John Doe",
    publishDate: new Date("2024-03-01"),
  },
  {
    id: "2",
    title: "Second Post",
    author: "Jane Smith",
    publishDate: new Date("2024-03-15"),
  },
];

export const usePostStore = create<PostStore>()(
  persist(
    (set, get) => ({
      posts: mockPosts,
      filteredPost: [],

      getPosts: (filters) => {
        const posts = get().posts;

        if (!filters) {
          set({ filteredPost: [] });
          return posts;
        }

        const filteredPost = posts.filter((post) => {
          const authorMatch =
            !filters.author ||
            post.author.toLowerCase().includes(filters.author.toLowerCase());
          const dateMatch =
            !filters.date ||
            new Date(post.publishDate).toDateString() ===
              filters.date.toDateString();
          return authorMatch && dateMatch;
        });
        set({ filteredPost });
        return filteredPost;
      },

      editPost: (id, updatedPost) => {
        set((state) => ({
          posts: state.posts.map((post) =>
            post.id === id ? { ...post, ...updatedPost } : post
          ),
        }));
      },

      addPost: (newPost: Omit<Post, "id">) => {
        set((state) => ({
          posts: [
            ...state.posts,
            {
              ...newPost,
              id: crypto.randomUUID(), // Generate unique ID for new post
            },
          ],
        }));
      },
    }),
    {
      name: "post-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
