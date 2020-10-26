import {Component} from 'react'

class SizeFormatter extends Component {

    static formatHumanReadable(bytes, decimal= 1) {

        const threshold = 1024;
        if (Math.abs(bytes) < threshold) {
            return bytes + ' B';
        }

        const units = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        let unitIndex = -1;
        const roundRef = 10**decimal;

        do {
            bytes /= threshold;
            ++unitIndex;
        } while (Math.round(Math.abs(bytes) * roundRef) / roundRef >= threshold && unitIndex < units.length - 1);


        return bytes.toFixed(decimal) + ' ' + units[unitIndex];
    }
}

export default SizeFormatter