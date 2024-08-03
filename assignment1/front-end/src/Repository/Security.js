const SECURITY = "security";

//create an empty array with key named "reviews" in localStorage when running the web for first time
function initSecurity() {
  if (localStorage.getItem(SECURITY) === null) {
    const data = [];
    localStorage.setItem(SECURITY, JSON.stringify(data));
  }
}

//add the security to the security list in localStorage
function createSecurity(title, user) {
  const timeNow = new Date().getTime();
  const security = JSON.parse(localStorage.getItem(SECURITY));
  let data = {
    writer: user.username,
    title: title,
    timePosting: timeNow,
  };
  if (security.length !== 0) {
    for (const e of security) {
      if (e.title === title && e.writer === user.username) {
        e.timePosting = timeNow;
        localStorage.setItem(SECURITY, JSON.stringify(security));
        return;
      }
      security.push(data);
      localStorage.setItem(SECURITY, JSON.stringify(security));
      return;
    }
  } else {
    security.push(data);
    localStorage.setItem(SECURITY, JSON.stringify(security));
    return;
  }
}

//check if the user post too many posts in 30 seconds
function checkSecurity(title, user) {
  const security = JSON.parse(localStorage.getItem(SECURITY));
  const timeNow = new Date().getTime();
  if (security.length !== 0) {
    for (const e of security) {
      if (e.title === title && e.writer === user.username) {
        const postingTime = new Date(e.timePosting).getTime();
        console.log(postingTime);
        console.log(timeNow);
        const timeDifferenceInSeconds = (timeNow - postingTime) / 1000;
        console.log(timeDifferenceInSeconds);
        if (timeDifferenceInSeconds < 30) {
          return false;
        }
      }
    }
  }
  return true;
}

//delete the related security of a account when deleting that account
function deleteSecurity(user) {
  const security = JSON.parse(localStorage.getItem(SECURITY));
  if (security.length !== 0) {
    let filtered_security = security.filter((e) => {
      if (e.writer != user.username) {
        return e;
      }
    });
    localStorage.setItem(SECURITY, JSON.stringify(filtered_security));
  }
}
export { initSecurity, createSecurity, checkSecurity, deleteSecurity };
