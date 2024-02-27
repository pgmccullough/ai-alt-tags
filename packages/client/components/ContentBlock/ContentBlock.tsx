import { JSX } from "preact";
import { GettingStarted } from "../../islands/GettingStarted/GettingStarted.tsx";

export const ContentBlock = (props: JSX.HTMLAttributes<HTMLElement>) => {
  
  return (
    <section class="content-block">
      <h2 class="content-block__h2">Getting Started</h2>
      <GettingStarted />
    </section>
  )
}