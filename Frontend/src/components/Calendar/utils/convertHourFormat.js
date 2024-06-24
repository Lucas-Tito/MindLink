export default function convertHourFormat(time24) {
    // Split the input time into hours and minutes
    let [hours, minutes] = time24.split(':');

    // Convert hours to a number
    hours = parseInt(hours);

    // Determine AM or PM suffix
    const suffix = hours >= 12 ? 'PM' : 'AM';

    // Convert hours from 24-hour to 12-hour format
    hours = hours % 12 || 12; // Convert 0 or 12 to 12 for AM/PM time

    // Return the formatted time
    return `${hours}:${minutes} ${suffix}`;
}