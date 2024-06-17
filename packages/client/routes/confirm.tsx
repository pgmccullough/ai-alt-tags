import { Header } from "../components/Header/Header.tsx";
import { ContentBlock } from "../components/ContentBlock/ContentBlock.tsx"
import { ContentBlockB } from "../components/ContentBlockB/ContentBlockB.tsx"
import { Partial } from "$fresh/runtime.ts";

export default function Signup() {
  return (
    <div f-client-nav>
      <Header />
      <Partial name="signup-content">
        oh hei you have to check ur email lmao
      </Partial>
      <ContentBlock />
      <ContentBlockB />
    </div>
  );
}
