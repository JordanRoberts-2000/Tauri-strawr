export const getHighlightedText = () => {
    const sel = document.getSelection()
    if(sel){
        if(sel.focusOffset !== sel.anchorOffset){
            return sel.toString()
        }else{
            return null
        }
    }else{
        return null
    }
    
}