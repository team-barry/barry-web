const getCurrentPosition = options => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
};

export default function(options) {
  return getCurrentPosition(options).then(position => {
    return position.coords;
  });
}
