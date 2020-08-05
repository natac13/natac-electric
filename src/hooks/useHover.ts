import useEventListener from '@use-it/event-listener'
import { useRef, useState } from 'react'

export interface HoverOptions {
  onMouseOver?: () => void
  onMouseOut?: () => void
  mouseOverDelay?: number
  mouseOutDelay?: number
}
// Hook
const useHover = (options: HoverOptions = {}): [React.Ref<any>, boolean] => {
  const [value, setValue] = useState(false)
  const {
    onMouseOut,
    onMouseOver,
    mouseOutDelay = 0,
    mouseOverDelay = 0,
  } = options
  const ref = useRef(null)

  let mouseOverInterval: number | undefined
  let mouseOutInterval: number | undefined

  const handleMouseOver = () => {
    clearInterval(mouseOutInterval)
    if (mouseOverDelay <= 0 || !window) {
      if (typeof onMouseOver === 'function') {
        onMouseOver()
      }
      setValue(true)
    } else {
      mouseOverInterval = window.setTimeout(() => {
        if (typeof onMouseOver === 'function') {
          onMouseOver()
        }
        setValue(true)
      }, mouseOverDelay)
    }
  }
  const handleMouseOut = () => {
    clearInterval(mouseOverInterval)
    if (mouseOutDelay <= 0 || !window) {
      if (typeof onMouseOut === 'function') {
        onMouseOut()
      }
      setValue(false)
    } else {
      mouseOutInterval = window.setTimeout(() => {
        if (typeof onMouseOut === 'function') {
          onMouseOut()
        }
        setValue(false)
      }, mouseOverDelay)
    }
  }

  const node = ref.current
  useEventListener('mouseover', handleMouseOver, node)
  useEventListener('mouseout', handleMouseOut, node)

  return [ref, value]
}

export default useHover
