// import store from '@/store/index'

/**
 * 숫자 표기 , 추가
 * @param {*} value 
 */
 export const threeComma = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * 시간분으로 자르기(HH:MM)
 * @param {*} timestring
 */
 export const hhmmFormatter = (timestring) => {
    try {
        if(!timestring)
            return ''

        // console.log('timestring', timestring,  timestring.length)
        let cutted;
        if(timestring.length == 19){
            cutted = timestring.substr(11, 5);
        }
        else {
            cutted = timestring.substring(0, 5);
        }
        // console.log(cutted);
        return cutted
    }
    catch (error) {
        console.error('hhmmFormatter error', error);
        return ''
    }
}

/**
 * date formatter
 * @param {*} f 
 */
 export const dateFormatter = (date, format) => {

    let weekName = ["일", "월", "화", "수", "목", "금", "토"];
    let d = new Date(date);

    return format.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
        switch ($1) {
            case "yyyy": return d.getFullYear();
            case "yy": return (d.getFullYear() % 1000).zf(2);
            case "MM": return (d.getMonth() + 1);
            case "dd": return d.getDate();
            case "E": return weekName[d.getDay()];
            case "HH": return d.getHours().zf(2);
            case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
            case "mm": return d.getMinutes().zf(2);
            case "ss": return twoDigit(d.getSeconds());
            case "a/p": return d.getHours() < 12 ? "오전" : "오후";
            default: return $1;
        }
    });
}
const twoDigit = (value) => {
    let stringValue = value.toString();
    return stringValue[1] ? stringValue : '0' + stringValue[0]
}