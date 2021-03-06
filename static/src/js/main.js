window.$ = window.jQuery = require('jquery');
import '../css/main.scss';

let editor;

function initMonaco() {
  monaco.languages.register({id: 'bibim'});

  monaco.languages.setMonarchTokensProvider('bibim', {
    keywords: [
      '@'
    ],
    operators: [
      '+', '-', '*', '/', '&', '|', '!', '?=', '>', '<', '=', '^', ':'
    ],
    brackets: [
      ['(', ')', 'delimiter.parenthesis'],
      ['{', '}', 'delimiter.curly'],
      ['[', ']', 'delimiter.square']
    ],
    symbols: /[=><!&|+\-*/^:]+/,
    delimiters: /[;@]/,
    tokenizer: {
      root: [
        {include: '@whitespace'},
        [/[{}()\[\]]/, '@brackets'], // eslint-disable-line no-useless-escape
        [/@symbols/, {cases: {
          '@keywords': 'keyword',
          '@operators': 'operator',
          '@default': ''
        }}],
        [/\d[\d\s]*/, 'number'],
        [/@delimiters/, {cases: {
          '@keywords': 'keyword',
          '@default': 'delimiter'
        }}]
      ],
      whitespace: [
        [/\s+/, 'white'],
        [/~\s*#/, 'comment', '@comment']
      ],

      comment: [
        [/[^~#]+/, 'comment'],
        [/~\s*#/, 'comment.invalid'],
        [/#\s*~/, 'comment', '@pop'],
        [/[~#]/, 'comment']
      ]
    }
  });

  editor = monaco.editor.create(document.getElementById('editor'), {
    value: [
      '~# HELLO WORLD 예제 #~',
      '{[0; @:1 = {',
      '\t[0; 72]',
      '\t[1; 69]',
      '\t[2; 76]',
      '\t[3; 76]',
      '\t[4; 79]',
      '\t[5; 32]',
      '\t[6; 87]',
      '\t[7; 79]',
      '\t[8; 82]',
      '\t[9; 76]',
      '\t[10; 68]',
      '\t[11; 10]',
      '}]}'
    ].join('\n'),
    language: 'bibim'
  });
}

function loadMonaco() {
  window.require.config({paths: {vs: 'static/vs'}});
  window.require(['vs/editor/editor.main'], function() {
    initMonaco();
  });
}

window.$(document).ready(function() {
  loadMonaco(editor);
  const $run = $('#run');
  $run.click(function() {
    $run.prop('disabled', true);
    const stdin = $('#stdin').val();
    console.log('stdin=' + stdin);
    $.post(
      'run',
      {
        code: editor.getValue(),
        stdin: stdin
      }
    ).done(data => {
      const $stdout = $('#stdout');
      $stdout.empty();
      $stdout.append(data.stdout);
      if (data.is_timeout) {
        $stdout.append('\n --- TIME OUT ---');
      }
      const $stderr = $('#stderr');
      $stderr.empty();
      $stderr.append(data.stderr);
      if (data.is_timeout) {
        $stderr.append('\n --- TIME OUT ---');
      }
      $run.prop('disabled', false);
    }).fail(() => {
      const $stdout = $('#stdout');
      $stdout.empty();
      $stdout.append('코드 실행 실패');
      $run.prop('disabled', false);
    });
  });
});
