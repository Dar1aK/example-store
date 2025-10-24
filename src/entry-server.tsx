import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { Application } from "./client/application";
import { MemoryRouter } from "react-router";

export function render(url: string) {
  const html = renderToString(
    <StrictMode>
      <MemoryRouter initialEntries={[url]}>
        <Application />
      </MemoryRouter>
    </StrictMode>
  );

  return { html };
}
