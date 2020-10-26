import {Component} from 'react'

class DateFormatter extends Component {

    static format(stringDate) {
        return new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        }).format(new Date(stringDate))
    }
}

export default DateFormatter