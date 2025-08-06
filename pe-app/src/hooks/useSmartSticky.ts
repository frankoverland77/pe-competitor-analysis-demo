import { useState, useEffect, useCallback } from 'react'

export function useSmartSticky(itemsCount: number, threshold: number = 20) {
  const [shouldBeSticky, setShouldBeSticky] = useState(false)

  const checkStickyCondition = useCallback(() => {
    // Get viewport height
    const viewportHeight = window.innerHeight
    
    // Estimate if content would overflow
    // Header ~48px + Navigation ~48px + Search/Filters ~64px + Drag area ~56px + Control bar ~48px = ~264px
    // Plus pagination ~64px = ~328px total chrome
    // Each row is ~48px
    const chromeHeight = 328
    const rowHeight = 48
    const availableHeight = viewportHeight - chromeHeight
    const maxVisibleRows = Math.floor(availableHeight / rowHeight)
    
    // Should be sticky if:
    // 1. We have more items than the threshold (20)
    // 2. OR the viewport is too small to show all items
    const needsSticky = itemsCount > threshold || itemsCount > maxVisibleRows
    
    setShouldBeSticky(needsSticky)
  }, [itemsCount, threshold])

  useEffect(() => {
    checkStickyCondition()
    
    // Re-check on window resize
    window.addEventListener('resize', checkStickyCondition)
    
    return () => {
      window.removeEventListener('resize', checkStickyCondition)
    }
  }, [checkStickyCondition])

  return shouldBeSticky
}