export default function GlitchText({ text, className = "" }) {
  return (
    <span data-text={text} className={`glitch inline-block ${className}`}>
      {text}
    </span>
  );
}
