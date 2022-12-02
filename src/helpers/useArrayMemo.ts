import { useEffect, useRef } from 'react'

/**
 * @see https://medium.com/@trisianto/react-query-how-to-memoize-results-from-usequeries-hook-eaed9a0ec700
 *   Compares arrays more deeply.
 */
export const useArrayMemo = <T>(array: Array<T>): Array<T> => {
  // this holds reference to previous value
  const ref = useRef<Array<T>>([])

  // check if each element of the old and new array match
  const areArraysConsideredTheSame =
    ref.current && array.length === ref.current.length
      ? array.every((element, i) => {
          return element === ref.current[i]
        })
      : //initially there's no old array defined/stored, so set to false
        false

  useEffect(() => {
    // only update prev results if array is not deemed the same
    if (!areArraysConsideredTheSame) {
      ref.current = array
    }
  }, [areArraysConsideredTheSame, array])

  return areArraysConsideredTheSame ? ref.current : array
}
