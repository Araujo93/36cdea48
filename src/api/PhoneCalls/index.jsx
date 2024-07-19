// Fetch all calls
export const GetPhoneCalls = async () => {
  try {
    const apiResponse = await fetch(
      "https://aircall-backend.onrender.com/activities",
    );
    if (apiResponse) {
      const parsedResponse = await apiResponse.json();
      return parseApiResponse(parsedResponse);
    }
  } catch (error) {
    if (error) {
      console.log(error, "ERROR");
    }
  }
};

// Archive single call
export const setArchivedCall = async (id, isArchived) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    await fetch(`https://aircall-backend.onrender.com/activities/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ is_archived: isArchived }),
      headers: myHeaders,
    });
    return await GetPhoneCalls();
  } catch (error) {
    console.log(error);
  }
};

// Reset all calls to initial state
export const resetAllCallsToInitialState = async () => {
  await fetch(`https://aircall-backend.onrender.com/reset`, {
    method: "PATCH",
  });

  return await GetPhoneCalls();
};

// Archive all calls
export const setAllCallsToArchived = async (callList) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  await Promise.all(
    callList.map(async (call) => {
      await fetch(
        `https://aircall-backend.onrender.com/activities/${call.id}`,
        {
          method: "PATCH",
          body: JSON.stringify({ is_archived: true }),
          headers: myHeaders,
        },
      );
    }),
  );
  return await GetPhoneCalls();
};

// parse helper function
const parseApiResponse = (res) => {
  const dates = [];
  const callList = res.map((option) => {
    if (option.created_at) {
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      const newDate = new Date(option.created_at).toLocaleDateString(
        undefined,
        options,
      );
      const time = new Date(option.created_at).toLocaleTimeString(undefined, {
        hour: "numeric",
        minute: "2-digit",
      });

      option.date = newDate;
      option.time = time;
      dates.push(newDate);
      return option;
    }
  });

  const filteredDates = dates.filter(function (item, index, inputArray) {
    return inputArray.indexOf(item) == index;
  });
  if (callList) {
    const archivedCalls = callList.filter((el) => el.is_archived);
    const nonArchivedCalls = callList.filter((el) => !el.is_archived);
    return { callList: nonArchivedCalls, archivedCalls, filteredDates };
  }
};
