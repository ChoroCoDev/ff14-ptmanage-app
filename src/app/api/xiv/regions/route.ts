type RegionsResponse = {
  'Japan': DataCentars[]
  // [key in Regions]: DataCentars[]
}

export const GET = (): RegionsResponse => {
  return {
    'Japan': ['Elemental', 'Gaia', 'Mana', 'Meteor'],
  }
}
