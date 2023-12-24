export const getDate = (dateObj) => {
  // Extract the components (month, day, year) from the Date object
  const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Adding 1 because getMonth() returns zero-based month
  const day = String(dateObj.getDate()).padStart(2, "0");
  const year = dateObj.getFullYear();

  // Format the date as MM/DD/YYYY
  const formattedDate = `${month}/${day}/${year}`;
  return formattedDate;
};

export const getTime = (dateTimeString) => {
  const dateTimeObj = new Date(dateTimeString);

  // Extract the hours and minutes from the Date object
  const hours = String(dateTimeObj.getHours()).padStart(2, "0");
  const minutes = String(dateTimeObj.getMinutes()).padStart(2, "0");

  // Determine whether it's AM or PM
  const amOrPm = hours >= 12 ? "PM" : "AM";

  // Convert 24-hour time to 12-hour time format
  const formattedHours = hours % 12 || 12;

  // Format the time as HH:MM AM/PM
  const formattedTime = `${formattedHours}:${minutes} ${amOrPm}`;
  return formattedTime;
};

export const generateUniqueId = (idLength = 9) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";

  let uniqueId = "";

  for (let i = 0; i < idLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    uniqueId += characters.charAt(randomIndex);
  }

  return uniqueId;
};

export const getDateTimeRemaining = (targetDateTime) => {
  const now = new Date(); // Current date and time
  const target = new Date(targetDateTime); // Target date and time

  // Calculate the difference in milliseconds between now and the target date/time
  const difference = target - now;

  if (difference <= 0) {
    return "Target date and time have already passed.";
  }

  // Calculate days, hours, minutes, and seconds remaining
  const millisecondsInSecond = 1000;
  const millisecondsInMinute = millisecondsInSecond * 60;
  const millisecondsInHour = millisecondsInMinute * 60;
  const millisecondsInDay = millisecondsInHour * 24;

  const days = Math.floor(difference / millisecondsInDay);
  const hours = Math.floor(
    (difference % millisecondsInDay) / millisecondsInHour
  );
  const minutes = Math.floor(
    (difference % millisecondsInHour) / millisecondsInMinute
  );
  const seconds = Math.floor(
    (difference % millisecondsInMinute) / millisecondsInSecond
  );

  return { days, hours, minutes, seconds };
};

export const formattedTime = (time) => {
  const milliseconds = (time % 1000) / 10;
  const seconds = Math.floor((time / 1000) % 60);
  const minutes = Math.floor((time / (1000 * 60)) % 60);
  const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

  if (hours > 0) {
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${milliseconds
      .toString()
      .padStart(2, "0")}`;
  } else {
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}.${milliseconds.toString().padStart(2, "0")}`;
  }
};
