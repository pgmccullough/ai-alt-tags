import { Header } from "../components/Header/Header.tsx";
import { ImageDemo } from "../islands/ImageDemo/ImageDemo.tsx";
import { ContentBlock } from "../components/ContentBlock/ContentBlock.tsx"
import { ContentBlockB } from "../components/ContentBlockB/ContentBlockB.tsx"

export default function Home() {
  return (
    <>
      <Header />
      <ImageDemo />
      <ContentBlock />
      <ContentBlockB />
    </>
  );
}
