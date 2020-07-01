import { describe, it, expect } from '@jest/globals';
import wcwidth from '../src/index';

describe('wcwidth', () => {
  it('handles regular strings', () => {
    expect(wcwidth('abc')).toBe(3);
  });

  it('handles multibyte strings', () => {
    expect(wcwidth('字的模块')).toBe(8);
  });

  it('handles multibyte characters mixed with regular characters', () => {
    expect(wcwidth('abc 字的模块')).toBe(12);
  });

  it('ignores control characters e.g. \\n', () => {
    expect(wcwidth('abc\n字的模块\ndef')).toBe(14);
  });

  it('ignores bad input', () => {
    expect(wcwidth('')).toBe(0);
    expect(wcwidth(3)).toBe(0);
    expect(wcwidth({})).toBe(0);
    expect(wcwidth([])).toBe(0);
    expect(wcwidth()).toBe(0);
  });

  it('ignores nul (charcode 0)', () => {
    expect(wcwidth(String.fromCharCode(0))).toBe(0);
  });

  it('ignores nul mixed with chars', () => {
    expect(wcwidth(`a${String.fromCharCode(0)}\n字的`)).toBe(5);
  });

  it('can have custom value for nul', () => {
    expect(wcwidth(String.fromCharCode(0) + 'a字的', { nul: 10 })).toBe(15);
  });

  it('can have custom control char value', () => {
    expect(wcwidth('abc\n字的模块\ndef', { control: 1 })).toBe(16);
  });

  it('negative custom control chars == -1', () => {
    expect(wcwidth('abc\n字的模块\ndef', { control: -1 })).toBe(-1);
  });
});
