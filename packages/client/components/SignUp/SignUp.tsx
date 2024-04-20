import { Input } from "../../islands/Input/Input.tsx"

export const SignUp = () => {

  return (
    <section class="signup">
      <form class="signup__form">
        <h2 class="signup__h2">Create an Account</h2>
        <Input
          className="signup__input"
          name="name"
          value=""
          placeholder="Name"
          validation={null}
        />
        <Input
          className="signup__input"
          name="email"
          value=""
          placeholder="Email"
          validation={"email"}
        />
        <Input
          className="signup__input"
          name="password"
          value=""
          placeholder="Password"
          validation={"password"}
          type="password"
        />
        <Input
          className="signup__input"
          name="passwordconfirm"
          value=""
          placeholder="Password (Confirm)"
          validation={"password"}
          type="password"
        />
        <button class="signup__button">SIGN UP</button>
      </form>
      <div class="signup__pitch">
        <h3>🌟 Sign Up for Instant Alt Tag Generation 🌟</h3>
        <h4>Why sign up?</h4>
        <ul>
          <li><b>Efficiency:</b> Save time and effort by automating alt tag generation for your images.</li>
          <li><b>Accessibility:</b> Ensure your website is inclusive and accessible to all users.</li>
          <li><b>SEO Boost:</b> Improve search engine rankings with descriptive alt tags.</li>
          <li><b>Customization:</b> Tailor alt tags to match your website's style and tone.</li>
          <li><b>Seamless Integration:</b> Quick and easy API integration for your website or app.</li>
        </ul>
        <p>
          Ready to enhance your website's accessibility and SEO performance? Sign up now!
        </p>
      </div>
    </section>
  )
}