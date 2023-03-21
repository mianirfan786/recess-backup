export const timeTo12HrFormat = (time) => {
    const timeArr = time.split(':');
    let hours = parseInt(timeArr[0]);
    let minutes = parseInt(timeArr[1]);
    let designation = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    const timeStr = hours + ':' + minutes + ' ' + designation;
    return timeStr;
}