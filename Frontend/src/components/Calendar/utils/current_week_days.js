const today = new Date();
const currentDayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)

// Calculate the start date of the current week (assuming the week starts on Monday)
const startOfWeek = new Date(today);
const startOffset = currentDayOfWeek === 0 ? -6 : 1 - currentDayOfWeek; // Adjust to the previous Monday if today is Sunday, otherwise the most recent Monday
startOfWeek.setDate(today.getDate() + startOffset);

// Get all dates in the current week
const currentWeekDays = [];
for (let i = 0; i < 7; i++) {
    const weekDay = new Date(startOfWeek);
    weekDay.setDate(startOfWeek.getDate() + i);
    currentWeekDays.push(weekDay.getDate());
}

export default currentWeekDays