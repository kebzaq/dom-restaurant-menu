export function getUniqueCategories(data) {
  const array = [];

  for (let i = 0; i < data.length; i++) {
    if (!array.includes(data[i].category)) {
      array.push(data[i].category);
    }
  }

  return array;
}

export function getFilteredData(data, btnName) {
  const newArr = [];

  for (let i = 0; i < data.length; i++) {
    if (data[i].category === btnName) {
      newArr.push(data[i]);
    }
  }

  return newArr;
}

// "apple" => "Apple" ==> charAt(0) + slice(1)

export function capitalizeName(btnName) {
  return btnName.charAt(0).toUpperCase() + btnName.slice(1); // Apple
}
