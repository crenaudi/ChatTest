export function reduceRenderEdit(edit, mentionState) {
  const ret = edit.blocks.reduce((acc, curr) => {
    const mentions = []
    if (mentionState) {
      mentionState.map((item) => {
        if (curr.text.includes(item.name)) {
          mentions.push(item)
        }
      })
    }
    acc.push({
      text: curr.text,
      type: curr.type,
      inlineStyleRanges: curr.inlineStyleRanges,
      entityRanges: curr.entityRanges,
      mentions,
    })
    return acc
  }, [])
  return ret
}