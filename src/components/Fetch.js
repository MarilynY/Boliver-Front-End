import { AUTH_HEADER, TOKEN_KEY } from "../constants";
import * as _ from "lodash";

var getAccessToken = function () {
    let token = _.get(JSON.parse(localStorage.getItem(TOKEN_KEY)), "access_token");
    // console.log(token)
    return token;
}


export function getData(url) {

    return fetch(url, {
        //   cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, same-origin, *omit
        // "Access-Control-Allow-Origin":'127.0.0.1',
        headers: {
            // 'user-agent': 'Mozilla/4.0 MDN Example',
            'Authorization': AUTH_HEADER + getAccessToken(),
            'content-type': 'application/json'
        },
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        //   redirect: 'follow', // manual, *follow, error
        referrer: 'client', // *client, no-referrer
    })
        .then(response => response.json()) // parses response to JSON
        .catch(error => console.error('Error:', error))
}

export function postData(url, data) {
    // Default options are marked with *
    console.log(JSON.stringify(data));
    return fetch(url, {
        body: JSON.stringify(data), // must match 'Content-Type' header
        //   cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, same-origin, *omit
        headers: {
            'Authorization': AUTH_HEADER + getAccessToken(),
            // 'user-agent': 'Mozilla/4.0 MDN Example',
            'content-type': 'application/json'
        },
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        //   redirect: 'follow', // manual, *follow, error
        //   referrer: 'no-referrer', // *client, no-referrer
    })
        .then(response => response.json()) // parses response to JSON
        .catch(error => console.error('Error:', error))
} 