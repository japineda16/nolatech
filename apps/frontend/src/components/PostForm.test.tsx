import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PostForm from "./PostForm";
import type { Post } from "@/types/interfaces";

describe("PostForm", () => {
  const mockOnSubmit = jest.fn();

  it("renders empty form when no post is provided", () => {
    render(<PostForm onSubmit={mockOnSubmit} />);
    expect(screen.getByLabelText(/Titulo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Autor/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Fehca de pulicación/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Crear/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter post title/i)).toHaveValue("");
    expect(screen.getByPlaceholderText(/Enter author name/i)).toHaveValue("");
    expect(screen.getByLabelText(/Fehca de pulicación/i)).toHaveValue("");
  });

  it("renders form with post data when post is provided", () => {
    const post: Post = {
      id: "1",
      title: "Test Title",
      author: "Test Author",
      publishDate: new Date("2024-06-22T00:00:00.000Z"),
    };
    render(<PostForm post={post} onSubmit={mockOnSubmit} />);
    expect(screen.getByPlaceholderText(/Enter post title/i)).toHaveValue(
      "Test Title"
    );
    expect(screen.getByPlaceholderText(/Enter author name/i)).toHaveValue(
      "Test Author"
    );
    expect(screen.getByLabelText(/Fehca de pulicación/i)).toHaveValue(
      "2024-06-22"
    );
    expect(
      screen.getByRole("button", { name: /Actualizar/i })
    ).toBeInTheDocument();
  });
});
