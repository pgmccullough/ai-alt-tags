import { JSX } from "preact";
import { Card } from "../Card/Card.tsx";

export const ContentBlockB = (props: JSX.HTMLAttributes<HTMLElement>) => {
  
  return (
    <section class="content-block-b">
      <h2 class="content-block-b__h2">Subscription Tiers</h2>
      <Card />
      <Card />
      <Card />
    </section>
  )
}