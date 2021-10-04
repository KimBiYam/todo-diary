import dateUtil from '../dateUtil';

describe('date util', () => {
  describe('getFormattedDate', () => {
    it('should success get formatted date', () => {
      //given
      const dateText = '2020/01/01';

      //when
      const result = dateUtil.getFormattedDate(dateText);

      //then
      expect(result).toEqual('2020-01-01');
    });
  });
});
