import GeoFire from "geofire";

const isMove = (before, current) => {
  const MIN_DIFF = 0.1; // 100mの範囲誤差を許容する

  if (!before) {
    return true;
  }
  const diff = GeoFire.distance([before.latitude, before.longitude], [current.latitude, current.longitude]);
  console.log("diff: ", diff);
  if (diff > MIN_DIFF) {
    return true;
  }
  return false;
};

export { isMove };
