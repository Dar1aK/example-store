import { StrictMode } from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import { renderToString } from "react-dom/server";

import { Application } from "@/application";
import { initStore } from "@/store";

export function render(url: string) {
  const store = initStore();

  const html = renderToString(
    <StrictMode>
      <Provider store={store}>
        <MemoryRouter initialEntries={[url]}>
          <Application />
        </MemoryRouter>
      </Provider>
    </StrictMode>
  );

  return { html };
}
