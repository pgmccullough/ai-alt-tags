import { Header } from "../components/Header/Header.tsx";
import { ImageDemo } from "../islands/ImageDemo/ImageDemo.tsx";
import { ContentBlock } from "../components/ContentBlock/ContentBlock.tsx"
import { ContentBlockB } from "../components/ContentBlockB/ContentBlockB.tsx"
import { Partial } from "$fresh/runtime.ts";

export default function Home() {
  return (
    <div f-client-nav>
      <Header />
      <Partial name="main-content">
        <ImageDemo />
      </Partial>
      <ContentBlock />
      <ContentBlockB />
    </div>
  );
}
