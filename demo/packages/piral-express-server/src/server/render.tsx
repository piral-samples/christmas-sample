import * as React from "react";
import { renderToStream } from "react-streaming/server";
import { renderToReadableStream } from "react-dom/server.browser";
import { RenderContext, createController } from "./RenderContext";
import { serializePartialState, serializeState } from "./state";
import { PageLayoutProps, UserPiletContext } from "./types";

interface StateResumationProps {
  type: "full" | "partial";
}

const StateResumation: React.FC<StateResumationProps> = ({ type }) => {
  const { Summary } = React.useContext(RenderContext);

  return (
    <Summary>
      {(context, usedComponents) => (
        <script
          type="piral-state"
          dangerouslySetInnerHTML={{
            __html:
              type === "full"
                ? serializeState(context, usedComponents)
                : serializePartialState(usedComponents),
          }}
        />
      )}
    </Summary>
  );
};

async function render(content: React.ReactNode, userAgent: string) {
  const { readable } = await renderToStream(content, {
    webStream: true,
    userAgent,
    renderToReadableStream,
  });

  return readable;
}

export function renderFragment(
  content: React.ReactNode,
  userAgent: string,
  context: UserPiletContext
) {
  const controller = createController(context);
  return render(
    <RenderContext.Provider value={controller}>
      {content}
      <StateResumation type="partial" />
    </RenderContext.Provider>,
    userAgent
  );
}

export function renderLayout(
  PageLayout: React.ComponentType<PageLayoutProps>,
  content: React.ReactNode,
  userAgent: string,
  context: UserPiletContext
) {
  const controller = createController(context);
  return render(
    <RenderContext.Provider value={controller}>
      <PageLayout
        context={context}
        style={
          <>
            <style dangerouslySetInnerHTML={{ __html: `piral-component, piral-slot { display: contents }` }} />
            <style dangerouslySetInnerHTML={{ __html: context.cssContent }} />
          </>
        }
        script={
          <script dangerouslySetInnerHTML={{ __html: context.jsContent }} />
        }
      >
        {content}
        <StateResumation type="full" />
      </PageLayout>
    </RenderContext.Provider>,
    userAgent
  );
}
