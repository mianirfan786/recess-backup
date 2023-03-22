import {formatDistance} from "date-fns";

export default function timeSince(date) {
    return formatDistance(date, new Date()) + " ago";
}
