import { usePostStore } from "@/store/post.store";
import SearchFilters from "./Filters";
import { PostTable } from "./PostTable";

export default function PostList() {
  const { posts, filteredPost } = usePostStore((s) => s);

  return (
    <div>
      <SearchFilters />
      {filteredPost.length > 0 ? (
        <PostTable post={filteredPost} />
      ) : (
        <PostTable post={posts} />
      )}
    </div>
  );
}
