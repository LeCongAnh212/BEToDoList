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
  displaySuccess(res) {
    var message = res.data.message;
    if (res.data.status == 1) {
      toastr.info(message);
    } else if (res.data.status == 0) {
      toastr.error(message);
    } else {
      toastr.warning(message);
    }
  },
};
