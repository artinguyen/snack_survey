import dayjs, { type ConfigType } from 'dayjs'
import 'dayjs/locale/ja'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

import { DEFAULT_EMPTY } from '@/core/constants/app'

/**
 * Handle all logic common of date time
 */
dayjs.locale('ja')
dayjs.extend(localizedFormat)
dayjs.extend(utc)
dayjs.extend(timezone)

export const DATE_FORMAT = Object.freeze({
  YYYYMMDD: 'YYYY/MM/DD',
  YYYY_MM_DD: 'YYYY-MM-DD',
  YYYY_MM_DDJP: 'YYYY年MM月DD日'
})

export type TDateType = 'year' | 'month' | 'week' | 'day' | 'hour'

export const formatDate = (
  date?: ConfigType,
  format: string = DATE_FORMAT.YYYYMMDD,
  empty: boolean = false
) => {
  const mDate = dayjs(date ?? '')
  if (mDate.isValid()) {
    return mDate.format(format)
  }
  return empty ? DEFAULT_EMPTY : null
}

export const getDateTimeAgo = (
  agoNumber: number,
  type: TDateType,
  format: string,
  date: ConfigType = new Date()
) => {
  const mDate = dayjs(date ?? '')

  if (mDate.isValid()) {
    const agoDate = dayjs(date).subtract(agoNumber, type)

    return formatDate(agoDate, format)
  }

  return null
}
