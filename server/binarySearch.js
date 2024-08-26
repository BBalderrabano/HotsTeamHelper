let arr = [1,2,4,6,7,8,19];

let binarySearchRecursive = (arr, beggining, end, target) => {

    if(beggining > end)
        return -1;

    let mid = Math.floor((beggining + end) / 2);

    if(arr[mid] === target)
        return mid;

    if(arr[mid] < target){
        return binarySearchRecursive(arr, mid + 1, end, target);
    }else{
        return binarySearchRecursive(arr, beggining, mid - 1, target);
    }
}

console.log(binarySearchRecursive(arr, 0, arr.length - 1, 7)); 