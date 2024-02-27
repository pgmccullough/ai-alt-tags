import { useComputed, useSignal } from "@preact/signals";
import { useEffect, useRef } from "preact/hooks";

export const ImageDemo = () => {
  const altText = useSignal("Smiling young couple taking a selfie and waving on wooded road.");

  const previewImage = useSignal("/assets/images/sample_preview_1.jpg");
  const animatedText = useSignal("");
  const animatedTextPos = useSignal(0);
  const imageTagOpen = useComputed(() => `&lt;img<br />&nbsp;&nbsp;&nbsp;&nbsp;src=\"${previewImage.value.split("/").at(-1)}\"`);
  const imageTagClose = useSignal("/&gt;");
  const imageURL = useRef<HTMLInputElement>(null);

  const animateText = () => {
    if(animatedTextPos.value <= altText.value.length) {
      animatedText.value = `alt="${altText.value.slice(0,animatedTextPos.value)}`;
      animatedTextPos.value++;
      setTimeout(() => animateText(),50);
    }
  }

  useEffect(() => {
    const initPause = setTimeout(() => {
      animatedText.value = "alt=\"";
    }, 2000);
    const writePause = setTimeout(() => {
      animateText();
    }, 4500)
    return () => {
      clearTimeout(initPause);
      clearTimeout(writePause);
    };
  },[ previewImage.value ])

  const handleImageSubmit = async (imgUrl: string) => {
    previewImage.value = imgUrl;
    animatedText.value = "";
    altText.value = "";
    animatedTextPos.value = 0;
    const env = await fetch("/api/environment");
    const { API_URL } = await env.json();
    const apiReq = await fetch(API_URL,{
      method: 'POST',
      body: JSON.stringify({imgUrl}),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    })
    const response = await apiReq.json();
    altText.value = response.data;
    animateText();
  };

  return (
    <section class="image-demo">
      <figure class="image-demo__image-border">
        <img
          src={previewImage.value}
          class="image-demo__image"
        />
      </figure>
      <article class="image-demo__sample-code">
        <p dangerouslySetInnerHTML={{__html: imageTagOpen.value}} />
        {animatedText.value
          ?<>
            <p
              class="image-demo__alt-tag"
              dangerouslySetInnerHTML={{__html: `${animatedText.value}<div class="caret"></div>"`}}
            />
          </>
          :""
        }
        <p dangerouslySetInnerHTML={{__html: imageTagClose.value}} />
      </article>
      <h2 class="image-demo__h2">Try it yourself!</h2>
      <p class="image-demo__content">
        Enter the url of an online image into the bar below for an auto-generated alt tag!
      </p>
      <input
        class="image-demo__input"
        placeholder="Image URL"
        ref={imageURL}
      />
      <button class="image-demo__button" onClick={() => handleImageSubmit(imageURL.current!.value)}>SUBMIT</button>
    </section>
  )
}