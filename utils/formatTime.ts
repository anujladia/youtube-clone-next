function trimTo2(time: number) {
    const value = `0${time}`.split('');
    return value.length > 2 ? value.splice(1).join('') : value.join('');
}

export default function formatTime(time: number) {
    const decimal_down: number = Number(time.toFixed(0));
    let hours = Math.floor(decimal_down / 3600);
    let left_time = decimal_down;
    if (hours > 0) {
        left_time = decimal_down - (3600 * (hours > 0 ? hours : 1));
    }
    const mins = Math.floor(left_time / 60)
    const seconds = left_time % 60;

    if (hours) {
        return `${trimTo2(hours)}:${trimTo2(mins)}:${trimTo2(seconds)}`;
    }

    return `${trimTo2(mins)}:${trimTo2(seconds)}`;
}