import Main from '@/app/auth/components/Main';

describe('Auth', () => {
  describe('Main', () => {
    it('should exists hook created', () => {
      expect(Main.created).to.be.a.function;
    });
  });
});
