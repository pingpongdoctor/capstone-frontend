//FUNCTION USED TO CONVERT TIMESTAMPS
export const timeConvDetail = function (timestamp) {
  const timeInfo = new Date(timestamp).getTime();
  const timeInfoCurrent = Date.now();
  const timeSince = timeInfoCurrent - timeInfo;
  const secondAgo = timeSince / 1000;
  const mitnuteAgo = secondAgo / 60;
  const hourAgo = mitnuteAgo / 60;
  const dayAgo = hourAgo / 24;
  const monthAgo = dayAgo / 30;
  const yearAgo = dayAgo / 365;

  if (mitnuteAgo < 1) {
    const timeDisplayDetail = `Posted ${Math.round(secondAgo)} seconds ago`;
    return timeDisplayDetail;
  } else if (mitnuteAgo >= 1 && mitnuteAgo < 60) {
    const timeDisplayDetail = `Posted ${Math.round(mitnuteAgo)} minutes ago`;
    return timeDisplayDetail;
  } else if (mitnuteAgo >= 60 && dayAgo < 1) {
    const timeDisplayDetail = `Posted ${Math.round(hourAgo)} hours ago`;
    return timeDisplayDetail;
  } else if (dayAgo >= 1 && dayAgo < 30) {
    const timeDisplayDetail = `Posted ${Math.round(dayAgo)} days ago`;
    return timeDisplayDetail;
  } else if (monthAgo >= 1 && monthAgo < 12) {
    const timeDisplayDetail = `Posted ${Math.round(monthAgo)} months ago`;
    return timeDisplayDetail;
  } else if (yearAgo >= 1) {
    const timeDisplayDetail = `Posted ${Math.trunc(yearAgo)} years ago`;
    return timeDisplayDetail;
  }
};
