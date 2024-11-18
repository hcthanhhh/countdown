import { DATE_FORMAT } from '@/common/constants';
import { EGranularity } from '@/common/enums';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(duration);
dayjs.extend(relativeTime);

export default class DateTimeUtils {
  static durationTimeHumanize(endDate: Date | string, t: (key: any) => string) {
    const start = dayjs();
    const end = dayjs(endDate);
    const diff = end.diff(start);
    if (diff <= 0) {
      return t('API_KEY.EXPIRED');
    }
    const durations = dayjs.duration(diff);
    if (durations.asDays() >= 1) {
      return `${t('API_KEY.EXPIRATION_TIME')}: ${durations.humanize()}`;
    }
    if (durations.asHours() >= 1) {
      return `${t('API_KEY.EXPIRATION_TIME')}: ${durations.humanize()}`;
    }
    if (durations.asMinutes() >= 1) {
      return `${t('API_KEY.EXPIRATION_TIME')}: ${durations.humanize()}`;
    }
    return `${t('API_KEY.EXPIRATION_TIME')}: ${durations.humanize()}`;
  }

  static checkExpiredDate = (date: Dayjs | string): boolean => {
    const diff = dayjs(date).diff(dayjs());
    return diff <= 0;
  };

  static disabledPastDate = (current: Dayjs): boolean => {
    const currentDate = new Date().setHours(0, 0, 0, 0);
    return current && current.valueOf() < currentDate;
  };

  static calculateRemainTime = (
    fromDate: Date,
    toDate: Date,
  ): { days: number; hours: number; minutes: number } => {
    const diff = dayjs(toDate).diff(dayjs(fromDate));
    if (diff < 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
      };
    }

    const durations = dayjs.duration(diff);
    const days = Math.floor(durations.asDays());
    const hours = durations.hours();
    const minutes = durations.minutes();

    return {
      days,
      hours,
      minutes,
    };
  };

  static calculateRemainingSeconds(targetTime: string): number {
    const currentTime = dayjs();
    const target = dayjs(targetTime);
    const difference = target.diff(currentTime) / 1000;
    // Ensure the remaining time is positive
    return difference > 0 ? difference : 0;
  }

  static formatDate(value: any, format: string) {
    return value ? dayjs(value).format(format) : null;
  }

  static formatToCustomDate(timestamp: any) {
    // Parse the timestamp to a Date object
    const date = new Date(timestamp);

    // Extract the date components
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getUTCDate()).padStart(2, '0');

    // Format the date with the time set to 00:00:00
    const formattedDate = `${day}-${month}-${year} 00:00:00`;

    return formattedDate;
  }

  static formatTime(dateString: any, time: any) {
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');

    return `${year}-${month}-${day} ${time}`;
  }

  static dateToMilliseconds(date: Date) {
    return dayjs(date).valueOf();
  }

  static msToDate(sec: number) {
    return dayjs(sec);
  }

  static hmToSeconds(hours: string, minutes?: string) {
    if (!hours && !minutes) {
      return -1;
    }
    if (hours.indexOf(':') > -1) {
      const [h, m] = hours.split(':');
      return Number(h) * 3600 + Number(m) * 60 - 8 * 3600;
    }
    return Number(hours) * 3600 + Number(minutes) * 60;
  }

  static secondsToHm(seconds: number) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return { hours, minutes };
  }

  static secondsSlowestToHm(
    seconds: number | undefined,
    offset: number = 144000,
    defaultTime: number = 8 * 3600,
  ) {
    if (!seconds || seconds === -1) {
      seconds = defaultTime;
    } else {
      seconds -= offset;
    }

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return { hours, minutes };
  }

  static secondsFastestToHm(seconds: number | undefined, offset: number = 8 * 3600) {
    if (!seconds || seconds === -1) {
      seconds = offset;
    } else {
      seconds += offset;
    }

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return { hours, minutes };
  }

  static getDatesInRange(
    start: Dayjs | string,
    end: Dayjs | string,
    format = DATE_FORMAT,
    granularity: 'day' | 'month' | 'year',
  ) {
    const startDate = dayjs(start, granularity);
    const endDate = dayjs(end, granularity);

    const dates = [];

    let currentDate = startDate;
    while (currentDate.isBefore(endDate) || currentDate.isSame(endDate, granularity)) {
      dates.push(currentDate.format(format));

      currentDate = currentDate.add(1, granularity);
    }

    return dates;
  }
}
