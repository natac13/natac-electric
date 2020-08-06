const getScrollPercent = (): number => {
  const h = document.documentElement
  const b = document.body
  return (
    (h.scrollTop || b.scrollTop) /
    ((h.scrollHeight || b.scrollHeight) - h.clientHeight)
  )
}

export default getScrollPercent
