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
    const timeDisplayDetail = `${Math.round(secondAgo)} seconds ago`;
    return timeDisplayDetail;
  } else if (mitnuteAgo >= 1 && mitnuteAgo < 60) {
    const timeDisplayDetail = `${Math.round(mitnuteAgo)} minutes ago`;
    return timeDisplayDetail;
  } else if (mitnuteAgo >= 60 && dayAgo < 1) {
    const timeDisplayDetail = `${Math.round(hourAgo)} hours ago`;
    return timeDisplayDetail;
  } else if (dayAgo >= 1 && dayAgo < 30) {
    const timeDisplayDetail = `${Math.round(dayAgo)} days ago`;
    return timeDisplayDetail;
  } else if (monthAgo >= 1 && monthAgo < 12) {
    const timeDisplayDetail = `${Math.round(monthAgo)} months ago`;
    return timeDisplayDetail;
  } else if (yearAgo >= 1) {
    const timeDisplayDetail = `${Math.trunc(yearAgo)} years ago`;
    return timeDisplayDetail;
  }
};

//FUNCTION TO CAPITALIZE ALL FIRST LETTER OF A STRING OF WORDS
export const handleCapitalize = (value) => {
  let wordArr = value.split(" ");
  let newWordArr = [];
  for (let i = 0; i < wordArr.length; i++) {
    newWordArr.push(
      wordArr[i].split("")[0].toUpperCase() + wordArr[i].substring(1)
    );
  }
  const newWord = newWordArr.join(" ");
  return newWord;
};

//FUNCTION TO CAPITALIZE THE FIRST LETTER OF A STRING OF A WORD
export const handleCapitalizeAWord = (word) => {
  const caplitalizedWord = word.replace(
    word.split("")[0],
    word.split("")[0].toUpperCase()
  );
  return caplitalizedWord;
};

//GET JWT TOKEN FROM LOCAL STORAGE
export const jwtToken = localStorage.getItem("jwt_token");

//DEFINE HEADERS
export const headers = {
  headers: {
    Authorization: `Bearer ${jwtToken}`,
  },
};
