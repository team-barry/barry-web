const isMove = (before, current) => {
  const MIN_DIFF = 1.0e-8; // 定数については実験する必要がある
  
  if(!before) {
    return true;
  }
  
  const diff = {
    latitude: before.latitude - current.latitude,
    longitude: before.longitude - current.longitude,
  }
  const abs_diff = diff.latitude*diff.latitude + diff.longitude*diff.longitude;
  console.log(abs_diff);
  
  if(abs_diff < MIN_DIFF) {
    return false;
  }
  return true;
}

const setNextTime = (isMovePosition, nextTime) => {
  const TIME = 10000;
  if(!nextTime) {
    return TIME;
  }
  
  if(!isMovePosition) {
    return nextTime*2;
  }
  return TIME;
}

export {isMove, setNextTime};
