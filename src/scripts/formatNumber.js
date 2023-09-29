export default function formatNumber(value) {
    const onlyNumber = value.replace(/[^0-9]/g, "");
    var formatNumber = onlyNumber.substring(0, 11)
    if (onlyNumber.length > 0) {
        formatNumber = "(" + formatNumber

        if (formatNumber.length == 1) formatNumber = "+55 "+formatNumber
        if (formatNumber.length >= 4) formatNumber = formatNumber.substring(0, 3) + ") " + formatNumber.substring(3, formatNumber.length)
        if (formatNumber.length >= 10) formatNumber = formatNumber.substring(0, 11) + "-" + formatNumber.substring(11, formatNumber.length)
        if (formatNumber.length == 14) {
            const removedTrash = formatNumber.replace("-", "")
            formatNumber = removedTrash.substring(0, 9) + "-" + removedTrash.substring(9, removedTrash.length)
        }
        if (formatNumber.length == 15) {
            const removedTrash = formatNumber.replace("-", "")
            formatNumber = removedTrash.substring(0, 6) + " " + removedTrash.substring(6, 10) + "-" + removedTrash.substring(10, removedTrash.length)
        }
    }

    return formatNumber
}