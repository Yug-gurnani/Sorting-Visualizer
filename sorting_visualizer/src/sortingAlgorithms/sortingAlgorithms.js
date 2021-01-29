import Heap from 'heap-js';
export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
  }
  
  function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
  }
  
  function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
      animations.push([i, j]);
      animations.push([i, j]);
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
      }
    }
    while (i <= middleIdx) {
      animations.push([i, i]);
      animations.push([i, i]);
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
      animations.push([j, j]);
      animations.push([j, j]);
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }

export function bubblesortanimations(arr) {
  const animations = [];
  for (let i = 0;i < arr.length;i++){
    for (let j = 0;j < arr.length-i-1;j++){
       animations.push([j,j+1])
       animations.push([j,j+1])
       if (arr[j] > arr[j+1]){
        animations.push([j,j+1,arr[j],arr[j+1]])
        let tmp = arr[j+1];
        arr[j+1] = arr[j];
        arr[j] = tmp;
      }
      else {
        animations.push([j,arr[j]])
      } 
    }
  }
  return animations;
}

export function insertionsortanimations(arr){
  const animations = [];
  for (let i = 1; i < arr.length;i++){
    var j = i-1
    
    var key = arr[i]
    while (j >= 0 && key < arr[j]){
      animations.push([j+1,j]);
      animations.push([j+1,j]);
      animations.push([j+1,arr[j]]);
      arr[j+1] = arr[j];
      j -= 1;
    }
    animations.push([i,j+1]);
    animations.push([i,j+1]);
    animations.push([j+1,key])
    arr[j+1] = key;
  }

  return animations;
}

export function heapsortanimations(arr) {
  const animations = [];
  let count = 0
  const maxHeap = new Heap(Heap.maxComparator);
  for (let i = 0;i<arr.length-1;i++){
    animations.push([i,i+1]);
    count += 1
    maxHeap.push(arr[i]);
  }
  maxHeap.push(arr[arr.length-1])
  animations.push([arr.length-1,arr.length-1])
  count += 1
  for (let i = arr.length - 1;i >= 0;i--){
  
    arr[i] = maxHeap.pop();

    animations.push([i,i])
    animations.push([i,i])
    animations.push([i,arr[i]])
    
  }
  return [animations,count];
}