/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion = function(s1, s2) {
  if (s1.length > s2.length) {
    return false;
  }

  const sortedS1 = s1.sort((a, b) => a - b);
  for (let i = 0; i < s2.length - s1.length; i++) {
    const subString = s2.substring(i, i + s1.length);
    subS2.sort((a, b) => a - b);
    if (sortedS1 === subS2) {
      return true;
    }
  }
  return false;
};
