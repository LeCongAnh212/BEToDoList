import { createToaster } from "@meforma/vue-toaster";
const toastr = createToaster({
  position: "bottom-left",
});
export default {
  dateFormat(now) {
    const date = new Date(now);
    const dateString = date.toLocaleDateString();
    let result = dateString.split("/").join("-");

    return result;
  },
  reverseDate(date) {
    function addLeadingZero(number) {
      return number < 10 ? "0" + number : number;
    }

    var result = this.dateFormat(date);
    var formattedResult = result
      .split("-")
      .map(addLeadingZero)
      .reverse()
      .join("-");
    return formattedResult != "1970-01-01" ? formattedResult : "";
  },
  displayNotification(message, status = 400) {
    if ([200, 201].includes(status)) {
      toastr.info(message);
    } else if (status == 400) {
      toastr.error(message);
    } else {
      toastr.warning(message);
    }
  },
};
