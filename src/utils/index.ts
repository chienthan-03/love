import queryString from "query-string";

/**
 * Chuyển một chuỗi thành mảng các giá trị (bỏ khoảng trắng và loại bỏ chuỗi rỗng).
 * @param value Giá trị đầu vào (string hoặc bất kỳ)
 * @returns Mảng chuỗi
 */
export const getArrayFieldValue = (value: unknown): string[] => {
  return typeof value === "string"
    ? value
        .split(",")
        .map((i) => i.trim())
        .filter((i) => i !== "")
    : [];
};

/**
 * Chuyển object thành query string URL.
 * @param data Object dữ liệu bất kỳ
 * @returns URL string
 */
export const stringifyParamsToURL = (data: Record<string, any>): string => {
  const result = queryString.stringify(data);
  return "https://minimalsharegraph.z7.web.core.windows.net/?" + result;
};
