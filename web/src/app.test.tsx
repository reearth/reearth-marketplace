import { screen, render } from "@marketplace/test/utils";
import { expect, test } from "vitest";

test("hello, world", () => {
  render(<h1>Vite</h1>);
  expect(screen.getByText(/Vite/i)).toBeInTheDocument();
});
