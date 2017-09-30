export function getDeviceInfo(width) {
  if (width) {
    if (width > 320 && width <= 480) {
      return {
        type: 'medium-device',
      };
    }
    if (width > 480) {//&& width <= 768
      return {
        type: 'large-device',
      };
    }
    if (width <= 320) {
      return {
        type: 'small-device',
      };
    }
    return {
      type: 'small-device',
    };
  }
}
