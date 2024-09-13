import moment from 'moment';

export const formatDate = (date) => {
    return moment(date).format('YYYY-MM-DD');
};

export const addDaysToDate = (date, days) => {
    return moment(date).add(days, 'days').toDate();
};

export const isDateInPast = (date) => {
    return moment(date).isBefore(moment(), 'day');
};