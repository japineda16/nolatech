import { lazy } from "react";
import "./App.css";
import { Toaster } from "./components/ui/sonner";

const PostList = lazy(() => import("./components/PostList"));
const PostModal = lazy(() => import("./components/PostModal"));

function App() {
  return (
    <>
      <div className="flex flex-col items-center justify-center space-y-3">
        <PostModal />
        <div className="w-full">
          <PostList />
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default App;
