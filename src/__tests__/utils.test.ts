import Utils from '../utils'

describe('utils class tests', () => {
  it('should return a valid search URL string', async () => {
    const url = Utils.buildSearchURL({ grapes: '2, 5', minRating: 3.5 }, 1)

    expect(url).toBe('https://www.vivino.com/api/explore/explore?grape_filter=varietal&country_code=US&currency_code=USD&order_by=ratings_average&order=desc&page=1&grape_ids[]=2&grape_ids[]=5&min_rating=3.5&price_range_min=undefined&price_range_max=undefined')
  })
})
