import { JSX } from "preact";
import { Button } from "../Button/Button.tsx";

export const Header = (props: JSX.HTMLAttributes<HTMLElement>) => {
  return (
    <header
      {...props}
      class="header"
    >
      <div />
      <h1>AI Alt Tags</h1>
      <Button
        fpartial="/partials/signup"
        to="/signup"
        text="Sign up"
      />
    </header>
  );
}
