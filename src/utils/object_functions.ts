



export function omitObjectKeys( obj: { [key: string]: any }, keys: string[],) {
  const newObj = {...obj}; // obj ni nusxasini olamiz
  keys.forEach(key => delete newObj[key]); // berilgan keylarni o'chirib tashlaymiz
  return newObj;
}