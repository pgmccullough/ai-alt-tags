import { Header } from "../../components/Header/Header.tsx";
import { SignUp } from "../../components/SignUp/SignUp.tsx";
import { Partial } from "$fresh/runtime.ts";

export default function SignupPartial() {
  return (
    // <>
    //   <Header />
      <Partial name="main-content">
        <SignUp />
      </Partial>
    // </>
  );
}