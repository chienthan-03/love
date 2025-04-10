export const normalizeData = (data) => {
  const normalizedData = {
    entities: {},
    result: [],
  };

  data.forEach((item) => {
    const { id } = item;
    normalizedData.entities[id] = item;
    normalizedData.result.push(id);
  });

  return normalizedData;
};

/**
 * @param {Record<string,any>} data
 * @returns {Record<string,any>}
 */
export const trimObjectProperties = (data = {}) => {
  const newData = { ...data };
  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      const element = data[key];
      if (typeof element === "string") {
        newData[key] = element.trim();
      }
    }
  }
  return newData;
};

export const isObjectEmpty = (objectName) => {
    return (
      Object.keys(objectName).length === 0 && objectName.constructor === Object
    );
  };