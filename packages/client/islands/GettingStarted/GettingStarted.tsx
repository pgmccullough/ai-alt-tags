import { useComputed, useSignal } from "@preact/signals";

export const GettingStarted = () => {
  const codeExamples = [
    "Shell example coming soon",
    `<code-yellow>const</code-yellow> <code-pink>apiReq</code-pink> = <code-yellow>await</code-yellow> <code-light-blue>fetch</code-light-blue><code-dark-blue>(</code-dark-blue><code-pink>API_URL</code-pink>,<code-yellow>{</code-yellow><br />
      &emsp;<code-pink>method</code-pink>: <code-orange>'POST'</code-orange>,<br />
      &emsp;<code-pink>body</code-pink>: <code-pink>JSON</code-pink>.<code-light-blue>stringify</code-light-blue><code-pink>(</code-pink><code-dark-blue>{</code-dark-blue><code-pink>imgUrl</code-pink>: <code-pink>PATH_TO_IMAGE</code-pink><code-dark-blue>}</code-dark-blue><code-pink>)</code-pink>,<br />
      &emsp;<code-pink>headers</code-pink>: <code-pink>{</code-pink><br />
      &emsp;&emsp;<code-orange>'Content-type'</code-orange>: <code-orange>'application/json; charset=UTF-8'</code-orange>,<br />
      &emsp;<code-pink>}</code-pink><br />
      <code-yellow>}</code-yellow><code-dark-blue>)</code-dark-blue><br />
      <code-yellow>const</code-yellow> <code-pink>response</code-pink> = <code-yellow>await</code-yellow> <code-pink>apiReq</code-pink>.<code-light-blue>json</code-light-blue><code-dark-blue>()</code-dark-blue>;<br />
      <code-pink>altText</code-pink>.<code-pink>value</code-pink> = <code-pink>response</code-pink>.<code-pink>data</code-pink>;`,
    "Ruby example coming soon",
    "PHP example coming soon",
    "Python example coming soon",
    "Java example coming soon",
  ]

  const activeLang = useSignal(0);
  const languages = useSignal(["Shell","Node","Ruby","PHP","Python","Java"])
  const activeLangData = useComputed(() => codeExamples[activeLang.value]) 

  return(
    <section class="getting-started">
      <nav class="getting-started__tab-container">
      {languages.value.map((lang:string, i:number) => 
        <div
          class={`getting-started__tab${i===activeLang.value?"--active":""}`}
          onClick={() => activeLang.value = i}
        >
          {lang}
        </div>
      )}
      </nav>
      <article class="getting-started__code-block">
        {<span dangerouslySetInnerHTML={{__html: activeLangData.value}} />}
      </article>
    </section>
  )
}