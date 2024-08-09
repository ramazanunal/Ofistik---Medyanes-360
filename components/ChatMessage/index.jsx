import { useEffect, useState } from 'react'

function ChatMessage({ message, inputValue }) {
  const [highlightedText, setHighlightedText] = useState(message.text)

  useEffect(() => {
    if (inputValue != '') {
      const regex = new RegExp(`(${inputValue})`, 'gi')
      const parts = message.text.split(regex)
      const highlighted = parts.map((part, i) =>
        regex.test(part) ? (
          <span key={i} style={{ backgroundColor: 'yellow' }}>
            {part}
          </span>
        ) : (
          part
        )
      )
      setHighlightedText(highlighted)
    } else {
      setHighlightedText(message.text)
    }
  }, [inputValue, message.text])

  return (
    <>
      <span className="max-w-screen-sm overflow-hidden break-words">
        {highlightedText}
      </span>
      <div className="flex justify-end items-center space-x-2 text-xs mt-1 opacity-70">
        <div>{message.hour}</div>
        {message.sent && (
          <IoCheckmarkDoneSharp className="text-premiumOrange" />
        )}
      </div>
    </>
  )
}

export default ChatMessage
