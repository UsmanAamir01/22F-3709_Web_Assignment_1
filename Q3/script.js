document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("transformForm");
  const inputStringElem = document.getElementById("inputString");
  const rollNumberElem = document.getElementById("rollNumber");
  const skipIntervalElem = document.getElementById("skipInterval");
  const resultList = document.getElementById("resultList");

  const sumDigits = (str) =>
    [...str].reduce(
      (sum, char) => (/\d/.test(char) ? sum + Number(char) : sum),
      0
    );

  const transformString = (str, skipInterval) => {
    const length = str.length;
    if (skipInterval > length) {
      return [...str].reverse().join("");
    }

    const skipIndices = new Set(
      [...Array(length).keys()].filter((i) => (i + 1) % skipInterval === 0)
    );

    const reversibleChars = [...str].filter((char, i) => !skipIndices.has(i));

    const reversedChars = reversibleChars.reverse();

    let reversedIndex = 0;
    const transformedArray = [...str].map((char, i) =>
      skipIndices.has(i) ? char : reversedChars[reversedIndex++]
    );

    return transformedArray.join("");
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const originalString = inputStringElem.value;
    const rollNumber = rollNumberElem.value;

    let skipInterval = parseInt(skipIntervalElem.value);
    if (isNaN(skipInterval) || skipInterval <= 0) {
      skipInterval = sumDigits(rollNumber);
      if (skipInterval === 0) skipInterval = 1;
    }

    const transformedString = transformString(originalString, skipInterval);

    const li = document.createElement("li");
    li.innerHTML = `<strong>Original:</strong> ${originalString}<br>
                      <strong>Transformed (Skip Interval: ${skipInterval}):</strong> ${transformedString}`;
    resultList.appendChild(li);

    inputStringElem.value = "";
    rollNumberElem.value = "";
    skipIntervalElem.value = "";
  });
});
