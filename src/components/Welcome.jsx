import { useRef } from 'react'

const renderText = (text, className, baseWeight = 400) => {
  return [...text].map((char, i) => (
    <span key={`renderText-${i}`} className={className} style={{ fontVariationSettings: `whgt ${baseWeight}` }}>
      {char === " " ? '\u00A0' : char}
    </span>
  ))
}

const setupTextHover = (container, type) => {
  if(!container) return;

  const letters = container.querySelectorAll('span');
}

const Welcome = () => {

  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  return (
    <section id="welcome">
      <p ref={subtitleRef}>
        {renderText("Hey I'm Jijo! Welcome to my", "text-3xl font-georama", 100)}
        </p>
      <h1 ref={titleRef} className='mt-7'>
        {renderText("Portfolio", "text-9xl italic font-georama")}
      </h1>

      <div className="small-screen">
        This Portfolio is designed for Desktop/tablet screen only.
      </div>
    </section>
  )
}

export default Welcome