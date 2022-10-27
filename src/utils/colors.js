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

const random = ['rgb(211, 132, 244)', 
                'rgb(161, 255, 158)',
                'rgb(117, 129, 239)',
                'rgb(118, 238, 247)',
                'rgb(239, 141, 152)',
                'rgb(183, 173, 244)',
                'rgb(255, 127, 252)',
                'rgb(203, 247, 121)',
                'rgb(249, 246, 144)',
                'rgb(207, 247, 7)',
                'rgb(249, 141, 17)',
                'rgb(49, 113, 224)',
                'rgb(252, 106, 80)',
                'rgb(242, 236, 58)',
                'rgb(162, 14, 247)',
                'rgb(146, 255, 96)',
                'rgb(206, 66, 77)',
                'rgb(252, 78, 127)',
                'rgb(91, 93, 211)',
                'rgb(25, 152, 183)']

const getConstructorColor = (constructorName) => {
  const constructorColor = constructorsColors.filter(constructor => constructor.name === constructorName)
  return constructorColor[0].color
}


export {
  constructorsColors,
  random,
  getConstructorColor
}