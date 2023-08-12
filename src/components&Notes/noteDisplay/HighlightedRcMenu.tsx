import React from 'react'

type Props = {
    tabId: number,
    tabSection: any
}

const HighlightedRcMenu = ({tabId, tabSection}: Props) => {
    const editHighlighted = (element: string, classes?: string) => {
        if(!window.getSelection)return
        const selection = window.getSelection();
        const range = selection!.getRangeAt(0);
        const selected = tabSection.innerHTML.substr(range.startOffset,range.endOffset - range.startOffset );
        var target = document.createTextNode("\u0001");
        document.getSelection()!.getRangeAt(0).insertNode(target);
        var position = tabSection.innerHTML.indexOf("\u0001");
        target.parentNode!.removeChild(target)
        let before = tabSection.innerHTML.substr(0, position);
        let highlighted = tabSection.innerHTML.substr(position, selected.length)
        let after = tabSection.innerHTML.substr(position + selected.length);
        console.log(highlighted)
        // console.log(before + `<${element} ${classes && `class='${classes}`}'>` + highlighted + `</${element}>` + after)
        tabSection.innerHTML = before + `<${element} ${classes && `class='${classes}`}'>` + highlighted + `</${element}>` + after
    }
    return (
        <>
            <li><button onClick={() => editHighlighted("span", "text-4xl font-bold")}>Heading</button></li>
            <li><button onClick={() => editHighlighted("span", "text-xl font-bold")}>Sub-heading</button></li>
            <li><button onClick={() => editHighlighted("span", "text-xs")}>Small</button></li>
            <li><button onClick={() => editHighlighted("strong")}>Bold</button></li>
            <li><button onClick={() => editHighlighted("em")}>Italic</button></li>
            <li><button onClick={() => editHighlighted("u")}>Underline</button></li>
        </>
    )
}

export default HighlightedRcMenu