import { JSX } from "preact";

export const Header = (props: JSX.HTMLAttributes<HTMLElement>) => {
  return (
    <header
      {...props}
      class="header"
    >
      <h1>AI Alt Tags</h1>
      <a href="signup">Sign up</a>
    </header>
  );
}
