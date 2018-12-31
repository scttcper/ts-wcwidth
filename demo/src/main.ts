import wcwidth from '../../src';

(window as any).wcwidth = wcwidth;

const input = document.querySelector<HTMLInputElement>('#input');
const output = document.querySelector<HTMLInputElement>('#output');

input.addEventListener('input', event => inputChange((event.target as HTMLInputElement).value));

function inputChange(str: string) {
  output.value = String(wcwidth(str));
}
