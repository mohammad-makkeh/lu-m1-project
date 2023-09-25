export default function toLabelValue(arr){
    if(!arr) return [];
    return arr.map(item => ({
        label: item,
        value: item
    }))
}