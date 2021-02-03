import { Wine } from '../models/wine.model'
import { API_RESULT } from './__mocks__/api-result.mock'

describe('wine model tests', () => {
  it('should return an empty array', () => {
    const wineList = Wine.factoryMapJSONtoModel([])

    expect(wineList).toHaveLength(0)
  })

  it('should return an array of wine model', () => {
    const wineList = Wine.factoryMapJSONtoModel(API_RESULT.explore_vintage.records)

    expect(wineList).toHaveLength(API_RESULT.explore_vintage.records.length)
  })

  it('should an item to be a wine model', () => {
    const wineList = Wine.factoryMapJSONtoModel(API_RESULT.explore_vintage.records)

    expect(wineList[0]).toBeInstanceOf(Wine)
  })
})
