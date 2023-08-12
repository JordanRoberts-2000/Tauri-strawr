import React from 'react'

type Props = React.HTMLAttributes<HTMLDivElement> & {
    snippetText: string
}

const TextSnippet = ({snippetText, ...rest}: Props) => {
  return (
    <div className="text-sm px-2 min-w-0 w-full text-[#abb2bf] max-w-6xl overflow-x-hidden break-all whitespace-pre-wrap" 
        contentEditable spellCheck={false} suppressContentEditableWarning={true} {...rest} dangerouslySetInnerHTML={{ __html: snippetText}}>
    </div>
  )
}

export default TextSnippet