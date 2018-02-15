import lesson6 from '../src/lesson6';

const {
  getClimate,
  getProfile,
  getPilots,
} = lesson6.task;


describe('async javascript', function () {
  describe('getClimate function', () => {
    it('it should return climate', async () => {
      expect.hasAssertions();
      const data = await getClimate('Tatooine');
      expect(data).toEqual('arid');
    });
    it('it should return message', async () => {
      expect.hasAssertions();
      const data = await getClimate('ta');
      expect(data).toEqual('There are more than one results, try to give more information');
    });
  })

  describe('getProfile function', () => {
    it('it should return profile information', async () => {
      expect.hasAssertions();
      const data = await getProfile('Luke');
      expect(data).toHaveProperty('name', 'Luke Skywalker');
      expect(data).toHaveProperty('height', '172');
      expect(data).toHaveProperty('birth_year', '19BBY');
    });
  })

  describe('getPilots function', () => {
    it('it should return array of string', async () => {
      expect.hasAssertions();
      const data = await getPilots('Millennium');
      expect(data).toContain('Chewbacca');
      expect(data).toContain('Han Solo');
      expect(data).toContain('Lando Calrissian');
      expect(data).toContain('Nien Nunb');
      expect(data.length).toEqual(4);
    });
  })
})
