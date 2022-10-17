const groupByKey = (arr, key) => {
  const result = arr.reduce((map, e) => ({
    ...map,
    [e[key]]: [...(map[e[key]] ?? []), e]
  }), {})
  
  return result
}


  export {
    groupByKey
  }