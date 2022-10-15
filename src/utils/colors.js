const constructorsColors = [
  { 
    name: 'Mercedes',
    color: '#00D2BE'
  },
  { 
    name: 'Ferrari',
    color: '#DC0000'
  },
  { 
    name: 'Red Bull',
    color: '#0600EF'
  },
  { 
    name: 'Alpine F1 Team',
    color: '#0090FF'
  },
  { 
    name: 'McLaren',
    color: '#FF8700'
  },
  { 
    name: 'Alfa Romeo',
    color: '#900000'
  },
  { 
    name: 'Aston Martin',
    color: '#006F62'
  },
  { 
    name: 'Haas F1 Team',
    color: '#FFFFFF'
  },
  { 
    name: 'AlphaTauri',
    color: '#2B4562'
  },
  { 
    name: 'Williams',
    color: '#005AFF'
  },
]

const getConstructorColor = (constructorName) => {
  const constructorColor = constructorsColors.filter(constructor => constructor.name === constructorName)
  return constructorColor[0].color
}


export {
  constructorsColors,
  getConstructorColor
}