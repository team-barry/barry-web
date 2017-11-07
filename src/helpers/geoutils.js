export const getLatLngArray = lnglat => {
  return [lnglat.lat, lnglat.lng];
};

export const isInnerBounds = (sw, ne, center) => {
  const a1 = [sw[0], sw[1]];
  const a2 = [sw[0], ne[1]];
  const a3 = [ne[0], ne[1]];
  const a4 = [ne[0], sw[1]];
  return isInnerRect(a1, a2, a3, a4, center);
};

const isInnerRect = (a1, a2, a3, a4, p) => {
  const c1 = crossProduct(subarray(a2, a1), subarray(p, a1));
  const c2 = crossProduct(subarray(a3, a2), subarray(p, a2));
  const c3 = crossProduct(subarray(a4, a3), subarray(p, a3));
  const c4 = crossProduct(subarray(a1, a4), subarray(p, a4));
  if (c1 < 0 && c2 < 0 && c3 < 0 && c4 < 0) {
    return true;
  }
  return false;
};

const subarray = (a1, a2) => {
  return [a2[0] - a1[0], a2[1] - a1[1]];
};

const crossProduct = (a1, a2) => {
  return a1[0] * a2[1] - a2[0] * a1[1];
};
