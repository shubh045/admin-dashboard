export const getUsers = async () => {
  try {
    const response = await fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getLocalItems = (search) => {
  if (!search) {
    const users = localStorage.getItem("users");
    if (users) {
      return JSON.parse(localStorage.getItem("users"));
    } else return [];
  }

  if (search) {
    const users = localStorage.getItem("searchusers");
    if (users) return JSON.parse(localStorage.getItem("searchusers"));
    else return [];
  }
};
