export const Button = ({ to, text, fpartial }) => {
  return (
    <a href={to} f-partial={fpartial}>
      <button class="button">
        {text}
      </button>
    </a>
  )
}