export const helpers = {
    'if_eq': function (a, b, opts) {
        if (a === b)
            return opts.fn(this);
        else
            return opts.inverse(this);
    },
    'formatDate': function(dateString) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        const dayAfterTomorrow = new Date(today);
        dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
        
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        
        const date = new Date(dateString);
        date.setHours(0, 0, 0, 0);
        
        if (date.getTime() === today.getTime()) {
            return 'Today';
        } else if (date.getTime() === tomorrow.getTime()) {
            return 'Tomorrow';
        } else if (date.getTime() === dayAfterTomorrow.getTime()) {
            return 'Day after tomorrow';
        } else if (date.getTime() === yesterday.getTime()) {
            return 'Yesterday';
        } else {
            return dateString;
        }
    }
}
