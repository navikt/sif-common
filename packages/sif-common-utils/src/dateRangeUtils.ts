import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import minMax from 'dayjs/plugin/minMax';
import { isDate, uniq, uniqBy } from 'lodash';
import { DateRange, getFirstOfTwoDates, ISODate, ISODateRange, ISODateRangeMap, MaybeDateRange } from './';
import {
    dateToISODate,
    getFirstWeekDayInMonth,
    getLastWeekDayInMonth,
    isDateWeekDay,
    ISODateToDate,
    sortDates,
} from './dateUtils';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(isBetween);
dayjs.extend(minMax);

const isDateObject = (maybeDate: any) => {
    return typeof maybeDate === 'object' && isDate(maybeDate) && !isNaN(maybeDate.getTime());
};

/**
 * Typecheck for DateRange object
 * @param dateRange
 * @returns boolean
 */
export const isDateRange = (dateRange: any): dateRange is DateRange => {
    return isDateObject(dateRange.from) && isDateObject(dateRange.to);
};

/**
 * Sorts an array of date ranges by the from-date
 * @param d1
 * @param d2
 * @returns sort value
 */

export const sortDateRange = (d1: Pick<DateRange, 'from'>, d2: Pick<DateRange, 'from'>): number => {
    if (dayjs(d1.from).isSameOrBefore(d2.from, 'day')) {
        return -1;
    }
    return 1;
};

/**
 * Sorts an array of date ranges by the from-date
 * @param d1
 * @param d2
 * @returns sort value
 */

export const sortMaybeDateRange = (d1: MaybeDateRange, d2: MaybeDateRange): number => {
    if (d1.from === undefined && d2.from === undefined) {
        return 0;
    }
    if (d1.from === undefined) {
        return -1;
    }
    if (d2.from === undefined) {
        return 1;
    }
    if (dayjs(d1.from).isSameOrBefore(d2.from, 'day')) {
        return -1;
    }
    return 1;
};

/**
 * Sorts an array of date ranges by the to-date
 * @param d1
 * @param d2
 * @returns sort value
 */
export const sortDateRangeByToDate = (d1: DateRange, d2: DateRange): number => {
    if (dayjs(d1.to).isSameOrBefore(d2.to, 'day')) {
        return -1;
    }
    return 1;
};

/**
 * Checks if date ranges spans the same dates
 * @param dateRanges
 * @param fromDateCanBeSameAsPreviousToDate
 * @returns boolean
 */
export const dateRangesCollide = (dateRanges: DateRange[], fromDateCanBeSameAsPreviousToDate = false): boolean => {
    if (dateRanges.length > 0) {
        const sortedDates = dateRanges.sort(sortDateRange);
        const hasOverlap = dateRanges.find((d, idx) => {
            if (idx < sortedDates.length - 1) {
                if (fromDateCanBeSameAsPreviousToDate) {
                    return dayjs(d.to).isAfter(sortedDates[idx + 1].from, 'day');
                } else {
                    return dayjs(d.to).isSameOrAfter(sortedDates[idx + 1].from, 'day');
                }
            }
            return false;
        });
        return hasOverlap !== undefined;
    }
    return false;
};

/**
 * Check if multiple date ranges exceeds one date range
 * @param ranges
 * @param allowedRange
 * @returns boolean
 */
export const dateRangesExceedsRange = (ranges: DateRange[], allowedRange: DateRange): boolean => {
    if (ranges.length === 0) {
        return false;
    }
    const sortedRanges = ranges.sort(sortDateRange);
    const from = sortedRanges[0].from;
    const to = sortedRanges[sortedRanges.length - 1].to;

    if (
        !dayjs(from).isBetween(allowedRange.from, allowedRange.to, 'day', '[]') ||
        !dayjs(to).isBetween(allowedRange.from, allowedRange.to, 'day', '[]')
    ) {
        return true;
    }
    return false;
};

/**
 * Check if one or more dates are within dateranges
 * @param dates
 * @param dateRanges
 * @returns boolean
 */
export const datesCollideWithDateRanges = (dates: Date[], dateRanges: DateRange[]): boolean => {
    if (dateRanges.length > 0 && dates.length > 0) {
        return dates.some((d) => {
            return dateRanges.some((range) => isDateInDateRange(d, range));
        });
    }
    return false;
};

/**
 * Check if date is within a date range or open dateRange
 * @param date
 * @param dateRange
 * @returns boolean
 */
export const isDateInMaybeDateRange = (date: Date, dateRange: MaybeDateRange): boolean => {
    if (isDateRange(dateRange)) {
        return isDateInDateRange(date, dateRange);
    }
    if (dateRange.from) {
        return dayjs(date).isSameOrAfter(dateRange.from);
    }
    if (dateRange.to) {
        return dayjs(date).isSameOrBefore(dateRange.to);
    }
    return false;
};

/**
 * Check if a date is in a date range, including date range from-date and date range to-date
 * @param date
 * @param dateRange
 * @returns boolean
 */

export const isDateInDateRange = (date: Date, dateRange: DateRange): boolean => {
    return dayjs(date).isBetween(dateRange.from, dateRange.to, 'day', '[]');
};

/**
 * Check if a date is in one of the dateranges, including date range from-date and date range to-date
 * @param date
 * @param dateRanges Array of DateRanges
 * @returns boolean
 */

export const isDateInDateRanges = (date: Date, dateRanges: DateRange[]): boolean => {
    return dateRanges.some((dateRange) => isDateInDateRange(date, dateRange));
};

/**
 * Check if a date is inside a date range, excluding date range from-date and date range to-date
 * @param date
 * @param dateRange
 * @returns boolean
 */
export const isDateInsideDateRange = (date: Date, dateRange: DateRange): boolean => {
    return dayjs(date).isBetween(dateRange.from, dateRange.to, 'day', '()');
};

/**
 * Check if a dateRange is before or equal to given date
 * @param dateRange
 * @param date
 * @returns boolean
 */
export const isDateRangeSameOrBeforeDate = (dateRange: DateRange, date: Date): boolean => {
    return dayjs(dateRange.to).isSameOrBefore(date, 'day');
};

/**
 * Returns array of DateRange representing the months in @dateRange.
 * @param dateRange
 * @param returnFullMonths Set to return full months, not cap the months by @dateRange
 * @returns array of DateRange
 */
export const getMonthsInDateRange = (dateRange: DateRange, returnFullMonths = false): DateRange[] => {
    const months: DateRange[] = [];
    let current = dayjs(dateRange.from);
    do {
        const from: Date = returnFullMonths ? current.startOf('month').toDate() : current.toDate();
        const endOfMonth = dayjs(from).endOf('month').toDate();
        const to =
            dayjs(endOfMonth).isAfter(dateRange.to, 'day') && returnFullMonths === false ? dateRange.to : endOfMonth;

        months.push({ from, to });
        current = current.add(1, 'month').startOf('month');
    } while (current.isSameOrBefore(dateRange.to, 'day'));
    return months;
};

/**
 * Returns array of dates representing the months in @dates.
 * @param dates
 * @returns array of Date
 */
export const getMonthsInDates = (dates: Date[]): Date[] => {
    // filter unique months in dates
    const months: Date[] = [];
    dates.forEach((date) => {
        const month = dayjs(date).startOf('month').toDate();
        if (!months.find((m) => dayjs(m).isSame(month, 'day'))) {
            months.push(month);
        }
    });
    return months;
};

/**
 * Returns a DateRange for the month which date is a part of.
 * @param date
 * @param onlyWeekDays Exclude saturday and sunday from dateRange
 * @returns DateRange
 */
export const getMonthDateRange = (date: Date, onlyWeekDays = false): DateRange => ({
    from: onlyWeekDays ? getFirstWeekDayInMonth(date) : dayjs(date).startOf('month').toDate(),
    to: onlyWeekDays ? getLastWeekDayInMonth(date) : dayjs(date).endOf('month').toDate(),
});

/**
 * Utvider DateRange til å gå til og med søndag, dersom dateRange slutter på fredag, lørdag eller søndag
 * @param dateRange
 * @returns dateRange hvor to-date er endret dersom den slutter på fre/lør/søn
 */
export const includeWeekendIfDateRangeEndsOnFridayOrLater = (dateRange: DateRange): DateRange => {
    if (dayjs(dateRange.to).isoWeekday() >= 5) {
        return {
            ...dateRange,
            to: dayjs(dateRange.to).endOf('isoWeek').toDate(),
        };
    }
    return dateRange;
};

/**
 * Checks if two date ranges are adjacent; if the second DateRange starts on the day after the first dateRange
 */

/**
 * Checks if two date ranges are adjacent -> if the second DateRange starts on the day after the first dateRange
 * Returns false if second dateRange starts before end of first date range
 * @param dateRange1
 * @param dateRange2
 * @returns true if adjacent
 */
export const dateRangeIsAdjacentToDateRange = (
    dateRange1: DateRange,
    dateRange2: DateRange,
    ignoreWeekends = false,
): boolean => {
    if (dayjs(dateRange1.to).isSameOrAfter(dateRange2.from, 'day')) {
        return false;
    }
    if (ignoreWeekends && dayjs(dateRange1.to).isoWeekday() >= 5 && dayjs(dateRange2.from).isoWeekday() === 1) {
        const diff = dayjs(dateRange1.to).startOf('day').diff(dayjs(dateRange2.from).startOf('day'), 'days');
        return diff === -1 || diff === -2 || diff === -3;
    }

    return dayjs(dateRange1.to).startOf('day').diff(dayjs(dateRange2.from).startOf('day'), 'days') === -1;
};

/**
 * Joins DateRanges which are adjacent
 * @param dateRanges ranges to be joined
 * @param ignoreWeekends Slår sammen perioder selv om det er en helg mellom periodene
 * @returns Joined DateRanges
 */
export const joinAdjacentDateRanges = (dateRanges: DateRange[], ignoreWeekends?: boolean): DateRange[] => {
    if (dateRanges.length === 0) {
        return [];
    }
    if (dateRanges.length === 1) {
        return dateRanges;
    }

    const joinedDateRanges: DateRange[] = [];
    let rangeFromDate: Date = dateRanges[0].from;

    dateRanges.forEach((current, index) => {
        if (index === dateRanges.length - 1) {
            joinedDateRanges.push({
                from: rangeFromDate,
                to: current.to,
            });
            return;
        }
        const next = dateRanges[index + 1];
        if (dateRangeIsAdjacentToDateRange(current, next, ignoreWeekends) === false) {
            joinedDateRanges.push({
                from: rangeFromDate,
                to: current.to,
            });
            rangeFromDate = next.from;
        }
    });

    return joinedDateRanges;
};

/**
 * Returns a DateRange for the week which date is a part of.
 * @param date
 * @param onlyWeekDays Exclude saturday and sunday from dateRange
 * @returns DateRange
 */

export const getWeekDateRange = (date: Date, onlyWeekDays = false): DateRange => {
    return {
        from: dayjs(date).startOf('isoWeek').toDate(),
        to: dayjs(date)
            .endOf('isoWeek')
            .subtract(onlyWeekDays ? 2 : 0, 'days')
            .toDate(),
    };
};

/**
 * Get an array of week dataRange for all weeks within @dateRange
 * @param dateRange
 * @returns
 */
export const getWeeksInDateRange = (dateRange: DateRange): DateRange[] => {
    const weeks: DateRange[] = [];
    let current = dayjs(dateRange.from);
    do {
        const weekDateRange: DateRange = { from: current.toDate(), to: current.endOf('isoWeek').toDate() };
        const rangeToPush: DateRange = {
            from: weekDateRange.from,
            to: getFirstOfTwoDates(weekDateRange.to, dateRange.to),
        };
        weeks.push(rangeToPush);
        current = current.add(1, 'week').startOf('isoWeek');
    } while (current.isBefore(dateRange.to, 'day'));
    if (current.isSame(dateRange.to, 'day')) {
        weeks.push({ from: dateRange.to, to: dateRange.to });
    }
    return weeks;
};
/**
 * Returns an array of all dates within @dateRange, with our without weekends
 * @param dateRange;
 * @param onlyWeekDays only include weekdays
 * @returns Date[]
 */
export const getDatesInDateRange = (dateRange: DateRange, onlyWeekDays = false): Date[] => {
    const dates: Date[] = [];
    let current = dayjs(dateRange.from);
    do {
        const date = current.toDate();
        if (onlyWeekDays === false || isDateWeekDay(date)) {
            dates.push(date);
        }
        current = current.add(1, 'day');
    } while (current.isSameOrBefore(dateRange.to, 'day'));
    return dates;
};

/**
 * Returns array with all years defined i the dateRanges from value
 * @param dateRanges
 * @returns array of unique years in dateRange.from
 */
export const getYearsInDateRanges = (dateRanges: DateRange[]): number[] =>
    uniq(dateRanges.map((d) => d.from.getFullYear()));

/**
 * Returns number of days within @dateRange
 * @param dateRange
 * @param onlyWeekDays
 * @returns
 */
export const getNumberOfDaysInDateRange = (dateRange: DateRange, onlyWeekDays = false): number =>
    onlyWeekDays
        ? getDatesInDateRange(dateRange, onlyWeekDays).length
        : Math.abs(dayjs(dateRange.to).startOf('day').diff(dayjs(dateRange.from).startOf('day'), 'days')) + 1;

/**
 * Gets a dateRange from a list of @dates
 * @param dates
 * @returns dateRange
 */
export const getDateRangeFromDates = (dates: Date[]): DateRange => {
    if (dates.length === 0) {
        throw 'getDateRangeFromDates: Cannot get date range from empty array';
    }
    const sortedDates = dates.sort(sortDates);
    return {
        from: sortedDates[0],
        to: sortedDates[sortedDates.length - 1],
    };
};

/**
 * Gets a dateRange spanning all @ranges
 * @param dateRanges
 * @returns dateRange
 */
export const getDateRangeFromDateRanges = (dateRanges: DateRange[]): DateRange => {
    if (dateRanges.length === 0) {
        throw 'getDateRangeFromDateRanges: Cannot get date range from empty array';
    }
    return {
        from: dayjs.min(dateRanges.map((range) => dayjs(range.from)))!.toDate(),
        to: dayjs.max(dateRanges.map((range) => dayjs(range.to)))!.toDate(),
    };
};

/**
 * Gets a isoDateRangeMap from array of DateRange
 * @param dateRanges
 * @returns dateRange
 */
export const getIsoDateRangeMapFromDateRanges = (dateRanges: DateRange[], value: any): ISODateRangeMap<any> => {
    const dateRangeMap: ISODateRangeMap<any> = {};
    dateRanges.map(dateRangeToISODateRange).forEach((key) => {
        dateRangeMap[key] = value;
    });
    return dateRangeMap;
};

/**
 * Gets DateRanges from array of dates, where following dates are grouped in one DateRange
 * Filters dates so only uniqe dates are used
 * @param dates Array of dates
 * @returns Array of DateRanges
 */

export const getDateRangesFromDates = (dates: Date[], removeDuplicateDates = true): DateRange[] => {
    const datesToUse = removeDuplicateDates ? uniqBy(dates, dateToISODate) : dates;

    const datesCount = datesToUse.length;
    if (datesCount === 0) {
        return [];
    }
    if (datesCount === 1) {
        return [{ from: datesToUse[0], to: datesToUse[0] }];
    }

    const dateRanges: DateRange[] = [];
    let from: Date;
    datesToUse.forEach((date, index) => {
        if (!from) {
            from = date;
        }
        /** Siste element */
        if (index === datesCount - 1) {
            return dateRanges.push({ from, to: date });
        }

        const followingCalendarDate = dayjs(date).add(1, 'day');
        const nextDateInArray = dates[index + 1];

        if (!dayjs(followingCalendarDate).isSame(nextDateInArray, 'day')) {
            dateRanges.push({ from, to: date });
            from = nextDateInArray;
        }
    });
    return dateRanges;
};

/**
 *
 */

export const getDatesInDateRanges = (dateRanges: DateRange[], removeDuplicateDates = true): Date[] => {
    const dates: Date[] = [];
    dateRanges.forEach((dateRange) => {
        dates.push(...getDatesInDateRange(dateRange));
    });
    return removeDuplicateDates ? uniqBy(dates, (d) => dateToISODate(d)) : dates;
};

/**
 * Returns an array of DateRanges between other @dateRanges
 * @param dateRanges
 * @returns date ranges between @dateRanges
 */
export const getDateRangesBetweenDateRanges = (dateRanges: DateRange[]): DateRange[] => {
    const rangesInBetween: DateRange[] = [];
    dateRanges.forEach((periode, index) => {
        if (index === 0) {
            return;
        }
        const rangeInBetween: DateRange = {
            from: dayjs(dateRanges[index - 1].to)
                .add(1, 'day')
                .toDate(),
            to: dayjs(periode.from).subtract(1, 'day').toDate(),
        };

        if (dayjs(rangeInBetween.from).isSameOrBefore(rangeInBetween.to, 'day')) {
            rangesInBetween.push(rangeInBetween);
        }
    });
    return rangesInBetween;
};

/**
 * Gets all dates in @month, not inside @dateRange
 * @param month
 * @param dateRange
 * @returns array of dates not within the dateRange
 */
export const getDatesInMonthOutsideDateRange = (month: Date, dateRange: DateRange): Date[] => {
    const monthDateRange: DateRange = getMonthDateRange(month);
    const dates: Date[] = [];

    if (dayjs(dateRange.from).isAfter(monthDateRange.from, 'day')) {
        dates.push(
            ...getDatesInDateRange({
                from: monthDateRange.from,
                to: dayjs(dateRange.from).subtract(1, 'day').toDate(),
            }),
        );
    }
    if (dayjs(dateRange.to).isBefore(monthDateRange.to, 'day')) {
        dates.push(
            ...getDatesInDateRange({
                from: dayjs(dateRange.to).add(1, 'day').toDate(),
                to: monthDateRange.to,
            }),
        );
    }

    return dates;
};

/**
 * Gets all dates in @week, not inside @dateRange
 * @param week
 * @param dateRange
 * @returns array of dates not within the dateRange
 */
export const getDatesInWeekOutsideDateRange = (week: Date, dateRange: DateRange, onlyWeekDays?: boolean): Date[] => {
    const weekDateRange: DateRange = getWeekDateRange(week, onlyWeekDays);
    const dates: Date[] = [];

    if (dayjs(dateRange.from).isAfter(weekDateRange.from, 'day')) {
        dates.push(
            ...getDatesInDateRange({
                from: weekDateRange.from,
                to: dayjs(dateRange.from).subtract(1, 'day').toDate(),
            }),
        );
    }
    if (dayjs(dateRange.to).isBefore(weekDateRange.to, 'day')) {
        dates.push(
            ...getDatesInDateRange({
                from: dayjs(dateRange.to).add(1, 'day').toDate(),
                to: weekDateRange.to,
            }),
        );
    }

    return dates;
};

/**
 * Converts ISODateRange to DateRange
 * @param isoDateRange
 * @returns
 */
export const ISODateRangeToDateRange = (isoDateRange: ISODateRange): DateRange => {
    const parts = isoDateRange.split('/');
    return {
        from: ISODateToDate(parts[0]),
        to: ISODateToDate(parts[1]),
    };
};

/**
 * Extracts from and to ISODates from ISODateRanges
 * @param isoDateRange
 * @returns
 */
export const ISODateRangeToISODates = (isoDateRange: ISODateRange): { from: ISODate; to: ISODate } => {
    const parts = isoDateRange.split('/');
    return {
        from: parts[0],
        to: parts[1],
    };
};

/**
 * Converts dateRange to ISODateRange
 * @param dateRange
 * @returns
 */
export const dateRangeToISODateRange = (dateRange: DateRange): ISODateRange => {
    return `${dateToISODate(dateRange.from)}/${dateToISODate(dateRange.to)}`;
};

/**
 * Returns all dates in date range as ISODates, weekends excluded
 * @param range
 * @returns
 */
export const getISODatesInISODateRange = (range: ISODateRange, onlyWeekDays = false): ISODate[] => {
    const dateRange = ISODateRangeToDateRange(range);
    return getDatesInDateRange(dateRange)
        .filter((date) => (onlyWeekDays ? isDateWeekDay(date) : true))
        .map((date) => dateToISODate(date));
};

/**
 * Return an ISODateRange with the same from and to date
 * @param isoDate
 * @returns ISODateRange
 */

export const ISODateToISODateRange = (isoDate: ISODate): ISODateRange => {
    return `${isoDate}/${isoDate}`;
};

export const getIsoWeekDateRangeForDate = (date: Date): DateRange => {
    const from = dayjs(date).startOf('isoWeek').toDate();
    const to = dayjs(date).endOf('isoWeek').toDate();
    return {
        from,
        to,
    };
};

export const getDateRangesFromISODateRangeMap = (map: ISODateRangeMap<any>): DateRange[] => {
    return Object.keys(map).map((isoDateRange) => dateRangeUtils.ISODateRangeToDateRange(isoDateRange));
};

/**
 * If the dateRange to-date is after maxDate, it sets the to-date to the maxDate.
 * Does not verify that maxToDate is after DateRange from-date
 *
 * @param dateRange DateRange
 * @param maxToDate Date
 * @returns Same or adjusted DateRange
 */
export const setMaxToDateForDateRange = (dateRange: DateRange, maxToDate: Date): DateRange => {
    if (dayjs(dateRange.to).isAfter(maxToDate, 'day')) {
        return {
            from: dateRange.from,
            to: maxToDate,
        };
    }
    return dateRange;
};

/**
 * Modifies start and/or end date to be within limitDateRange
 * @param dateRange
 * @param limitDateRange
 * @returns
 */
export const limitDateRangeToDateRange = <Type extends DateRange>(dateRange: Type, limitDateRange: DateRange): Type => {
    return {
        ...dateRange,
        from: dayjs(dateRange.from).isBefore(limitDateRange.from, 'day') ? limitDateRange.from : dateRange.from,
        to: dayjs(dateRange.to).isAfter(limitDateRange.to, 'day') ? limitDateRange.to : dateRange.to,
    };
};

/**
 * Returns all dateRanges within the limitDateRange.
 * @param dateRanges
 * @param limitDateRange
 * @param adjustToLimit Modifies dateRanges crossing limitDateRange if set to true (default)
 * @returns
 */
export const getDateRangesWithinDateRange = <Type extends DateRange>(
    dateRanges: Type[],
    limitDateRange: DateRange,
    adjustToLimit = true,
): Type[] => {
    return dateRanges
        .filter((dr) => dateRangesCollide([dr, limitDateRange]))
        .map((dr) => (adjustToLimit ? limitDateRangeToDateRange(dr, limitDateRange) : dr));
};

/**
 *
 * @param dateRanges array of DateRange
 * @returns the last date in the dateranges
 */
export const getLastDateInDateRanges = (dateRanges: DateRange[]): Date | undefined => {
    if (dateRanges.length === 0) {
        return undefined;
    }
    if (dateRanges.length === 0) {
        return dateRanges[0].to;
    }
    const dates = dateRanges.map((dr) => dr.to).sort(sortDates);
    return dates[dates.length - 1];
};

/**
 *
 * @param dateRanges array of DateRange
 * @returns the last date in the dateranges
 */
export const getFirstDateInDateRanges = (dateRanges: DateRange[]): Date | undefined => {
    if (dateRanges.length === 0) {
        return undefined;
    }
    if (dateRanges.length === 0) {
        return dateRanges[0].from;
    }
    const dates = dateRanges.map((dr) => dr.from).sort(sortDates);
    return dates[0];
};

export const ensureDateRange = (maybeDateRange: MaybeDateRange, fallbackDateRange: DateRange): DateRange => {
    return {
        from: maybeDateRange.from || fallbackDateRange.from,
        to: maybeDateRange.to || fallbackDateRange.to,
    };
};

// const dateRangeDifference = (range1: DateRange[], range2: DateRange[]): DateRange[] {
//   const difference: DateRange[] = [];
//   range1.forEach((r1) => {
//     let isOverlap = false;
//     range2.forEach((r2) => {
//       if ((r1.from <= r2.from && r1.to >= r2.from) || (r1.from <= r2.to && r1.to >= r2.to)) {
//         isOverlap = true;
//       }
//     });
//     if (!isOverlap) {
//       difference.push(r1);
//     }
//   });
//   return difference;
// }

export const dateRangeUtils = {
    dateRangeIsAdjacentToDateRange,
    dateRangesCollide,
    dateRangeToISODateRange,
    ensureDateRange,
    datesCollideWithDateRanges,
    getDateRangeFromDates,
    getDateRangeFromDateRanges,
    getDateRangesBetweenDateRanges,
    getDateRangesFromDates,
    getDateRangesFromISODateRangeMap,
    getDateRangesWithinDateRange,
    getDatesInDateRanges,
    getDatesInWeekOutsideDateRange,
    getIsoWeekDateRangeForDate,
    getMonthDateRange,
    getMonthsInDateRange,
    getNumberOfDaysInDateRange,
    getWeekDateRange,
    includeWeekendIfDateRangeEndsOnFridayOrLater,
    isDateInDateRange,
    isDateInDateRanges,
    isDateInMaybeDateRange,
    isDateInsideDateRange,
    isDateRange,
    ISODateRangeToDateRange,
    ISODateRangeToISODates,
    ISODateToISODateRange,
    joinAdjacentDateRanges,
    limitDateRangeToDateRange,
    sortDateRange,
    sortDateRangeByToDate,
};
