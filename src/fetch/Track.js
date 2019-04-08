import { API_ROOT } from "../constants";
import { getData, postData } from "./Fetch.js";

export function fetchCurrentOrderList() {
    let url = API_ROOT + "/currentorder";
    return getData(url);
}
export function fetchTrackOrder(orderId) {
    let url = API_ROOT + "/trackorder";
    let data = { order_id: orderId }
    return postData(url, data).then(res => console.log(res));

}



