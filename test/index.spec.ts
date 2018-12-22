import wcwidth from '../src/index';

describe('wcwidth', () => {
  it('handles regular strings', () => {
    expect(wcwidth('abc')).toEqual(3);
  });

  it('handles multibyte strings', () => {
    expect(wcwidth('字的模块')).toEqual(8);
  });

  it('handles multibyte characters mixed with regular characters', () => {
    expect(wcwidth('abc 字的模块')).toEqual(12);
  });

  it('ignores control characters e.g. \\n', () => {
    expect(wcwidth('abc\n字的模块\ndef')).toEqual(14);
  });

  it('ignores bad input', () => {
    expect(wcwidth('')).toEqual(0);
    expect(wcwidth(3)).toEqual(0);
    expect(wcwidth({})).toEqual(0);
    expect(wcwidth([])).toEqual(0);
    expect(wcwidth()).toEqual(0);
  });

  it('ignores nul (charcode 0)', () => {
    expect(wcwidth(String.fromCharCode(0))).toEqual(0);
  });

  it('ignores nul mixed with chars', () => {
    expect(wcwidth(`a${String.fromCharCode(0)}\n字的`)).toEqual(5);
  });

  it('can have custom value for nul', () => {
    expect(wcwidth(String.fromCharCode(0) + 'a字的', { nul: 10 })).toEqual(15);
  });

  it('can have custom control char value', () => {
    expect(wcwidth('abc\n字的模块\ndef', { control: 1 })).toEqual(16);
  });

  it('negative custom control chars == -1', () => {
    expect(wcwidth('abc\n字的模块\ndef', { control: -1 })).toEqual(-1);
  });
});
