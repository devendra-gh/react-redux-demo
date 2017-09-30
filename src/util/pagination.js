export const getPaginatedData = (completeArray, pageIndex, pageSize) => {
  let resultantArray = [], last = completeArray.length;
  if (last > pageSize) {
    let start = 0, end = (pageIndex*pageSize) + pageSize;
    end = (end > last) ? last : end;
    resultantArray = completeArray.slice(0, end); /** Array.slice does not includes end*/
  }else
    resultantArray = completeArray;

  pageIndex = pageIndex + 1;
  return {resultantArray: resultantArray, pageIndex: pageIndex};
};
